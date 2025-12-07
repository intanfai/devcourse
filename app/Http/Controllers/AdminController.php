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
}
