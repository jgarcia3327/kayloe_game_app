import GameLayout from "@/Layouts/GameLayout";
import { GameProps, QuestionProps } from "@/types";

export default function QuestionPlay({game, question}:{
    game: GameProps
    question: QuestionProps  
}){
    return (
        <GameLayout
            header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {game.title}
                    </h2>
            }
                >
            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-xl">{question.question}</p>
                        <p>Choices here TODO</p>
                    </div>
                </div>
            </div>
        </GameLayout>
    )
};