import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function CreateShoppingForm({className=''}:{
    className?: string;
}) {

    const { data, setData, post, processing, recentlySuccessful } = useForm({
            title: "",
            description: "",
            item_price: 0,
            ticket_count: 0,
            ticket_price: 0,
            time_in_sec: ""
        });
    

    const submit = (e:any) => {
        e.preventDefault();
        post(route('shopping.store'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Shopping Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create new shopping item.
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
                    <InputLabel htmlFor="item_price" value="Item price" />

                    <TextInput
                        type="number"
                        id="item_price"
                        className="mt-1 block w-full"
                        value={data.item_price}
                        onChange={(e) => setData('item_price', parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="ticket_count" value="Ticket count" />

                    <TextInput
                        type="number"
                        id="ticket_count"
                        className="mt-1 block w-full"
                        value={data.ticket_count}
                        onChange={(e) => setData('ticket_count', parseInt(e.target.value))}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="ticket_price" value="Ticket price" />

                    <TextInput
                        type="number"
                        id="ticket_price"
                        className="mt-1 block w-full"
                        value={data.ticket_price}
                        onChange={(e) => setData('ticket_price', parseFloat(e.target.value))}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Next</PrimaryButton> 
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
