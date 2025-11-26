<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = auth()->user();

        // Hanya siswa yang boleh enroll
        if ($user->role_id != 3) {
            return response()->json([
                'message' => 'Only students can enroll in courses.'
            ], 403);
        }

        // Cegah duplikasi enrollment
        $exists = Enrollment::where('user_id', $user->id)
                            ->where('course_id', $request->course_id)
                            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'You are already enrolled in this course.'
            ], 400);
        }

        // Simpan
        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $request->course_id,
        ]);

        return response()->json([
            'message' => 'Enrollment successful',
            'enrollment' => $enrollment
        ], 201);
    }
}
