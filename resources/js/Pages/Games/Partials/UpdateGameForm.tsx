import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function UpdateGameForm({ auth, game, className = '' }:any) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        title: game.title,
        description: game.description,
        image: game.image
    });

    const submit = (e:any) => {
        e.preventDefault();

        patch(route('games.update', game.id));
    };

    return (
        <section className={className}>
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

                    <TextInput
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

                <div className="flex items-center gap-4">
                    {auth.user.id === game.user_id ? 
                        <>
                            <PrimaryButton disabled={processing}>Save Changes</PrimaryButton> 
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </>
                        : <></>
                    }
                </div>
            </form>
        </section>
    );
}
