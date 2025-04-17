import { Head } from "@inertiajs/react";
import UpdateGameForm from "./Partials/UpdateGameForm";
import GameLayout from "@/Layouts/GameLayout";
import { AuthProps, GameProps, QuestionsWithChoicesProps } from "@/types";
import QuestionBox from "./Partials/QuestionBox";

export default function Edit({ auth, game, questionsWithChoices }:{
    auth: AuthProps,
    game: GameProps,
    questionsWithChoices: [QuestionsWithChoicesProps],
}) {

    return (
        <GameLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Game ID: {game.id}</h2>}    
            auth={auth}     
            >
            <Head title={'Game ID: ' + game.id} />

            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateGameForm
                            auth={auth}
                            game={game}
                        />
                    </div>
                    <h3 className="text-lg font-bold">Questions:</h3>
                    <div className="bg-gray-400 p-3 rounded-md">
                        <QuestionBox 
                            auth={auth}
                            game={game}
                            questionsWithChoices={questionsWithChoices}
                        />
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}