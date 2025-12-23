<?php

use App\Http\Controllers\Auth\ForgotPasswordController as AuthForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController as AuthResetPasswordController;
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
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;


Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);


Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/data', function () {
    return response()->json(['message' => 'Admin only']);
});

// admin stats
use App\Http\Controllers\AdminController;
Route::middleware(['auth:sanctum', 'role:1'])->get('/admin/stats', [AdminController::class, 'stats']);
Route::middleware(['auth:sanctum', 'role:1'])->get('/admin/certificates', [AdminController::class, 'getCertificates']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Get instructor profile (untuk student preview course & admin approval)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/instructors/{id}/profile', [UserController::class, 'getInstructorProfile']);
});

// Admin: create / update / delete users
Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

// Admin & Instructor & Student: update own profile
Route::put('/profile', [UserController::class, 'updateProfile'])
    ->middleware('auth:sanctum')
    ->middleware('role:1,2,3');

// ROLES - Admin only
Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);
});

// COURSES - Admin & Instructor can create/update/delete
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);

Route::middleware(['auth:sanctum', 'role:1,2'])->group(function () {
    Route::post('/courses', [CourseController::class, 'store']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::patch('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
});

// MATERIALS - Instructor only
Route::get('/materials/{id}', [MaterialController::class, 'show']);

Route::middleware(['auth:sanctum', 'role:2'])->group(function () {
    Route::post('/materials', [MaterialController::class, 'store']);
    Route::put('/materials/{id}', [MaterialController::class, 'update']);
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);
});

// QUIZZES - Instructor only
Route::get('/quizzes/{id}', [QuizController::class, 'show']);

Route::middleware(['auth:sanctum', 'role:2'])->group(function () {
    Route::post('/quizzes', [QuizController::class, 'store']);
});

// QUIZ QUESTIONS - Instructor only
Route::middleware(['auth:sanctum', 'role:2'])->group(function () {
    Route::post('/quiz-questions', [QuizQuestionController::class, 'store']);
});

Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::get('/enrollments', [EnrollmentController::class, 'index'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/enrollments/{id}', [EnrollmentController::class, 'show']);
    Route::get('/enrollments/{id}/payment-status', [EnrollmentController::class, 'getPaymentStatus']);
});

Route::post('/payments', [PaymentController::class, 'store']);
// PAYMENTS - Admin only untuk update status
Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::put('/payments/{id}/status', [PaymentController::class, 'updateStatus']);
});

// Midtrans QRIS dynamic
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/payments/qris', [PaymentController::class, 'createQris']);
    Route::get('/payments/order/{orderId}/status', [PaymentController::class, 'status']);
    Route::get('/payments/enrollment/{enrollmentId}', [PaymentController::class, 'byEnrollment']);
});
Route::post('/payments/midtrans/webhook', [PaymentController::class, 'webhook']);

Route::post('/progress', [ProgressController::class, 'store']);

Route::get('/certificates/{id}', [CertificateController::class, 'show']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('/notifications', [NotificationController::class, 'store']);
Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

// ================================
//           API ROUTES
// ================================
// Semua route sudah diorganisir di atas dengan middleware yang sesuai

Route::middleware(['auth:sanctum'])->group(function () {

    // Dashboard routes
    Route::get('/dashboard/instructor', [DashboardController::class, 'instructorDashboard'])->middleware('role:2');
    Route::get('/dashboard/admin', [DashboardController::class, 'adminDashboard'])->middleware('role:1');
    Route::get('/dashboard/student', [DashboardController::class, 'studentDashboard'])->middleware('role:3');
    Route::get('/dashboard/course-performance', [DashboardController::class, 'coursePerformance'])->middleware('role:2');
    Route::get('/dashboard/monthly-earnings', [DashboardController::class, 'monthlyEarnings'])->middleware('role:2');
    Route::get('/dashboard/instructor-classes', [DashboardController::class, 'instructorClasses'])->middleware('role:2');
    Route::get('/dashboard/instructor-students', [DashboardController::class, 'instructorStudents'])->middleware('role:2');
    Route::get('/dashboard/explore-courses', [DashboardController::class, 'exploreCourses'])->middleware('role:3');
    Route::get('/dashboard/profile-progress', [DashboardController::class, 'getProfileProgress'])->middleware('role:3');

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

    //api review untuk submit review course
    Route::post('/courses/{courseId}/review', [CourseController::class, 'submitReview'])->middleware('role:3');

    //api certificate untuk download sertifikat
    Route::get('/certificates', [CourseController::class, 'getCertificates'])->middleware('role:3');
    Route::get('/certificates/download/{courseId}', [CourseController::class, 'downloadCertificate'])->middleware('role:3');

    //api forget Password
    

});


