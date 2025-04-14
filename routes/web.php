<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\GameQuestionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [GameController::class, 'home'])->name('home');


Route::get('/play/game/{game}', [GameController::class, 'play'])->name('public.play.game');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // Game view
    Route::get('/games', [GameController::class, 'index'])->name('games.index');
    Route::get('games/create', [GameController::class, 'create'])->name('games.create');
    Route::get('/games/edit/{game}', [GameController::class, 'edit'])->name('games.edit');
    Route::get('/games/user/{user}', [GameController::class, 'user'])->name('games.user');
    Route::get('/games/my/games', [GameController::class, 'my_games'])->name('games.my.games');
    // Game process(void)
    Route::patch('/games/{game}', [GameController::class, 'update'])->name('games.update');
    Route::post('/games', [GameController::class, 'store'])->name('games.store');

    // Question view
    Route::get('/game/question/{game}', [GameQuestionController::class, 'create'])->name('game.question.create');
    Route::get('/game/question/edit/{question}', [GameQuestionController::class, 'edit'])->name('game.question.edit');
    // Question process(void)
    Route::patch('/game/question/{question}', [GameQuestionController::class, 'update'])->name('game.question.update');
    Route::delete('/game/question/{question}', [GameQuestionController::class, 'delete'])->name('game.question.delete');
    Route::post('/game/question', [GameQuestionController::class, 'store'])->name('game.question.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
