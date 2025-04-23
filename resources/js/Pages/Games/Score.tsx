import GameLayout from "@/Layouts/GameLayout";
import { AuthProps, GameProps, ScoreProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function MyGames({ auth, game, score }:{
    auth: AuthProps;
    game: GameProps;
    score: ScoreProps;
}) {

    return (
        <GameLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Games
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <h2>{game.title}</h2>
                        <p>{game.description}</p>
                        <br/>
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
        </GameLayout>
    );
}