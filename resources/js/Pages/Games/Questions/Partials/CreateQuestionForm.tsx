import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import CreateChoiceForm from './CreateChoiceForm';
import TextAreaInput from '@/Components/TextAreaInput';
import { ChoiceProps, GameProps, QuestionProps } from '@/types';
import EditChoiceForm from './EditChoiceForm';

export default function CreateQuestionForm({game, question, choices, className=''}:{
    game: GameProps,
    question?: QuestionProps,
    choices?: ChoiceProps,
    className?:string
}) {

    let choiceObj = {
        description: "",
        image: "",
        is_correct: false,
        id: 0
    }

    const { data, setData, post, patch, errors, processing, recentlySuccessful } = useForm({
            gameId: game.id,
            question: question? question.question : "",
            image: question? question.image : "",
            correctPercent: 100,
            choices: [choiceObj]
        });

    const submit = (e:any) => {
        e.preventDefault();

        // Parse choices using useFieldArray from CreateChoiceForm
        let formData = new FormData(e.target);
        let objEntries = Object.fromEntries(formData.entries());
        let newChoices = [];
        let count=0;
        for (const [key, value] of Object.entries(objEntries)) {
            if(key.includes(count.toString())) {
                if(key.toLowerCase().includes('description')) choiceObj.description = value.toString();
                if(key.toLowerCase().includes('image')) choiceObj.image = value.toString();
                if(key.toLowerCase().includes('is_correct')) choiceObj.is_correct = (value.toString() === 'on');
                if(key.toLowerCase().includes('id')) choiceObj.id = parseInt(value.toString());
            }
            else {
                count++;
                newChoices.push( {...choiceObj} );
                // Clean choiceObj
                choiceObj = {
                    description: "",
                    image: "",
                    is_correct: false,
                    id: 0
                }
                // Add first/prior occurence
                if(key.toLowerCase().includes('description')) choiceObj.description = value.toString();
            }
        }
        newChoices.push({...choiceObj});
        data.gameId = game.id;
        data.choices = newChoices;
        
        if (question && choices)
            patch(route('game.question.update', question.id));
        else
            post(route('game.question.store'));
    };

    return (
        <section className={'max-w-full ' + className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900"><a className='' href={route("game.edit", game.id)}>&lt; {game.title}</a> | Question</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="question" value="Question" />

                    <TextAreaInput
                        id="question"
                        className="mt-1 block w-full"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        rows={2}
                        required={true}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Image" />

                    <TextInput
                        id="image"
                        className="mt-1 block w-full"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="correct_percent" value="Correct Percent" />

                    <TextInput
                        id="correctPercent"
                        className="mt-1 block w-fit"
                        value={data.correctPercent}
                        type="number"
                        onChange={(e) => setData('correctPercent', parseInt(e.target.value))}
                    />
                </div>

                <div>
                    {choices? 
                        <EditChoiceForm choices={choices}/> 
                        : <CreateChoiceForm/>
                    }
                </div>

                <div className="flex items-center gap-4">
                    {choices? 
                    <>
                        <PrimaryButton disabled={processing}>Update Question</PrimaryButton> 
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Created.</p>
                        </Transition>
                    </> 
                    : 
                    <>
                        <PrimaryButton disabled={processing}>Create Question</PrimaryButton> 
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Created.</p>
                        </Transition>
                    </>}
                </div>
            </form>
        </section>
    );
}
