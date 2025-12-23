<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    /**
     * Get instructor dashboard data
     */
    public function instructorDashboard()
    {
        $instructorId = Auth::id();

        // Total courses created by this instructor
        $totalCourses = Course::where('instructor_id', $instructorId)->count();

        // Total students enrolled in instructor's courses
        $totalStudents = Enrollment::whereIn(
            'course_id',
            Course::where('instructor_id', $instructorId)->pluck('id')
        )->distinct('user_id')->count('user_id');

        // Pending reviews - courses with "Pending" status
        $pendingReviews = Course::where('instructor_id', $instructorId)
            ->where('status', 'Pending')
            ->count();

        // Total earnings (placeholder - adjust based on your payment model)
        $totalEarnings = 0; // This will need to be calculated based on payments

        return response()->json([
            'total_courses' => $totalCourses,
            'total_students' => $totalStudents,
            'pending_reviews' => $pendingReviews,
            'total_earnings' => $totalEarnings,
        ]);
    }

    /**
     * Get course performance data for instructor
     */
    public function coursePerformance()
    {
        $instructorId = Auth::id();

        // Get courses with enrollment count
        $courses = Course::where('instructor_id', $instructorId)
            ->with('enrollments')
            ->get()
            ->map(function ($course) {
                return [
                    'title' => $course->title,
                    'students_enrolled' => $course->enrollments->count(),
                ];
            });

        return response()->json([
            'courses' => $courses,
        ]);
    }

    /**
     * Get monthly earnings data for instructor
     */
    public function monthlyEarnings()
    {
        $instructorId = Auth::id();

        // Get payments for this instructor's courses for the last 6 months
        $earnings = [];
        $currentMonth = now();

        for ($i = 5; $i >= 0; $i--) {
            $month = $currentMonth->clone()->subMonths($i);
            $monthLabel = $month->locale('id_ID')->translatedFormat('M');
            $year = $month->year;

            // Calculate total earnings for this month
            $monthlyTotal = DB::table('payments')
                ->join('enrollments', 'payments.enrollment_id', '=', 'enrollments.id')
                ->join('courses', 'enrollments.course_id', '=', 'courses.id')
                ->where('courses.instructor_id', $instructorId)
                ->whereYear('payments.created_at', $year)
                ->whereMonth('payments.created_at', $month->month)
                ->sum('payments.amount');

            $earnings[] = [
                'month' => $monthLabel,
                'amount' => $monthlyTotal,
            ];
        }

        return response()->json([
            'monthly_earnings' => $earnings,
        ]);
    }

    /**
     * Get admin dashboard data
     */
    public function adminDashboard()
    {
        // Total users
        $totalUsers = \App\Models\User::count();

        // Total courses
        $totalCourses = Course::count();

        // Total enrollments
        $totalEnrollments = Enrollment::count();

        // Pending courses for review
        $pendingCourses = Course::where('status', 'Pending')->count();

        return response()->json([
            'total_users' => $totalUsers,
            'total_courses' => $totalCourses,
            'total_enrollments' => $totalEnrollments,
            'pending_courses' => $pendingCourses,
        ]);
    }

    /**
     * Get instructor's classes/courses
     */
    public function instructorClasses()
    {
        $instructorId = Auth::id();

        // Get all courses for this instructor with enrollment count
        $courses = Course::where('instructor_id', $instructorId)
            ->with('enrollments')
            ->select('id', 'title', 'category', 'price', 'status', 'created_at')
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'category' => $course->category,
                    'price' => $course->price,
                    'status' => $course->status,
                    'students' => $course->enrollments->count(),
                    'date' => $course->created_at->format('Y-m-d'),
                ];
            });

        return response()->json([
            'courses' => $courses,
        ]);
    }

    /**
     * Get student dashboard data
     */
    public function studentDashboard()
    {
        $studentId = Auth::id();
        $user = Auth::user();

        // Get active courses (enrolled courses)
        $activeCourses = Enrollment::where('user_id', $studentId)
            ->with('course')
            ->get()
            ->count();

        // Get hours learned - sum of all material durations from enrolled courses
        $hoursLearned = DB::table('materials')
            ->join('chapters', 'materials.chapter_id', '=', 'chapters.id')
            ->join('enrollments', 'chapters.course_id', '=', 'enrollments.course_id')
            ->where('enrollments.user_id', $studentId)
            ->sum('materials.duration');

        // Convert minutes to hours (assuming duration is in minutes)
        $hoursLearned = $hoursLearned ? round($hoursLearned / 60, 1) : 0;

        // Get certificates earned
        $certificatesEarned = \App\Models\Certificate::where('user_id', $studentId)->count();

        // Get first name from user name (split by space)
        $firstName = explode(' ', $user->name)[0];

        // Get recommended courses - top 3 courses by enrollment count
        $recommendedCourses = Course::with(['instructor', 'enrollments'])
            ->where('status', 'Published')
            ->withCount('enrollments')
            ->orderBy('enrollments_count', 'desc')
            ->limit(3)
            ->get();
        
        Log::info('Recommended courses query result: ' . $recommendedCourses->count());
        
        $recommendedCourses = $recommendedCourses->map(function ($course) {
                // Calculate average rating from reviews
                $reviewsCollection = \App\Models\Review::where('course_id', $course->id)->get();
                $rating = $reviewsCollection->avg('rating') ?? 0;
                
                // Clean thumbnail path
                $thumbnail = $course->thumbnail;
                if (!$thumbnail || $thumbnail === 'null' || trim($thumbnail) === '') {
                    $thumbnail = '/images/course-thumb.jpg';
                } elseif (!str_starts_with($thumbnail, '/') && !str_starts_with($thumbnail, 'http')) {
                    $thumbnail = '/' . $thumbnail;
                }
                
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'category' => $course->category ?? 'General',
                    'level' => $course->level ?? 'Beginner',
                    'instructor' => $course->instructor->name ?? 'Unknown',
                    'students' => $course->enrollments_count,
                    'rating' => round($rating, 1),
                    'thumbnail' => $thumbnail,
                ];
            });

        return response()->json([
            'first_name' => $firstName,
            'active_courses' => $activeCourses,
            'hours_learned' => $hoursLearned,
            'certificates_earned' => $certificatesEarned,
            'recommended_courses' => $recommendedCourses,
        ]);
    }

    /**
     * Get all published courses for student explore page
     */
    public function exploreCourses()
    {
        try {
            // Get all courses first
            $allCourses = Course::with(['instructor', 'enrollments'])->get();
            
            Log::info('Total courses in DB: ' . $allCourses->count());
            Log::info('Course statuses: ' . $allCourses->pluck('status')->unique()->implode(', '));
            
            // Filter courses with Published or Approved status (case-insensitive)
            $courses = $allCourses
                ->filter(function ($course) {
                    $status = strtolower(trim($course->status ?? ''));
                    return in_array($status, ['published', 'approved', 'publish']);
                })
                ->map(function ($course) {
                    // Calculate average rating from reviews
                    $reviewsCollection = \App\Models\Review::where('course_id', $course->id)->get();
                    $rating = $reviewsCollection->avg('rating') ?? 0;
                    $reviewsCount = $reviewsCollection->count();
                    
                    // Clean thumbnail path
                    $thumbnail = $course->thumbnail;
                    if (!$thumbnail || $thumbnail === 'null' || trim($thumbnail) === '') {
                        $thumbnail = '/images/course-default.jpg';
                    } elseif (!str_starts_with($thumbnail, '/') && !str_starts_with($thumbnail, 'http')) {
                        // Add leading slash if not present
                        $thumbnail = '/' . $thumbnail;
                    }
                    
                    return [
                        'id' => $course->id,
                        'title' => $course->title,
                        'category' => $course->category ?? 'General',
                        'level' => $course->level ?? 'Beginner',
                        'price' => $course->price ?? 0,
                        'thumbnail' => $thumbnail,
                        'rating' => $rating,
                        'reviews' => $reviewsCount,
                        'students' => $course->enrollments->count(),
                        'instructor' => $course->instructor->name ?? 'Unknown',
                    ];
                })
                ->values();

            Log::info('Filtered courses count: ' . $courses->count());

            return response()->json([
                'courses' => $courses,
                'total' => $courses->count(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error in exploreCourses: ' . $e->getMessage());
            return response()->json([
                'courses' => [],
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get student profile progress data
     */
    public function getProfileProgress()
    {
        $studentId = Auth::id();
        
        // Get total enrolled courses
        $totalCourses = Enrollment::where('user_id', $studentId)->count();
        
        // Get completed courses (courses with certificates)
        $completedCourses = \App\Models\Certificate::where('user_id', $studentId)->count();
        
        // Alternative: could also check if all chapters/materials are completed
        // But using certificates is more accurate as it requires course completion
        
        return response()->json([
            'total_courses' => $totalCourses,
            'completed_courses' => $completedCourses,
            'completion_percentage' => $totalCourses > 0 
                ? round(($completedCourses / $totalCourses) * 100, 1) 
                : 0,
        ]);
    }

    /**
     * Get all students enrolled in instructor's courses
     */
    public function instructorStudents(Request $request)
    {
        $instructorId = Auth::id();

        // Get all course IDs created by this instructor
        $courseIds = Course::where('instructor_id', $instructorId)->pluck('id');

        // Get all enrollments for instructor's courses
        $studentsQuery = Enrollment::with(['user', 'course'])
            ->whereIn('course_id', $courseIds)
            ->join('users', 'enrollments.user_id', '=', 'users.id')
            ->select('enrollments.*', 'users.name', 'users.email')
            ->orderBy('enrollments.created_at', 'desc');

        // Apply search filter if provided
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $studentsQuery->where(function ($query) use ($search) {
                $query->where('users.name', 'like', "%{$search}%")
                      ->orWhere('users.email', 'like', "%{$search}%");
            });
        }

        $enrollments = $studentsQuery->get();

        // Map the data with status
        $students = $enrollments->map(function ($enrollment) {
            // Check if student has certificate for this course
            $hasCertificate = \App\Models\Certificate::where('user_id', $enrollment->user_id)
                ->where('course_id', $enrollment->course_id)
                ->exists();

            // Calculate progress percentage
            $totalMaterials = DB::table('materials')
                ->join('chapters', 'materials.chapter_id', '=', 'chapters.id')
                ->where('chapters.course_id', $enrollment->course_id)
                ->count();

            $completedMaterials = \App\Models\Progress::where('user_id', $enrollment->user_id)
                ->whereIn('material_id', function ($query) use ($enrollment) {
                    $query->select('materials.id')
                        ->from('materials')
                        ->join('chapters', 'materials.chapter_id', '=', 'chapters.id')
                        ->where('chapters.course_id', $enrollment->course_id);
                })
                ->where('is_completed', true)
                ->count();

            $progress = $totalMaterials > 0 
                ? round(($completedMaterials / $totalMaterials) * 100) 
                : 0;

            return [
                'id' => $enrollment->user_id,
                'name' => $enrollment->user->name,
                'email' => $enrollment->user->email,
                'course' => $enrollment->course->title,
                'course_id' => $enrollment->course_id,
                'progress' => $progress,
                'status' => $hasCertificate ? 'Completed' : 'Active',
                'joined' => $enrollment->created_at->format('Y-m-d'),
            ];
        });

        return response()->json([
            'students' => $students,
            'total' => $students->count(),
        ]);
    }
}
