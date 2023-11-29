<?php

use App\Http\Controllers\Admin\AssetController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('user', function() {
    return "User";
})->name('user')->middleware(['role:user']);

Route::prefix('admin')->middleware(['role:admin'])->name('admin.')->group(function() {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/category', CategoryController::class);
    Route::resource('/department', DepartmentController::class);
    Route::resource('/section', SectionController::class);
    Route::resource('/supplier', SupplierController::class);
    Route::resource('/asset', AssetController::class);
    Route::get('/asset/lastcode/{company}/{category}/{budget}', [AssetController::class, 'getLastCode']);
    Route::get('/asset/lastname/{company}/{category}/{department}', [AssetController::class, 'getLastName']);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
