import { AuthProps, GameProps, ScoreProps } from "@/types";
import { Head } from "@inertiajs/react";
import GameBox from "@/Pages/Games/Partials/GameBox";
import GameLayout from "@/Layouts/GameLayout";

export default function All({ auth, games, scores }:{
    auth: AuthProps,
    games: [GameProps],
    scores: [ScoreProps]
}) {

    return (
        <GameLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Games
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <GameBox games={games} auth={auth} scores={scores}></GameBox>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}