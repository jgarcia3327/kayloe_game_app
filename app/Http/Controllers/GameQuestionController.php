<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Game;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class GameQuestionController extends Controller
{
    public function create(Game $game) : Response
    {
        if (!Auth::check())
            return Inertia::render('/');

        return Inertia::render('Games/Questions/Create', [
            'game' => $game
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::check())
            return Inertia::render('/');

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
