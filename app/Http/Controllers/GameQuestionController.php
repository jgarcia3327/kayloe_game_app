<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Game;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GameQuestionController extends Controller
{

    public function edit(Question $question)
    {
        if (!Auth::check())
            return redirect()->route('home');

        $game =  Game::where('id', $question->game_id)->first();

        if ($game->user_id !== Auth::id())
            return redirect()->route('home');

        $choices = Choice::where('question_id', $question->id)->get();

        return Inertia::render('Games/Questions/Edit', [
            'game' => $game,
            'question' => $question,
            'choices' => $choices
        ]);
    }

    public function create(Game $game)
    {
        if (!Auth::check())
            return redirect()->route('home');

        return Inertia::render('Games/Questions/Create', [
            'game' => $game
        ]);
    }

    public function delete(Question $question): void
    {
        $game = Game::where('id', $question->game_id)->first();
        if (Auth::check() && $game->user_id === Auth::user()->id) {
            $question->delete();
        }
    }

    public function update(Question $question, Request $request)
    {
        if (!Auth::check())
            return redirect()->route('home');

        // Get game
        $game = Game::where('id', $question->game_id)->first();
        if ($game->user_id !== Auth::user()->id)
            return redirect()->route('home');

        // Update Question
        $question->update([
            'question' => $request->question,
            'image' => empty($request->image)? '' : $request->image,
            'correct_percent' => $request->correctPercent
        ]);

        // Create Choices
        foreach ($request->choices AS $choice) {
            if (empty($choice['id'])) {
                Choice::create([
                    'question_id' => $question->id,
                    'description' => empty($choice['description'])? '' : $choice['description'],
                    'image' => empty($choice['image'])? '' : $choice['image'], 
                    'is_correct' => array_key_exists('is_correct', $choice)? $choice['is_correct'] : false
                ]);
            }
            else {
                $dbChoice = Choice::where('id', $choice['id'])->first();
                $dbChoice->update([
                    'description' => empty($choice['description'])? '' : $choice['description'],
                    'image' => empty($choice['image'])? '' : $choice['image'], 
                    'is_correct' => array_key_exists('is_correct', $choice)? $choice['is_correct'] : false
                ]);
            }
        }

        return redirect()->route('games.edit', [$request->gameId]);
        
    }

    public function store(Request $request)
    {
        if (!Auth::check())
            return redirect()->route('home');

        // Create Question
        $question = Question::create([
            'game_id' => $request->gameId,
            'question' => $request->question,
            'image' => empty($request->image)? '' : $request->image,
            'correct_percent' => $request->correctPercent
        ]);

        // Create Choices
        foreach ($request->choices AS $choice) {
            Choice::create([
                'question_id' => $question->id,
                'description' => empty($choice['description'])? '' : $choice['description'],
                'image' => empty($choice['image'])? '' : $choice['image'], 
                'is_correct' => array_key_exists('is_correct', $choice)? $choice['is_correct'] : false
            ]);
        }

        return redirect()->route('games.edit', [$request->gameId]);
        
    }
}
