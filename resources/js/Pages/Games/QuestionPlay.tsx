import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import GameLayout from "@/Layouts/GameLayout";
import { ChoiceProps, GameProps, PlayedQuestionsWithChoicesProps, QuestionsWithChoicesProps } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function QuestionPlay({game, questionsWithChoices, playedQuestionsWithChoices}:{
    game: GameProps
    questionsWithChoices: [QuestionsWithChoicesProps]
    playedQuestionsWithChoices: [PlayedQuestionsWithChoicesProps]
}){

    const {data, post, processing, recentlySuccessful } = useForm({
        answer: {}
    });

    const handleQuestionAnswer = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let objEntries = Object.fromEntries(formData.entries());
        data.answer = objEntries;
        post(route('public.play.question.answer.store', game.id));
    }

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
                    <p className="text-xl">{game.description}</p>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={handleQuestionAnswer} className="mt-6 space-y-6">
                            {questionsWithChoices.map((q: QuestionsWithChoicesProps) => 
                                <div
                                    key={q.question.id}
                                >
                                    <p>{q.question.question}</p>
                                    <ul>
                                        {q.choices.map((c: ChoiceProps) => 
                                            <li key={c.id}>
                                                <input 
                                                    type="radio"
                                                    name={q.question.id.toString()}
                                                    id={c.description}
                                                    required={true}
                                                    value={c.id}
                                                />
                                                <InputLabel htmlFor={c.description} value={c.description}/>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                            <PrimaryButton disabled={processing}>Submit</PrimaryButton> 
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Created.</p>
                            </Transition>
                        </form>
                    </div>
                </div>
            </div>
        </GameLayout>
    )
};