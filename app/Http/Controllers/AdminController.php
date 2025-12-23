<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Schema;

class AdminController extends Controller
{
    // Return counts for admin dashboard
    public function stats(Request $request)
    {
        $students = User::where('role_id', 3)->count();
        $instructors = User::where('role_id', 2)->count();
        $courses = Course::count();
        $enrollments = Enrollment::count();
        // pending classes: those with status = 'pending'
        $pending = 0;
        if (Schema::hasColumn('courses', 'status')) {
            $pending = Course::where('status', 'pending')->count();
        }

        return response()->json([
            'students' => $students,
            'instructors' => $instructors,
            'courses' => $courses,
            'enrollments' => $enrollments,
            'pending_classes' => $pending,
        ]);
    }

    /**
     * Get all certificates for admin
     */
    public function getCertificates(Request $request)
    {
        $query = \App\Models\Certificate::with(['user', 'course'])
            ->orderBy('issued_at', 'desc');

        // Apply search filter if provided
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->whereHas('user', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply course filter if provided
        if ($request->has('course') && $request->course && $request->course !== 'All') {
            $query->whereHas('course', function($q) use ($request) {
                $q->where('title', $request->course);
            });
        }

        $certificates = $query->get()->map(function($cert) {
            return [
                'id' => $cert->id,
                'userName' => $cert->user->name,
                'email' => $cert->user->email,
                'course' => $cert->course->title,
                'issueDate' => $cert->issued_at ? $cert->issued_at->format('Y-m-d') : $cert->created_at->format('Y-m-d'),
                'status' => 'Completed',
                'certificate_url' => $cert->certificate_url,
            ];
        });

        // Get unique courses for filter dropdown
        $courses = \App\Models\Certificate::with('course')
            ->get()
            ->pluck('course.title')
            ->unique()
            ->values();

        return response()->json([
            'certificates' => $certificates,
            'courses' => $courses,
            'total' => $certificates->count(),
        ]);
    }
}
