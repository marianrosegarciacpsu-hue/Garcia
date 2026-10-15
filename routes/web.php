<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Brochure Route
Route::get('/products', function () {
    return Inertia::render('Products/page');
});

// Admin Dashboard Route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Default home route redirecting or rendering
Route::get('/', function () {
    return Inertia::render('Welcome');
});

require __DIR__.'/auth.php';