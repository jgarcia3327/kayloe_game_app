<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Choice;
use App\Models\Game;
use App\Models\PlayedChoice;
use App\Models\PlayedGame;
use App\Models\PlayedQuestion;
use App\Models\Question;
use App\Models\Score;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function home(): Response
    {
        $games = Game::orderBy('created_at', 'DESC')->get();

        return Inertia::render('Home', [
            'games' => $games,
            'scores' => $this->getScores($games)
        ]);
    }

    public function index(): Response
    {
        $games = Game::orderBy('created_at', 'DESC')->get();

        return Inertia::render('Games/All', [
            'games' => $games,
            'scores' => $this->getScores($games)
        ]);
    }

    public function my_games(): Response
    {
        $games = Game::where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();

        return Inertia::render('Games/MyGames', [
            'games' => $games,
            'scores' => $this->getScores($games)
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
                'description' => $request->description,
                'image' => $request->image,
                'passing_percent' => $request->passing_percent,
                'time_in_sec' => $request->time_in_sec,
                'is_active' => $request->is_active
            ]);
        }
    }

    public function store(Request $request)
    {
        $game = Game::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'description' => $request->description,
            // 'image' => $request->image,
            'passing_percent' => $request->passing_percent,
            // 'time_in_sec' => $request->time_in_sec,
            'is_active' => $request->is_active
        ]);
        
        return $this->edit($game);
    }

    public function storeImage(Request $request, Game $game) : void
    {
        // Delete existing file
        if (!empty($game->image)) Storage::disk('public_game_image')->delete($game->image);

        // Save file
        $file = $request->file('image');
        $filename = $file->storeAs($game->id.'.' . $file->getClientOriginalExtension(), ['disk' => 'public_game_image']);

        // Store $filename to DB
        $game->update([
            'image' => $filename
        ]);
    }

    public function deleteImage(Request $request, Game $game) : void
    {
        // Delete file
        if (!empty($game->image)) Storage::disk('public_game_image')->delete($game->image);

        // Update DB
        $game->update([
            'image' => null
        ]);
    }

    public function storeQuestionAnswer(PlayedGame $playedGame, Request $request) 
    {
        $score = 0;
        foreach($request->answer AS $q => $a) {
            $question = Question::find($q);
            if (!empty($question)) {
                // Save to played_questions
                $playedQuestion = PlayedQuestion::create([
                    'played_game_id' => $playedGame->id,
                    'question' => $question->question,
                    'image' => $question->image,
                    'correct_percent' => $question->correct_percent,
                    'question_id' => $question->id
                ]);
                $choices = Choice::where('question_id', $question->id)->get();
                if (!empty($choices)) {
                    foreach($choices AS $c) {
                        // Save to played_choices
                        PlayedChoice::create([
                            'played_question_id' => $playedQuestion->id,
                            'description' => $c->description,
                            'image' => $c->image, 
                            'is_correct' => $c->is_correct,
                            'choice_id' => $c->id,
                            'is_answer' => (intval($a) === $c->id)? true : false
                        ]);
                        if($c->is_correct && intval($a) === $c->id) $score++;
                    }
                }
            }
        }

        $questionCount = count($request->answer);
        $isPassed = (($score / $questionCount) * 100) >= $playedGame->passing_percent;

        // Save score
        Score::create([
            'played_game_id' => $playedGame->id,
            'game_id' => $playedGame->game_id,
            'user_id' => Auth::user()->id,
            'score' => $score,
            'question_count' => $questionCount,
            'is_passed' => $isPassed
        ]);

        // Redirect here
        // FIXME redirect to score view
        return redirect()->route('public.game.score', $playedGame->game_id);
    }

    public function user(User $user): Response
    {
        $games = Game::where('user_id', $user->id)->get();

        return Inertia::render('Games/User', [
            'games' => $games,
            'user' => $user
        ]);
    }

    public function play(Game $game): Response
    { 

        $status = 0; // 0 = play, 1 = continue, 2 = get score(done)
        $playedGameId = PlayedGame::select('id')->where('game_id', $game->id)->first();
        if (!empty($playedGameId)) {
            $status = 1;
            if (Score::where('played_game_id', $playedGameId->id)->count() > 0) {
                $status = 2;
            }
        }
        return Inertia::render('Games/Play', [
            'game' => $game,
            'status' => $status
        ]);
    }

    public function startPlay(Game $game): Response
    {
        // Get played game
        $playedGame = PlayedGame::where('game_id', $game->id)->first();
        $questionsWithChoices = $this->getQuestionsWithChoices($game);
        $playedQuestionsWithChoices = null;
        if (empty($playedGame)) {
            $playedGame = PlayedGame::create([
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
        }
        else {
            $playedQuestionsWithChoices = $this->getPlayedQuestionsWithChoices($playedGame->id);
        }

        return Inertia::render('Games/QuestionPlay', [
            'playedGame' => $playedGame,
            'questionsWithChoices' => $questionsWithChoices,
            'playedQuestionsWithChoices' => $playedQuestionsWithChoices // Next feature
        ]);
    }

    public function questionPlay(Game $game)
    {
        // Get played game and redirect to game start if haven't played yet
        $playedGame = PlayedGame::where('game_id', $game->id)->first();
        $questionsWithChoices = $this->getQuestionsWithChoices($game);
        $playedQuestionsWithChoices = null;
        if (empty($playedGame)) {
            redirect(route('public.play.game'));
        }
        else {
            $playedQuestionsWithChoices = $this->getPlayedQuestionsWithChoices($playedGame->id);
        }

        return Inertia::render('Games/QuestionPlay', [
            'playedGame' => $playedGame,
            'questionsWithChoices' => $questionsWithChoices,
            'playedQuestionsWithChoices' => $playedQuestionsWithChoices
        ]);
    }

    public function gameScore(Game $game) : Response
    {
        // TODO pull multiple scores from played game
        $playedGame = PlayedGame::where('game_id', $game->id)->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->first();
        $score = Score::where('game_id', $game->id)->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->first();
        $playedQuestionsWithChoices = $this->getPlayedQuestionsWithChoices($playedGame->id);
        return Inertia::render('Games/Score', [
            'score' => $score,
            'playedGame' => $playedGame,
            'playedQuestionsWithChoices' => $playedQuestionsWithChoices
        ]);
    }

    private function getPlayedQuestionsWithChoices($playedGameId) {
        $playedQuestions = PlayedQuestion::where('played_game_id', $playedGameId)->get();
        $playedQuestionsWithChoices = [];
        if (!empty($playedQuestions)) {
            foreach ($playedQuestions AS $q) {
                array_push($playedQuestionsWithChoices, (object)array(
                    'playedQuestion' => $q,
                    'playedChoices' => PlayedChoice::where('played_question_id', $q->id)->get()
                ));
            }
        }
        return $playedQuestionsWithChoices;
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

    private function getScores($games)
    {
        // Get scores if logged in
        if (Auth::check()) {
            return Score::where('user_id', Auth::user()->id)->whereIn('game_id', $games->pluck('id'))->get();
        }
        return null;
    }
}
