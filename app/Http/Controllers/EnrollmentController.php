<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $enrollments = Enrollment::where('user_id', $user->id)
            ->with('course', 'payment')
            ->get();

        return response()->json(['enrollments' => $enrollments]);
    }

    public function show($id)
    {
        $enrollment = Enrollment::with('course', 'payment', 'user')
            ->findOrFail($id);

        // Ensure user can only view their own enrollments
        if ($enrollment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($enrollment);
    }

    public function getPaymentStatus($id)
    {
        $enrollment = Enrollment::findOrFail($id);

        // Ensure user can only check their own payment
        if ($enrollment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $payment = $enrollment->payment;

        return response()->json([
            'payment_status' => $payment ? $payment->status : 'no_payment',
            'payment' => $payment
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = auth()->user();

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
