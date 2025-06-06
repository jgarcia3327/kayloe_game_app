import InputLabel from "@/Components/InputLabel";
import { PlayedChoiceProps, PlayedGameProps, PlayedQuestionsWithChoicesProps } from "@/types";

export default function QuestionPlayedPreview({playedGame, playedQuestionsWithChoices}:{
    playedGame: PlayedGameProps
    playedQuestionsWithChoices: [PlayedQuestionsWithChoicesProps]
}){

    return (
        <div className="pt-6 pb-12"> 
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <p className="text-md">Answer{playedQuestionsWithChoices.length > 1 && <>s</>} to question{playedQuestionsWithChoices.length > 1 && <>s</>}:</p>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <form className="space-y-6">
                        {playedQuestionsWithChoices.map((q: PlayedQuestionsWithChoicesProps) =>
                            <div
                                key={q.playedQuestion.id}
                            >
                                <p>{q.playedQuestion.question}</p>
                                <ul>
                                    {q.playedChoices.map((c: PlayedChoiceProps) => 
                                        <li key={c.id}>
                                            <input 
                                                type="radio"
                                                id={c.description}
                                                required={true}
                                                value={c.id}
                                                {...(c.is_answer && {checked:true})}
                                                disabled={true}
                                            />
                                            <InputLabel className="pl-2 inline" htmlFor={c.description} value={c.description}/>
                                            {(c.is_answer && c.is_correct)? 
                                                <span className="text-sm text-green-800"> (correct)</span> 
                                                : 
                                                (c.is_answer && !c.is_correct)? <span className="text-sm text-red-800"> (wrong)</span> : <></>
                                            }
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
};