<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id'
        ]);

        return Enrollment::create($data);
    }

    public function index()
    {
        return Enrollment::with(['user', 'course'])->get();
    }
}
