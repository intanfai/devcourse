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
            'category' => 'nullable|string',
            'level' => 'nullable|string',
            'status' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        // Allow only instructors (role_id = 2) and admin (role_id = 1)
        $user = auth()->user();
        if (!$user || !in_array($user->role_id, [1, 2])) {
            return response()->json([
                'message' => 'Only instructors or admin can create courses'
            ], 403);
        }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'category' => $request->category,
            'level' => $request->level,
            'status' => $request->status ?? 'Pending',
            'instructor_id' => auth()->id(), // AMBIL ID USER LOGIN
        ];

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            // store path accessible via storage link
            $data['thumbnail'] = 'storage/' . $path;
        }

        $course = Course::create($data);

        // Handle chapters -> materials and quizzes
        if ($request->filled('chapters')) {
            $chapters = json_decode($request->input('chapters'), true);
            if (is_array($chapters)) {
                $chapterOrder = 1;
                foreach ($chapters as $chapter) {
                    $chapterModel = \App\Models\Chapter::create([
                        'course_id' => $course->id,
                        'title' => $chapter['title'] ?? null,
                        'description' => $chapter['description'] ?? null,
                        'order' => $chapter['order'] ?? $chapterOrder++,
                    ]);

                    // materials
                    if (!empty($chapter['materials']) && is_array($chapter['materials'])) {
                        $order = 1;
                        foreach ($chapter['materials'] as $mat) {
                            $matData = [
                                'course_id' => $course->id,
                                'chapter_id' => $chapterModel->id,
                                'title' => $mat['title'] ?? '',
                                'content' => $mat['content'] ?? null,
                                'video_url' => null,
                                'order' => $order++,
                            ];

                            // if video_field provided, store uploaded file
                            if (!empty($mat['video_field']) && $request->hasFile($mat['video_field'])) {
                                $vpath = $request->file($mat['video_field'])->store('materials_videos', 'public');
                                $matData['video_url'] = 'storage/' . $vpath;
                            }

                            \App\Models\Material::create($matData);
                        }
                    }

                    // chapter-level quiz (optional)
                    if (!empty($chapter['quiz']) && !empty($chapter['quiz']['questions'])) {
                        $quiz = \App\Models\Quiz::create([
                            'course_id' => $course->id,
                            'chapter_id' => $chapterModel->id,
                            'title' => $chapter['quiz']['title'] ?? 'Chapter Quiz',
                            'passing' => $chapter['quiz']['passing'] ?? 60,
                        ]);

                        foreach ($chapter['quiz']['questions'] as $q) {
                            $options = $q['choices'] ?? [];
                            $optA = $options[0] ?? null;
                            $optB = $options[1] ?? null;
                            $optC = $options[2] ?? null;
                            $optD = $options[3] ?? null;

                            \App\Models\QuizQuestion::create([
                                'quiz_id' => $quiz->id,
                                'question' => $q['question'] ?? '',
                                'option_a' => $optA,
                                'option_b' => $optB,
                                'option_c' => $optC,
                                'option_d' => $optD,
                                'correct_answer' => $q['correct'] ?? '',
                            ]);
                        }
                    }
                }
            }
        }

        // Handle final quiz
        if ($request->filled('final_quiz')) {
            $final = json_decode($request->input('final_quiz'), true);
            if (!empty($final) && !empty($final['questions'])) {
                $fquiz = \App\Models\Quiz::create([
                    'course_id' => $course->id,
                    'title' => $final['title'] ?? 'Final Quiz',
                    'passing' => $final['passing'] ?? 60,
                ]);

                foreach ($final['questions'] as $q) {
                    $options = $q['choices'] ?? [];
                    $optA = $options[0] ?? null;
                    $optB = $options[1] ?? null;
                    $optC = $options[2] ?? null;
                    $optD = $options[3] ?? null;

                    \App\Models\QuizQuestion::create([
                        'quiz_id' => $fquiz->id,
                        'question' => $q['question'] ?? '',
                        'option_a' => $optA,
                        'option_b' => $optB,
                        'option_c' => $optC,
                        'option_d' => $optD,
                        'correct_answer' => $q['correct'] ?? '',
                    ]);
                }
            }
        }

        return response()->json($course);
    }


    public function show($id)
    {
        return Course::with(['instructor', 'chapters.materials', 'chapters.quiz.questions', 'quizzes.questions'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        
        // Only allow updating specific fields for non-admin users
        $allowedFields = ['status'];
        if (auth()->user()?->role_id === 1) {
            // Admin can update all fields
            $allowedFields = ['title', 'description', 'price', 'category', 'level', 'status', 'thumbnail'];
        }
        
        $data = [];
        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $data[$field] = $request->input($field);
            }
        }
        
        if (!empty($data)) {
            $course->update($data);
        }
        
        return response()->json($course);
        return $course;
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();
        return response()->json(['message' => 'Course deleted']);
    }
}
