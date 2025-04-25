import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function CreateGameForm({className=''}:{
    className: string;
}) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
            title: "",
            description: "",
            image: "",
            passing_percent: 100,
            time_in_sec: ""
        });
    

    const submit = (e:any) => {
        e.preventDefault();

        post(route('game.store'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Game Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create new game.
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

                    <input
                        type="file"
                        id="image"
                        className="mt-1 block w-full"
                        value={data.image}
                        onChange={(e) => {
                            // TODO
                            // const file = e.target.files[0];
                            // let formData = new FormData();
                            // formData.append('file', file);
                            // console.log(formData);
                            setData('image', e.target.value);
                        }}
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

                {/* Timed game feature */}
                {/* <div> 
                    <InputLabel htmlFor="time_in_sec" value="Time in seconds" />

                    <TextInput
                        type="number"
                        id="time_in_sec"
                        className="mt-1 block w-full"
                        value={data.time_in_sec}
                        onChange={(e) => setData('time_in_sec', e.target.value)}
                    />
                </div> */}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Create</PrimaryButton> 
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Created.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
