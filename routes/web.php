<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    } elseif ($user->role === 'user') {
        return redirect()->route('user.dashboard');
    }

    return redirect()->route('login'); // Fallback if role is not recognized
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/devices', [AdminController::class, 'devices'])->name('admin.devices');
    Route::resource('devices', DeviceController::class)->only(['index', 'store', 'destroy']);
    Route::post('/admin/devices/{id}/toggle', [AdminController::class, 'toggleDeviceStatus'])->name('devices.toggle');
    Route::get('/admin/dashboard/statistics', [AdminController::class, 'getStatistics'])->name('dashboard.statistics');
});

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/user/dashboard', [UserController::class, 'index'])->name('user.dashboard');
    Route::get('/user/metrics', [UserController::class, 'getMetrics'])->name('user.metrics');
    Route::post('/user/pump/toggle', [UserController::class, 'togglePump'])->name('user.pump.toggle');
});

require __DIR__ . '/auth.php';
