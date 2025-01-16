<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Data_pelangganController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Service_requestsController;
use App\Http\Controllers\ServiceOrder\ServiceOrderController;

// Halaman utama
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Rute untuk user login
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Rute operasi Read (akses oleh user dan admin)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/test', [App\Http\Controllers\Test\TestController::class, 'index']);
    Route::get('/test/{id}', [App\Http\Controllers\Test\TestController::class, 'show']);

    // kategori
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);

    // Rute jasa servis
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);

    // service-order
    Route::get('/service-orders', [ServiceOrderController::class, 'index']);
    Route::get('/service-orders/{id}', [ServiceOrderController::class, 'show']);
    Route::post('/service-orders', [ServiceOrderController::class, 'store']);
    Route::get('/user/service-orders', [ServiceOrderController::class, 'getUserOrders']);
});

// Rute untuk operasi Create, Update, dan Delete (akses oleh admin saja)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/test', [App\Http\Controllers\Test\TestController::class, 'store']);
    Route::put('/test/{id}', [App\Http\Controllers\Test\TestController::class, 'update']);
    Route::delete('/test/{id}', [App\Http\Controllers\Test\TestController::class, 'destroy']);

    // kategori
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Rute jasa servis
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // service-order
    Route::put('/service-orders/{id}/status', [ServiceOrderController::class, 'updateStatus']);
});

// Rute tambahan
Route::resource('data_pelanggan', Data_pelangganController::class);
Route::resource('service_requests', Service_requestsController::class);
Route::resource('payments', PaymentsController::class);

Route::put('service_requests/{id}/cancel', [Service_requestsController::class, 'cancel']);
Route::put('service_requests/{id}/complete', [Service_requestsController::class, 'completeServiceRequest']);

// Rute untuk autentikasi
require __DIR__.'/auth.php';
