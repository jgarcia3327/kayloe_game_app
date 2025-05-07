<?php

use App\Http\Controllers\MainController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GameQuestionController;
use App\Http\Controllers\ShoppingItemController;
use App\Http\Controllers\ShoppingTicketController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MainController::class, 'home'])->name('home');

Route::get('/games', [GameController::class, 'index'])->name('games.index');

Route::get('/shopping', [ShoppingItemController::class, 'index'])->name('shopping.index');
Route::get('/shopping/all', [ShoppingItemController::class, 'all'])->name('shopping.all');
Route::get('/shopping/{shoppingItem}', [ShoppingItemController::class, 'view'])->name('shopping.view');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // Shopping
    Route::get('/shopping/mylist', [ShoppingItemController::class, 'myList'])->name('shopping.mylist');
    Route::get('/shopping/create', [ShoppingItemController::class, 'create'])->name('shopping.create');
    Route::get('/shopping/edit/{shoppingItem}', [ShoppingItemController::class, 'edit'])->name('shopping.edit');
    Route::post('/shopping', [ShoppingItemController::class, 'store'])->name('shopping.store');
    Route::patch('/shopping/{shoppingItem}', [ShoppingItemController::class, 'update'])->name('shopping.update');
    Route::delete('/shopping/{shoppingItem}', [ShoppingItemController::class, 'delete'])->name('shopping.delete');
    Route::post('/shopping/image/{shoppingItem}', [ShoppingItemController::class, 'storeImage'])->name('shopping.image.store');
    Route::delete('/shopping/image/{shoppingImage}', [ShoppingItemController::class, 'deleteImage'])->name('shopping.image.delete');

    // Shopping ticket
    Route::post('/ticket/buy/{shoppingItem}', [ShoppingTicketController::class, 'buyTicket'])->name('ticket.buy');

    // Game play
    Route::get('/play/game/{game}', [GameController::class, 'play'])->name('public.play.game');
    Route::get('/play/game/{game}/question', [GameController::class, 'questionPlay'])->name('public.play.game.question');
    Route::get('/game/score/{game}', [GameController::class, 'gameScore'])->name('public.game.score');
    Route::post('/play/game/{game}/question', [GameController::class, 'startPlay'])->name('public.play.game.start');
    Route::post('/play/game/{game}/question', [GameController::class, 'startPlayAgain'])->name('public.play.again.game.start');
    Route::post('/play/game/{playedGame}/question/answer', [GameController::class, 'storeQuestionAnswer'])->name('public.play.question.answer.store');

    // Game view
    Route::get('/games/dashboard', [GameController::class, 'dashboard'])->name('game.dashboard');
    Route::get('/games/create', [GameController::class, 'create'])->name('game.create');
    Route::get('/games/edit/{game}', [GameController::class, 'edit'])->name('game.edit');
    Route::get('/games/user/{user}', [GameController::class, 'user'])->name('games.user');
    Route::get('/games/my/games', [GameController::class, 'my_games'])->name('my.games');
    Route::patch('/games/{game}', [GameController::class, 'update'])->name('game.update');
    Route::delete('/games/{game}', [GameController::class, 'delete'])->name('game.delete');
    Route::post('/games', [GameController::class, 'store'])->name('game.store');
    Route::post('/games/edit/{game}', [GameController::class, 'storeImage'])->name('game.image.store');
    Route::delete('/games/edit/{game}', [GameController::class, 'deleteImage'])->name('game.image.delete');

    // Question view
    Route::get('/game/question/{game}', [GameQuestionController::class, 'create'])->name('game.question.create');
    Route::get('/game/question/edit/{question}', [GameQuestionController::class, 'edit'])->name('game.question.edit');
    Route::patch('/game/question/{question}', [GameQuestionController::class, 'update'])->name('game.question.update');
    Route::delete('/game/question/{question}', [GameQuestionController::class, 'delete'])->name('game.question.delete');
    Route::post('/game/question', [GameQuestionController::class, 'store'])->name('game.question.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
