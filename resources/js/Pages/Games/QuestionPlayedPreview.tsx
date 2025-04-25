import InputLabel from "@/Components/InputLabel";
import { PlayedChoiceProps, PlayedGameProps, PlayedQuestionsWithChoicesProps } from "@/types";

export default function QuestionPlayedPreview({playedGame, playedQuestionsWithChoices}:{
    playedGame: PlayedGameProps
    playedQuestionsWithChoices: [PlayedQuestionsWithChoicesProps]
}){

    console.log(playedQuestionsWithChoices);
    return (
        <div className="py-12"> 
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <p className="text-md">Question{playedQuestionsWithChoices.length > 1 && <>s</>}:</p>
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
                                                <span> (correct)</span> 
                                                : 
                                                (c.is_answer && !c.is_correct)? <span> (wrong)</span> : <></>
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