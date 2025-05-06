import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import { AuthProps } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import ShoppingImageUpload from './ShoppingImageUpload';
import { ShoppingImageProps, ShoppingItemProps } from '@/types/shopping';

export default function UpdateShoppingForm({ auth, shoppingItem, shoppingImages, className = '' }:{
    auth: AuthProps,
    shoppingItem: ShoppingItemProps,
    shoppingImages?: [ShoppingImageProps],
    className?: string,
}) {

    const { data, setData, patch, delete: destroy, processing, recentlySuccessful } = useForm({
        title: shoppingItem.title,
        description: shoppingItem.description,
        ticket_count: shoppingItem.ticket_count,
        ticket_price: shoppingItem.ticket_price,
        item_price: shoppingItem.item_price,
        draw_date: shoppingItem.draw_date,
        is_active: shoppingItem.is_active
    });

    const submit = (e:any) => {
        e.preventDefault();
        patch(route('shopping.update', shoppingItem.id), {
            preserveScroll: true
        });
    };

    const handleDelete = (e:any) => {
        e.preventDefault();
        let c = confirm("Confirm Delete:\n" + shoppingItem.title);
        if (c === true) {
            destroy(route('shopping.delete', shoppingItem.id));
        }
    }

    return (
        <section className={'max-w-full ' + className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Shopping item information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update shopping item info.
                </p>
            </header>

            <ShoppingImageUpload
                shoppingItemId={shoppingItem.id}
                shoppingImages={shoppingImages}
            />

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

                <div>
                    <InputLabel htmlFor="is_active" value="Active" className="inline pr-2"/>

                    <Checkbox
                        id="is_active"
                        {...(data.is_active && {checked:true})}
                        onChange={(e) => {setData('is_active', e.target.checked)}}
                    />
                </div>

                <div className="grid items-center gap-4 w-full">
                    {auth.user.id === shoppingItem.user_id ? 
                        <div className="grid grid-cols-6 gap-4">
                            <PrimaryButton className="col-span-2" disabled={processing}>Save Changes</PrimaryButton> 
                            <a 
                                onClick = {(e) => handleDelete}
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
