import { GameProps, AuthProps } from "@/types";
import { ShoppingItemProps } from "@/types/shopping";
import ShoppingImageDisplay from "./ShoppingImageDisplay";
import { useForm } from "@inertiajs/react";

export default function ShoppingBox({ auth, shoppingItems }:{
    auth: AuthProps;
    shoppingItems: [ShoppingItemProps];
}) {

    const { post, processing, recentlySuccessful } = useForm({
            //
    });

    const ticketBuyHandler = (shoppingItemId:number) => {
        post(route("ticket.buy", shoppingItemId));
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-2 gap-68">
            {shoppingItems.map((shoppingItem: ShoppingItemProps) => 
                <div 
                    key={shoppingItem.id}
                    className="break-inside-avoid py-2"
                >
                    <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                        <div className="pt-3 sm:pt-5 w-full">
                            <ShoppingImageDisplay 
                                className="max-h-[240px]"
                                shoppingImages={shoppingItem.shopping_images}                            
                            />
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                {shoppingItem.title}
                            </h2>

                            <p className="mt-4 text-sm/relaxed">
                                {shoppingItem.description}
                            </p>
                            <div className="grid grid-cols-4 w-full pt-8 gap-3">
                                {true ? (
                                    <>
                                        <a 
                                            className="col-span-1 text-center bg-green-300 rounded-md" 
                                            href={route('shopping.view', shoppingItem.id)}
                                        >
                                            View
                                        </a>
                                        <a 
                                            className="cursor-pointer col-span-1 text-center bg-gray-600 rounded-md" 
                                            onClick={() => ticketBuyHandler(shoppingItem.id)}
                                        >
                                            Buy ticket
                                        </a>
                                    </>
                                ):(
                                    <span className="col-span-2 text-center rounded-md" >All ticket taken.</span>
                                )
                                }
                                {(auth?.user && shoppingItem.user_id === auth.user.id) && 
                                <>
                                    <a className="col-span-2 text-center bg-green-300 rounded-md" href={route('shopping.edit', shoppingItem.id)}>Edit</a>
                                </>
                                }
                            </div>
                        </div>
                    </div>           
                </div>
            )}
        </div>
    );
}
