<?php

use Illuminate\Support\Facades\Route;

// === CONTROLLERS ===
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\DashboardController;

Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/data', function () {
    return response()->json(['message' => 'Admin only']);
});

// admin stats
use App\Http\Controllers\AdminController;
Route::middleware(['auth:sanctum', 'role:1'])->get('/admin/stats', [AdminController::class, 'stats']);


Route::post('/login', [AuthController::class, 'login']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Admin: create / update / delete users
Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
Route::get('/roles/{id}', [RoleController::class, 'show']);
Route::put('/roles/{id}', [RoleController::class, 'update']);
Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::patch('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

Route::post('/materials', [MaterialController::class, 'store']);
Route::get('/materials/{id}', [MaterialController::class, 'show']);
Route::put('/materials/{id}', [MaterialController::class, 'update']);
Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);

Route::post('/quizzes', [QuizController::class, 'store']);
Route::get('/quizzes/{id}', [QuizController::class, 'show']);

Route::post('/quiz-questions', [QuizQuestionController::class, 'store']);

Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::get('/enrollments', [EnrollmentController::class, 'index']);

Route::post('/payments', [PaymentController::class, 'store']);

Route::post('/progress', [ProgressController::class, 'store']);

Route::get('/certificates/{id}', [CertificateController::class, 'show']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('/notifications', [NotificationController::class, 'store']);
Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

// ================================
//           API ROUTES
// ================================

    /*
    |--------------------------------------------------------------------------
    | AUTH
    --------------------------------------------------------------------------
    */
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);


    /*
    |--------------------------------------------------------------------------
    | USERS
    |--------------------------------------------------------------------------
    */
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);


    /*
    |--------------------------------------------------------------------------
    | ROLES
    |--------------------------------------------------------------------------
    */
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | COURSES
    |--------------------------------------------------------------------------
    */
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::patch('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | MATERIALS
    |--------------------------------------------------------------------------
    */
    Route::post('/materials', [MaterialController::class, 'store']);
    Route::get('/materials/{id}', [MaterialController::class, 'show']);
    Route::put('/materials/{id}', [MaterialController::class, 'update']);
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);


    /*
    |--------------------------------------------------------------------------
    | QUIZZES
    |--------------------------------------------------------------------------
    */
    Route::post('/quizzes', [QuizController::class, 'store']);
    Route::get('/quizzes/{id}', [QuizController::class, 'show']);


    /*
    |--------------------------------------------------------------------------
    | QUIZ QUESTIONS
    |--------------------------------------------------------------------------
    */
    Route::post('/quiz-questions', [QuizQuestionController::class, 'store']);


    /*
    |--------------------------------------------------------------------------
    | ENROLLMENTS (Buy Course)
    |--------------------------------------------------------------------------
    */
    Route::post('/enrollments', [EnrollmentController::class, 'store']);
    Route::get('/enrollments', [EnrollmentController::class, 'index']);


    /*
    |--------------------------------------------------------------------------
    | PAYMENTS
    |--------------------------------------------------------------------------
    */
    Route::post('/payments', [PaymentController::class, 'store']);


    /*
    |--------------------------------------------------------------------------
    | PROGRESS
    |--------------------------------------------------------------------------
    */
    Route::post('/progress', [ProgressController::class, 'store']);


    /*
    |--------------------------------------------------------------------------
    | CERTIFICATES
    |--------------------------------------------------------------------------
    */
    Route::get('/certificates/{id}', [CertificateController::class, 'show']);


    /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS
    |--------------------------------------------------------------------------
    */
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    Route::middleware('role:1')->get('/admin/dashboard', function () {
    return 'Admin only';
    });
    Route::middleware('role:1,2')->post('/courses', [CourseController::class, 'store']);
    Route::middleware('role:3')->get('/my-courses', [EnrollmentController::class, 'index']);
    Route::middleware('role:1,2')->post('/materials', [MaterialController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {

    // Dashboard routes
    Route::get('/dashboard/instructor', [DashboardController::class, 'instructorDashboard'])->middleware('role:2');
    Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard'])->middleware('role:1');
    Route::get('/dashboard/student', [DashboardController::class, 'studentDashboard'])->middleware('role:3');
    Route::get('/dashboard/course-performance', [DashboardController::class, 'coursePerformance'])->middleware('role:2');
    Route::get('/dashboard/monthly-earnings', [DashboardController::class, 'monthlyEarnings'])->middleware('role:2');
    Route::get('/dashboard/instructor-classes', [DashboardController::class, 'instructorClasses'])->middleware('role:2');
    Route::get('/dashboard/explore-courses', [DashboardController::class, 'exploreCourses'])->middleware('role:3');

    // semua route ini butuh token
    Route::get('/courses', [CourseController::class, 'index']);

    Route::post('/courses', [CourseController::class, 'store'])
        ->middleware('role:1,2'); // instructor or admin

    Route::get('/notifications', [NotificationController::class, 'index']);

    //api material untuk mengelola materi
    Route::post('/materials', [MaterialController::class, 'store'])->middleware('role:2'); // instructor only

    Route::get('/courses/{id}/materials', [MaterialController::class, 'getByCourse']);

    Route::put('/materials/{id}', [MaterialController::class, 'update'])->middleware('role:2');

    Route::delete('/materials/{id}', [MaterialController::class, 'destroy'])->middleware('role:2');

    //api enrollment untuk mengakses course dan materi
    Route::post('/enrollments', [EnrollmentController::class, 'store']);
});


