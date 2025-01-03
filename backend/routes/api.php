<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//contoh. perlu login dan role user admin baru bisa mengakses api test ini.
//role untuk sekarang bisa diset langsung di dalam dbnya
Route::middleware(['auth:sanctum', 'role:admin'])->apiResource(
    '/test',
    App\Http\Controllers\Test\TestController::class
);
