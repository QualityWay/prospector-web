<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SafraController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/dashboard', 301);

Route::prefix('/dashboard')
    ->name("dashboard")
    ->middleware(['auth'])
    ->group(
        function () {
            Route::get('/', [SafraController::class, 'index']);
            Route::post('/', [SafraController::class, 'index']);
        }
    );

Route::prefix('/safra')
    ->name("safra.")
    ->middleware(['auth'])
    ->group(
        function () {
            Route::get('/{year}/{month}/{day}', [SafraController::class, 'show'])->name('show');
            Route::post('/{year}/{month}/{day}', [SafraController::class, 'upsert'])->name('upsert');
        }
    );

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
