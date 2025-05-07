import ShoppingLayout from "@/Layouts/ShoppingLayout";
import { AuthProps } from "@/types";
import { ShoppingImageProps, ShoppingItemProps } from "@/types/shopping";
import ShoppingImageUpload from "./Partials/ShoppingImageUpload";
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
                        <ShoppingImageDisplay shoppingImages={shoppingImages}/>
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-xl">{shoppingItem.description}</p>
                        <p className="mt-4">Ticket Price: {shoppingItem.ticket_price}</p>
                        <p className="mt-4">Ticket count: {shoppingItem.ticket_count}</p>
                        <p className="mt-4">
                            Ticket available: TODO | 
                            <a 
                                className="cursor-pointer ml-2 border-x-8 border-gray-600 text-center bg-gray-600 rounded-md" 
                                onClick={() => ticketBuyHandler(shoppingItem.id)}
                            >
                                Buy ticket
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    )
}