<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    /**
     * Convert duration from MM:SS format to total minutes
     */
    private function convertDurationToMinutes($duration)
    {
        if (empty($duration)) return 0;
        
        // If it's already a number, return it
        if (is_numeric($duration)) return (int)$duration;
        
        // Parse MM:SS format
        $parts = explode(':', $duration);
        if (count($parts) === 2) {
            $minutes = (int)$parts[0];
            $seconds = (int)$parts[1];
            return $minutes + ($seconds > 0 ? 1 : 0); // Round up for partial minutes
        }
        
        return 0;
    }

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
        $user = Auth::user();
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
            'instructor_id' => Auth::id(), // AMBIL ID USER LOGIN
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
                                'duration' => $this->convertDurationToMinutes($mat['duration'] ?? null),
                                'order' => $order++,
                            ];

                            // Debug: Log material data
                            $videoField = $mat['video_field'] ?? null;
                            Log::info('Processing material: ' . ($mat['title'] ?? 'untitled'));
                            Log::info('Video field: ' . ($videoField ?? 'none'));

                            // if video_field provided, store uploaded file
                            if (!empty($videoField)) {
                                Log::info('Checking for file: ' . $videoField);
                                
                                if ($request->hasFile($videoField)) {
                                    try {
                                        Log::info('File found! Uploading video: ' . $videoField);
                                        $vpath = $request->file($videoField)->store('materials_videos', 'public');
                                        $matData['video_url'] = 'storage/' . $vpath;
                                        Log::info('Video uploaded successfully: ' . $matData['video_url']);
                                    } catch (\Exception $e) {
                                        Log::error('Video upload failed: ' . $e->getMessage());
                                    }
                                } else {
                                    Log::warning('File not found in request for: ' . $videoField);
                                    Log::info('Available files in request: ' . json_encode(array_keys($request->allFiles())));
                                }
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
        $course = Course::with([
            'instructor',
            'chapters.materials', 
            'chapters.quiz.questions',
            'quizzes.questions',
            'enrollments',
            'reviews.user'
        ])->findOrFail($id);

        // Transform chapters to include quiz data properly
        $course->chapters->each(function($chapter) {
            if ($chapter->quiz) {
                // Load questions if not already loaded
                if (!$chapter->quiz->relationLoaded('questions')) {
                    $chapter->quiz->load('questions');
                }
                $chapter->quizzes = [$chapter->quiz]; // Make it array for frontend consistency
            } else {
                $chapter->quizzes = [];
            }
        });

        // Add enrollments count
        $course->enrollments_count = $course->enrollments->count();

        // Add reviews count and average rating
        $course->reviews_count = $course->reviews->count();
        $course->average_rating = $course->reviews_count > 0 
            ? round($course->reviews->avg('rating'), 1) 
            : 0;

        // Transform reviews to include user data
        $course->reviews_list = $course->reviews->map(function($review) {
            return [
                'id' => $review->id,
                'user' => $review->user->name,
                'avatar' => $review->user->avatar ?: '',
                'rating' => $review->rating,
                'comment' => $review->review,
                'created_at' => $review->created_at->format('Y-m-d'),
            ];
        });

        return response()->json($course);
    }

    public function update(Request $request, $id)
    {
        try {
            $course = Course::findOrFail($id);
            
            // Update basic fields only if provided
            $data = [];
            
            if ($request->has('title')) $data['title'] = $request->title;
            if ($request->has('description')) $data['description'] = $request->description;
            if ($request->has('price')) $data['price'] = $request->price;
            if ($request->has('category')) $data['category'] = $request->category;
            if ($request->has('level')) $data['level'] = $request->level;
            if ($request->has('status')) $data['status'] = $request->status;
        
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $data['thumbnail'] = 'storage/' . $path;
        }
        
        $course->update($data);

        // Only process chapters/materials/quizzes if chapters data is provided
        if ($request->filled('chapters')) {
            // Delete and recreate chapters/materials/quizzes for simplicity
            // In production, you might want to do more granular updates
            foreach ($course->chapters as $chapter) {
                // Delete quiz questions
                if ($chapter->quiz) {
                    $chapter->quiz->questions()->delete();
                    $chapter->quiz->delete();
                }
                // Delete materials
                $chapter->materials()->delete();
                // Delete chapter
                $chapter->delete();
            }
            
            // Delete final quiz if exists
            $course->quizzes()->whereNull('chapter_id')->each(function($quiz) {
                $quiz->questions()->delete();
                $quiz->delete();
            });

            // Recreate chapters from request
            $chapters = json_decode($request->input('chapters'), true);
            if (is_array($chapters)) {
                $chapterOrder = 1;
                foreach ($chapters as $chapter) {
                    $chapterModel = \App\Models\Chapter::create([
                        'course_id' => $course->id,
                        'title' => $chapter['title'] ?? null,
                        'description' => $chapter['description'] ?? null,
                        'order' => $chapterOrder++,
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
                                'video_url' => $mat['existing_video_url'] ?? null,
                                'duration' => $this->convertDurationToMinutes($mat['duration'] ?? null),
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
                                'points' => $q['points'] ?? 1,
                            ]);
                        }
                    }
                }
            }
        }

        // Recreate final quiz
        if ($request->filled('final_quiz')) {
            $final = json_decode($request->input('final_quiz'), true);
            if (!empty($final) && !empty($final['questions'])) {
                $fquiz = \App\Models\Quiz::create([
                    'course_id' => $course->id,
                    'chapter_id' => null, // NULL means final quiz
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
                        'points' => $q['points'] ?? 1,
                    ]);
                }
            }
        }
        
        return response()->json(['message' => 'Course updated successfully', 'course' => $course]);
        
        } catch (\Exception $e) {
            Log::error('Course update failed: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update course', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();
        return response()->json(['message' => 'Course deleted']);
    }

    public function getCertificates()
    {
        $user = Auth::user();
        
        $certificates = \App\Models\Certificate::with('course')
            ->where('user_id', $user->id)
            ->orderBy('issued_at', 'desc')
            ->get();

        return response()->json($certificates);
    }

    public function submitReview(Request $request, $courseId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|min:10',
        ]);

        $user = Auth::user();

        // Check if user already reviewed this course
        $existingReview = \App\Models\Review::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->first();

        if ($existingReview) {
            // Update existing review
            $existingReview->update([
                'rating' => $request->rating,
                'review' => $request->review,
            ]);

            // Create certificate record if not exists
            $certificate = \App\Models\Certificate::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->first();

            if (!$certificate) {
                \App\Models\Certificate::create([
                    'user_id' => $user->id,
                    'course_id' => $courseId,
                    'issued_at' => now(),
                ]);
            }

            return response()->json(['message' => 'Review updated successfully', 'review' => $existingReview]);
        }

        // Create new review
        $review = \App\Models\Review::create([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        // Create certificate record if not exists
        $certificate = \App\Models\Certificate::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->first();

        if (!$certificate) {
            \App\Models\Certificate::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
                'issued_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Review submitted successfully', 'review' => $review]);
    }

    public function downloadCertificate($courseId)
    {
        try {
            $user = Auth::user();

            Log::info('Certificate download requested', [
                'user_id' => $user->id,
                'course_id' => $courseId
            ]);

            // Check if user has reviewed the course
            $hasReview = \App\Models\Review::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->exists();

            if (!$hasReview) {
                Log::warning('Certificate download failed: No review found', [
                    'user_id' => $user->id,
                    'course_id' => $courseId
                ]);
                return response()->json(['message' => 'You must submit a review before downloading the certificate'], 403);
            }

            // Load course with instructor
            $course = Course::with('instructor')->findOrFail($courseId);
            
            // Check if certificate already exists
            $certificate = \App\Models\Certificate::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->first();

            if (!$certificate) {
                // Create certificate record
                $certificate = \App\Models\Certificate::create([
                    'user_id' => $user->id,
                    'course_id' => $courseId,
                    'issued_at' => now(),
                ]);
                Log::info('Certificate record created', ['certificate_id' => $certificate->id]);
            }

            Log::info('Generating PDF certificate');

            // Generate PDF certificate
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('certificates.template', [
                'user' => $user,
                'course' => $course,
                'certificate' => $certificate,
            ]);
            
            // Set to landscape A4
            $pdf->setPaper('A4', 'landscape');

            // Clean filename: remove invalid characters for file names
            $cleanTitle = preg_replace('/[^A-Za-z0-9\-]/', '-', strtolower($course->title));
            $cleanTitle = preg_replace('/-+/', '-', $cleanTitle); // Replace multiple dashes with single dash
            $fileName = 'certificate-' . $cleanTitle . '.pdf';
            
            Log::info('Certificate PDF generated successfully', ['filename' => $fileName]);
            
            return $pdf->download($fileName);
            
        } catch (\Exception $e) {
            Log::error('Certificate download failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to generate certificate',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
