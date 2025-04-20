import PrimaryButton from "@/Components/PrimaryButton";
import GameLayout from "@/Layouts/GameLayout";
import { AuthProps, GameProps, QuestionsWithChoicesProps } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Play({game, status}: {
    game: GameProps;
    status: number;
}) {
    
    const { post, get, processing, recentlySuccessful } = useForm({
        // 
    });

    const startPlayHandler = (e:any) => {
        post(route('public.play.game.start', game.id));
    };

    const continuePlayHandler = (e:any) => {
        get(route('public.play.game.question', game.id));
    }

    const scorePlayHandler = (e:any) => {
        // TODO
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
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-xl">{game.description}</p>
                        <p className="mt-4">Passing percentage: {game.passing_percent}</p>
                        <p className="mt-4">Number of questions: {game.question_count}</p>
                        <p>Game time: {game.time_in_sec}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {status === 0 && 
                            <PrimaryButton 
                                className="col-span-1 col-start-2 text-center inline-grid bg-green-900" 
                                disabled={processing}
                                onClick={startPlayHandler}
                            >
                                Start
                            </PrimaryButton> 
                        }
                        {status === 1 && 
                            <PrimaryButton 
                                className="col-span-1 col-start-2 text-center inline-grid bg-orange-800" 
                                disabled={processing}
                                onClick={continuePlayHandler}
                            >
                                Continue
                            </PrimaryButton> 
                        }
                        {status === 2 && 
                            <PrimaryButton 
                                className="col-span-1 col-start-2 text-center inline-grid bg-gray-600" 
                                disabled={processing}
                                onClick={scorePlayHandler}
                            >
                                See score
                            </PrimaryButton>
                        }
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="mt-3 col-span-1 block center w-full text-md text-green-600 uppercase">Saved.</p>
                        </Transition>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}