import PrimaryButton from "@/Components/PrimaryButton";
import { AuthProps } from "@/types";
import { ShoppingItemProps } from "@/types/shopping";
import { useForm } from "@inertiajs/react";

export default function ShoppingOption({auth, shoppingItem, hasViewBtn}:{
    auth: AuthProps,
    shoppingItem: ShoppingItemProps,
    hasViewBtn?: boolean | false
}) {

    const { get, post, processing, recentlySuccessful } = useForm({
            //
        });

    const availableTicket = shoppingItem.ticket_count - (shoppingItem.shopping_tickets? shoppingItem.shopping_tickets.length : 0);

    return (
        <div className="grid grid-cols-4 w-full pt-8 gap-3">
            {availableTicket > 0? (
                <PrimaryButton 
                    className="cursor-pointer col-span-1 text-center bg-gray-600 rounded-md text-white" 
                    onClick={() => post(route("ticket.buy", shoppingItem.id))}
                    disabled={processing}
                >
                    Buy ticket
                </PrimaryButton>
            ) : (
                <PrimaryButton 
                    className="cursor-pointer col-span-1 text-center bg-gray-300 rounded-md text-white" 
                    disabled={true}
                >
                    Sold out
                </PrimaryButton>
            )}
            
            {hasViewBtn && (
                <PrimaryButton 
                    className="col-span-1 text-center bg-green-300 rounded-md" 
                    onClick={() => get(route('shopping.view', shoppingItem.id))}
                    disabled={processing}
                >
                    View
                </PrimaryButton>
            )}

            {(auth?.user && shoppingItem.user_id === auth.user.id) && 
                <PrimaryButton 
                    className="col-span-1 col-end-5 text-center bg-green-600 rounded-md" 
                    onClick={() => get(route('shopping.edit', shoppingItem.id))}
                    disabled={processing}
                >
                    Edit
                </PrimaryButton>
            }
        </div>
    );
}