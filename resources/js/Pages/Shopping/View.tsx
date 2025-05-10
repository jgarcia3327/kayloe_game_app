import ShoppingLayout from "@/Layouts/ShoppingLayout";
import { AuthProps } from "@/types";
import { ShoppingImageProps, ShoppingItemProps } from "@/types/shopping";
import ShoppingImageDisplay from "./Partials/ShoppingImageDisplay";
import { useForm } from "@inertiajs/react";

export default function View({auth, shoppingItem, shoppingImages}:{
    auth: AuthProps,
    shoppingItem: ShoppingItemProps,
    shoppingImages?: ShoppingImageProps
}) {

    const { post, processing, recentlySuccessful } = useForm({
                //
    });

    const ticketBuyHandler = (shoppingItemId:number) => {
        post(route("ticket.buy", shoppingItemId));
    }

    return (
        <ShoppingLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {shoppingItem.title}
                </h2>
            }
            auth={auth}
        >
            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <ShoppingImageDisplay 
                            shoppingImages={shoppingImages}
                            className="max-h-[420px]"
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-xl">{shoppingItem.description}</p>
                        <p className="mt-4">Ticket Price: {shoppingItem.ticket_price}</p>
                        <p className="mt-4">Ticket count: {shoppingItem.ticket_count}</p>
                        <p className="mt-4">
                            Ticket available: TODO
                        </p>
                        <div className="grid grid-cols-4 w-full pt-8 gap-3">
                            <a 
                                className="cursor-pointer col-span-1 text-center bg-gray-600 rounded-md" 
                                onClick={() => ticketBuyHandler(shoppingItem.id)}
                            >
                                Buy ticket
                            </a>
                            {(auth?.user && shoppingItem.user_id === auth.user.id) && 
                                <>
                                    <a 
                                        className="col-span-1 col-end-5 text-center bg-green-300 rounded-md" 
                                        href={route('shopping.edit', shoppingItem.id)}
                                    >
                                        Edit
                                    </a>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    )
}