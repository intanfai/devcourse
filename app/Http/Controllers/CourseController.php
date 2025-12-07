<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return Course::with('instructor')->paginate(10);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
        ]);

        // Pastikan user adalah instruktur
        if (auth()->user()->role_id != 2) {
            return response()->json([
                'message' => 'Only instructors can create courses'
            ], 403);
        }

        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'instructor_id' => auth()->id(), // AMBIL ID USER LOGIN
            'status' => 'pending',
        ]);

        return response()->json($course);
    }


    public function show($id)
    {
        return Course::with(['materials', 'quizzes'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->all());
        return $course;
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();
        return response()->json(['message' => 'Course deleted']);
    }
}
