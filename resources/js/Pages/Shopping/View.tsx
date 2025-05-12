import ShoppingLayout from "@/Layouts/ShoppingLayout";
import { AuthProps } from "@/types";
import { ShoppingItemProps } from "@/types/shopping";
import ShoppingImageDisplay from "./Partials/ShoppingImageDisplay";
import ShoppingOption from "./Partials/ShoppingOption";

export default function View({auth, shoppingItem}:{
    auth: AuthProps,
    shoppingItem: ShoppingItemProps
}) {

    const availableTicket = shoppingItem.ticket_count - (shoppingItem.shopping_tickets? shoppingItem.shopping_tickets.length : 0);

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
                            shoppingImages={shoppingItem.shopping_images}
                            className="max-h-[420px]"
                            isOwner={false}
                        />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-xl">{shoppingItem.description}</p>
                        <p className="mt-4">Ticket Price: {shoppingItem.ticket_price}</p>
                        <p className="mt-4">Ticket count: {shoppingItem.ticket_count}</p>
                        <p className="mt-4"> Ticket available: {availableTicket} </p>
                        <p className="mt-4"> Sold ticket: {shoppingItem.shopping_tickets?.length} </p>
                        <ShoppingOption
                            auth={auth}
                            shoppingItem={shoppingItem}
                        />
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    )
}