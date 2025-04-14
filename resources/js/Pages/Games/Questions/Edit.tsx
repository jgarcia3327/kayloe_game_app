import GameLayout from "@/Layouts/GameLayout";
import { AuthProps, ChoiceProps, GameProps, QuestionProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateQuestionForm from "./Partials/CreateQuestionForm";

export default function Create({auth, game, question, choices}:{
    auth: AuthProps;
    game: GameProps;
    question: QuestionProps;
    choices?: ChoiceProps;
}) {
    return (
        <GameLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{game.title} Question:</h2>}
            auth={auth}
        >
            <Head title="Edit  Question" />

            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <CreateQuestionForm className='mr-8' game={game} question={question} choices={choices}/>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}