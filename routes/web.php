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


// ================================
//           API ROUTES
// ================================
Route::prefix('api')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
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

});
