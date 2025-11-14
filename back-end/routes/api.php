<?php




use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;


Route::post('/admin-login', [AdminController::class, 'login']);
Route::post('/admin-create', [AdminController::class, 'createAdmin']);


