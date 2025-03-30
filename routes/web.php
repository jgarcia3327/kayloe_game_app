<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [GameController::class, 'home'])->name('home');


Route::get('/play/game/{game}', [GameController::class, 'play'])->name('public.play.game');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/games', [GameController::class, 'index'])->name('games.index');
    Route::get('/games/{game}', [GameController::class, 'edit'])->name('games.edit');
    Route::get('/games/user/{user}', [GameController::class, 'user'])->name('games.user');
    Route::get('/games/me/games', [GameController::class, 'me_games'])->name('games.me.games');
    Route::patch('/games/{game}', [GameController::class, 'update'])->name('games.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
