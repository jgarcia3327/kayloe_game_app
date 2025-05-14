import { GameProps, AuthProps } from "@/types";
import { ShoppingItemProps } from "@/types/shopping";
import ShoppingImageDisplay from "./ShoppingImageDisplay";
import ShoppingOption from "./ShoppingOption";

export default function ShoppingBox({ auth, shoppingItems }:{
    auth: AuthProps;
    shoppingItems: [ShoppingItemProps];
}) {

    return (
        <div className="columns-1 md:columns-2 lg:columns-2 gap-68">
            {shoppingItems.map((shoppingItem: ShoppingItemProps) =>
                <div 
                    key={shoppingItem.id}
                    className="break-inside-avoid py-2"
                >
                    <div 
                        className={(shoppingItem.is_active? "bg-white":"bg-red-100 border-red-300 border") + " flex items-start gap-4 rounded-lg p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"}
                    >
                        <div className="pt-3 sm:pt-5 w-full">
                            <ShoppingImageDisplay 
                                className="max-h-[240px]"
                                shoppingItem={shoppingItem}                            
                            />
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                {shoppingItem.title}
                            </h2>

                            <p className="mt-4 text-sm/relaxed">
                                {shoppingItem.description}
                            </p>
                            <p className="mt-4 text-sm/relaxed"> Ticket available: {shoppingItem.ticket_count - (shoppingItem.shopping_tickets? shoppingItem.shopping_tickets.length : 0)} </p>
                            <ShoppingOption
                                auth={auth}
                                shoppingItem={shoppingItem}
                                hasViewBtn={true}
                            />
                        </div>
                    </div>   
                </div>
            )}
        </div>
    );
}
