<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required'
        ]);

        return Quiz::create($data);
    }

    public function show($id)
    {
        return Quiz::with('questions')->findOrFail($id);
    }
}
