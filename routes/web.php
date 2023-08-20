<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

function users($length) {
    $users = [];
    for ($i = 1; $i <= $length; $i++) {
        $users[] = "User $i";
    }
    return $users;
}

Route::get('/', function () {
    return view('index');
});

Route::get('/first', function () {
    return view('first', [
        'users' => users(12),
        'winner' => 'User 4'
    ]);
})->name('first');

Route::get('/second', function () {
    return view('second', [
        'users' => users(12),
        'winner' => 'User 4'
    ]);
})->name('second');

Route::get('/third', function () {
    return view('third', [
        'users' => users(12),
        'winner' => 'User 7'
    ]);
})->name('third');

Route::get('/fourth', function () {
    return view('fourth', [
        'users' => users(12),
        'winner' => 'User 9'
    ]);
})->name('fourth');

Route::get('/fifth', function () {
    return view('fifth', [
        'users' => users(12),
        'winner' => 'User 5'
    ]);
})->name('fifth');
