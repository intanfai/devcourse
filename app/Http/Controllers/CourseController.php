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
        $data = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'instructor_id' => 'required|exists:users,id'
        ]);

        return Course::create($data);
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
