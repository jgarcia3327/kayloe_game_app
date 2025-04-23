import Checkbox from '@/Components/Checkbox';
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
        image: game.image,
        passing_percent: game.passing_percent,
        time_in_sec: game.time_in_sec,
        is_active: game.is_active
    });

    const submit = (e:any) => {
        e.preventDefault();
        patch(route('game.update', game.id), {
            preserveScroll: true
        });
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
                    Update game info.
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
                        onChange={(e) => setData('image', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="passing_percent" value="Passing Percentage %" />

                    <TextInput
                        type="number"
                        id="passing_percentage"
                        className="mt-1 block w-full"
                        value={data.passing_percent}
                        onChange={(e) => setData('passing_percent', parseInt(e.target.value))}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="time_in_sec" value="Time in seconds" />

                    <TextInput
                        type="number"
                        id="time_in_sec"
                        className="mt-1 block w-full"
                        value={data.time_in_sec}
                        onChange={(e) => setData('time_in_sec', parseInt(e.target.value))}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="is_active" value="Active" className="inline pr-2"/>

                    <Checkbox
                        id="is_active"
                        {...(data.is_active && {checked:true})}
                        onChange={(e) => {setData('is_active', e.target.checked)}}
                    />
                </div>

                <div className="grid items-center gap-4 w-full">
                    {auth.user.id === game.user_id ? 
                        <div className="grid grid-cols-6 gap-4">
                            <PrimaryButton className="col-span-2" disabled={processing}>Save Changes</PrimaryButton> 
                            <a 
                                href = {route('game.question.create', game.id)}
                                className="inline-flex px-4 py-2 col-span-2 bg-green-300 rounded-md items-center border border-transparent text-sm font-semibold uppercase" 
                            >
                                Add New Question
                            </a>
                            <a 
                                onClick = {(e) => handleDelete(e, game)}
                                className="cursor-pointer inline-flex px-4 py-2 col-span-1 col-end-7 bg-red-300 rounded-md items-center border border-transparent text-sm font-semibold uppercase" 
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
