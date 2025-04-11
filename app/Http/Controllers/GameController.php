<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Game;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function home(): Response
    {
        $games = Game::orderBy('created_at', 'DESC')->get();
    
        return Inertia::render('Home', [
            'games' => $games,
            'isLoggedIn' => Auth::check()
        ]);
    }

    public function index(): Response
    {
        $games = Game::orderBy('created_at', 'DESC')->get();

        return Inertia::render('Games/All', [
            'games' => $games
        ]);
    }

    public function create(): Response
    {
        if (!Auth::check())
            return Inertia::render('/');

        return Inertia::render('Games/Create');
    }

    public function edit(Game $game): Response
    {

        $questions = Question::where('game_id', $game->id)->get();
        $choices = Choice::whereIn('question_id', $questions->pluck('id'))->get();

        return Inertia::render('Games/Edit', [
            'game' => $game,
            'questions' => $questions,
            'choices' => $choices
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

    public function store(Request $request): Response
    {
        if (!Auth::check())
            return Inertia::render('/');

        $game = Game::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->image
        ]);
        
        return $this->edit($game);
    }

    public function user(User $user): Response
    {
        $games = Game::where('user_id', $user->id)->get();

        return Inertia::render('Games/User', [
            'games' => $games,
            'user' => $user
        ]);
    }

    public function my_games(): Response
    {
        $games = Game::where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();

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
