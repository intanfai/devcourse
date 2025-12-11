<?php

use Illuminate\Support\Facades\Route;

Route::get('{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$');

Route::get('/reset-password/{token}', function ($token) {
    return response()->json([
        'token' => $token
    ]);
})->name('password.reset');