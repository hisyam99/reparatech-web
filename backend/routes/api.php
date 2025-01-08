<?php

use App\Http\Controllers\Data_pelangganController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\Service_requestsController;
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

Route::resource('data_pelanggan', Data_pelangganController::class);
Route::resource('service_requests', Service_requestsController::class);
Route::resource('payments', PaymentsController::class);


Route::put('service_requests/{id}/cancel', [Service_requestsController::class, 'cancel']);
Route::put('service_requests/{id}/complete', [Service_requestsController::class, 'completeServiceRequest']);