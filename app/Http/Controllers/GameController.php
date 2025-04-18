<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Game;
use App\Models\PlayedGame;
use App\Models\PlayedQuestion;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

    public function create()
    {
        if (!Auth::check())
            return redirect()->route('home');

        return Inertia::render('Games/Create');
    }

    public function edit(Game $game): Response
    {
        return Inertia::render('Games/Edit', [
            'game' => $game,
            'questionsWithChoices' => $this->getQuestionsWithChoices($game)
        ]);

    }

    public function delete(Game $game)
    {

        if ($game->user_id === Auth::user()->id) {
            // Delete questions and choices
            $questions = Question::where('game_id', $game->id);
            Choice::whereIn('question_id', $questions->get()->pluck('id'))->delete();
            $questions->delete();
            $game->delete();
        }

        return redirect()->route('my.games');
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

    public function store(Request $request)
    {
        $game = Game::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'image' => $request->image,
            'passing_percent' => $request->passing_percent,
            'time_in_sec' => $request->time_in_sec
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
            'game' => $game,
            'questionLength' => Question::where('game_id', $game->id)->count()
        ]);
    }

    public function startPlay(Game $game): Response
    {
        // Get played game
        $playedGameId = PlayedGame::select('id')->where('game_id', $game->id)->first();
        $question = null;
        if (empty($playedGameId)) {
            PlayedGame::create([
                'user_id' => Auth::user()? Auth::user()->id : $this->getGuestUser()->id,
                'title' => $game->title,
                'description' => $game->description,
                'image' => $game->image,
                'passing_percent' => $game->passing_percent,
                'time_in_sec' => $game->time_in_sec,
                'game_id' => $game->id,
                'author_user_id' => $game->user_id,
                'guest_user_id' => "Cookie id here(TODO)"
            ]);
            $question = Question::where('game_id', $game->id)->first();
        }
        else {
            $playedQuestionIds = PlayedQuestion::select('question_id')->where('played_game_id', $playedGameId)->get();
            $question = Question::whereNotIn('id', $playedQuestionIds)->first();
        }

        return Inertia::render('Games/QuestionPlay', [
            'game' => $game,
            'question' => $question
        ]);
    }

    public function questionPlay(Game $game)
    {
        // Get played game
        $playedGameId = PlayedGame::select('id')->where('game_id', $game->id)->first();
        if (empty($playedGameId)) {
            return redirect()->route('public.play.game', $game);
        }
        $playedQuestionIds = PlayedQuestion::select('question_id')->where('played_game_id', $playedGameId)->get();
        $question = Question::whereNotIn('id', $playedQuestionIds)->first();

        return Inertia::render('Games/QuestionPlay', [
            'game' => $game,
            'question' => $question
        ]);
    }

    private function getQuestionsWithChoices(Game $game) {
        $questions = Question::where('game_id', $game->id)->get();
        $questionsWithChoices = [];
        foreach ($questions AS $q) {
            array_push($questionsWithChoices, (object)array(
                'question' => $q,
                'choices' => Choice::where('question_id', $q->id)->get()
            ));
        }

        return $questionsWithChoices;
    }

    private function getGuestUser()
    {
        return User::where('email', 'guest@cebushopping.com')->first();
    }
}
