import { AuthProps, ChoiceProps, GameProps, QuestionProps, QuestionsWithChoicesProps } from "@/types";
import { useForm } from "@inertiajs/react";

export default function QuestionBox({ auth, game, questionsWithChoices }:{
    auth: AuthProps;
    game: GameProps;
    questionsWithChoices: [QuestionsWithChoicesProps];
}) {

    const { delete: destroy } = useForm({
        //
    });

    const handleDelete = (e:any, question: QuestionProps) => {
        e.preventDefault();
        let c = confirm("Confirm Delete:\n" + question.question);
        if (c === true) {
            destroy(route('game.question.delete', question.id), {
                preserveScroll: true
            });
        }
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-2 gap-68">
            {questionsWithChoices.map((questions: QuestionsWithChoicesProps) => 
                <div key={questions.question.id} className="break-inside-avoid py-2"> 
                    <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-4 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                        <div className="pt-3 sm:pt-5 w-full">
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                {questions.question.question}
                            </h2>

                            {questions.choices.map((choice: ChoiceProps) => 
                                <div key={choice.id}>
                                    <p className="mt-4 text-sm/relaxed">
                                        {choice.description} {choice.is_correct? <><span>(correct)</span></>: <></>}
                                    </p>
                                </div>
                            )}
                            <div className="grid w-full pt-8">
                                {auth.user && game.user_id === auth.user.id ? 
                                <div className="grid grid-cols-2 gap-3">
                                    <a className="ml-3 text-center bg-green-300 rounded-md" href={route('game.question.edit', questions.question.id)}>Edit</a>
                                    <a className="ml-3 text-center bg-red-300 rounded-md cursor-pointer" onClick={(e) => handleDelete(e, questions.question)}>Delete</a>
                                </div>
                                :
                                <></>
                                }
                            </div>
                        </div>
                    </div>           
                </div>
            )}
        </div>
    );
}
