<?php

namespace App\Http\Controllers;

use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizQuestionController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question' => 'required',
            'option_a' => 'required',
            'option_b' => 'required',
            'option_c' => 'required',
            'option_d' => 'required',
            'correct_answer' => 'required'
        ]);

        return QuizQuestion::create($data);
    }
}
