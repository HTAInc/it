<?php

use App\Http\Controllers\Admin\AssetController;
use App\Http\Controllers\Admin\AssetTransactionController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DeviceController;
use App\Http\Controllers\Admin\DeviceTransactionController;
use App\Http\Controllers\Admin\DowntimeController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\UserContoller;
use App\Http\Controllers\Admin\WorkOrderController;
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
    Route::resource('/user', UserContoller::class);
    Route::resource('/category', CategoryController::class);
    Route::resource('/department', DepartmentController::class);
    Route::resource('/section', SectionController::class);
    Route::resource('/supplier', SupplierController::class);
    Route::resource('/device', DeviceController::class);
    Route::get('/device/lastcode/{company}/{category}/{budget}', [DeviceController::class, 'getLastCode']);
    Route::get('/device/lastname/{status}/{company}/{category}/{department}', [DeviceController::class, 'getLastName']);
    Route::resource('/deviceTransaction', DeviceTransactionController::class);
    Route::resource('/downtime', DowntimeController::class);
    Route::resource('/work-order', WorkOrderController::class);
    Route::get('/work-order/take/{id}', [WorkOrderController::class,'take'])->name('workOrder.take'); 
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
