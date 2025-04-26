import GameLayout from "@/Layouts/GameLayout";
import { AuthProps, GameProps, PlayedGameProps, PlayedQuestionsWithChoicesProps, ScoreProps } from "@/types";
import { Head } from "@inertiajs/react";
import QuestionPlayedPreview from "./Questions/Partials/QuestionPlayedPreview";

export default function MyGames({ auth, playedGame, playedQuestionsWithChoices, score }:{
    auth: AuthProps,
    playedGame: PlayedGameProps,
    playedQuestionsWithChoices: [PlayedQuestionsWithChoicesProps],
    score: ScoreProps,
}) {

    return (
        <GameLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Game score
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="mb-2">
                            <h2 className="text-lg font-extrabold">{playedGame.title}</h2>
                            <p>{playedGame.description}</p>
                        </div>
                        <p>Passing percentage: {playedGame.passing_percent}%</p>
                        <p>Score: {score.score} / {score.question_count}</p>
                        {score.is_passed? (
                            <p>Congratulations! You passed.</p>
                        ) : (
                            <p>Sorry, you failed.</p>
                        )
                        }
                    </div>
                </div>
            </div>
            <QuestionPlayedPreview 
                playedGame={playedGame}
                playedQuestionsWithChoices={playedQuestionsWithChoices}            
            />
        </GameLayout>
    );
}