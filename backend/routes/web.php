<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

// Signup route
Route::post('/signup', [AuthController::class, 'signup']);

// Login route
Route::post('/login', [AuthController::class, 'login']);
