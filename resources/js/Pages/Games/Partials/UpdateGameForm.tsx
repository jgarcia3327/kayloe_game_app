import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import { AuthProps, GameProps } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function UpdateGameForm({ auth, game, className = '' }:{
    auth: AuthProps;
    game: GameProps;
    className?: string;
}) {

    const { data, setData, patch, delete: destroy, errors, processing, recentlySuccessful } = useForm({
        title: game.title,
        description: game.description,
        image: game.image
    });

    const submit = (e:any) => {
        e.preventDefault();

        patch(route('game.update', game.id));
    };

    const handleDelete = (e:any, game: GameProps) => {
        e.preventDefault();
        let c = confirm("Confirm Delete:\n" + game.title);
        if (c === true) {
            destroy(route('game.delete', game.id));
        }
    }

    return (
        <section className={'max-w-full ' + className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Game Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update game.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextAreaInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Image" />

                    <TextInput
                        id="image"
                        className="mt-1 block w-full"
                        value={data.image}
                        disabled
                    />
                </div>

                <div className="grid items-center gap-4 w-full">
                    {auth.user.id === game.user_id ? 
                        <div className="grid grid-cols-3 gap-4">
                            <PrimaryButton className="col-span-1" disabled={processing}>Save Changes</PrimaryButton> 
                            <a 
                                href = {route('game.question.create', game.id)}
                                className="inline-flex px-4 py-2 col-span-1 bg-green-300 rounded-md items-center border border-transparent text-sm font-semibold uppercase" 
                            >
                                Add New Question
                            </a>
                            <a 
                                onClick = {(e) => handleDelete(e, game)}
                                className="cursor-pointer inline-flex px-4 py-2 col-span-1 ml-6 bg-red-300 rounded-md items-center border border-transparent text-sm font-semibold uppercase" 
                            >
                                Delete game
                            </a>
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
                        : <></>
                    }
                </div>
            </form>
        </section>
    );
}
