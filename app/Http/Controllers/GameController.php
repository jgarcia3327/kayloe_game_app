<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function home(): Response
    {
        $games = Game::all();

        return Inertia::render('Home', [
            'games' => $games
        ]);
    }

    public function index(): Response
    {
        $games = Game::all();

        return Inertia::render('Games/All', [
            'games' => $games
        ]);
    }

    public function edit(Game $game): Response
    {
        return Inertia::render('Games/Edit', [
            'game' => $game,
        ]);
    }

    public function update(Game $game, Request $request): void
    {
        if ($game->user_id === Auth::user()->id) {
            $game->update([
                'title' => $request->title,
                'description' => $request->description
            ]);
        }
    }

    public function user(User $user): Response
    {
        $games = Game::where('user_id', $user->id)->get();

        return Inertia::render('Games/User', [
            'games' => $games,
            'user' => $user
        ]);
    }

    public function me_games(): Response
    {
        $games = Game::where('user_id', Auth::user()->id)->get();

        return Inertia::render('Games/MyGames', [
            'games' => $games
        ]);
    }

    public function play(Game $game): Response
    {
        return Inertia::render('Games/Play', [
            'game' => $game
        ]);
    }
}
