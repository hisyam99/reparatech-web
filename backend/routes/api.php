<?php

use App\Http\Controllers\data_pelangganController;
use App\Http\Controllers\service_requestsController;
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

Route::resource('data_pelanggan', data_pelangganController::class);
Route::resource('service_requests', service_requestsController::class);

Route::put('service_requests/{id}/cancel', [service_requestsController::class, 'cancel']);