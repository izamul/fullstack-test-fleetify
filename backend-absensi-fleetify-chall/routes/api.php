<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    EmployeeController,
    DepartementController,
    AttendanceController
};

Route::apiResource('employees', EmployeeController::class);
Route::apiResource('departements', DepartementController::class);

Route::post('attendance/check-in',  [AttendanceController::class, 'checkIn']);
Route::put('attendance/check-out',  [AttendanceController::class, 'checkOut']);
Route::get('attendance/logs',       [AttendanceController::class, 'logs']);
