import ShoppingLayout from "@/Layouts/ShoppingLayout";
import { AuthProps } from "@/types";
import { ShoppingItemProps } from "@/types/shopping";
import { Head } from "@inertiajs/react";
import ShoppingBox from "./Partials/ShoppingBox";

export default function MyList({auth, shoppingItems}:{
    auth: AuthProps,
    shoppingItems: [ShoppingItemProps]
}) {

    return (
        <ShoppingLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Shopping Items
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <ShoppingBox auth={auth} shoppingItems={shoppingItems}></ShoppingBox>
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    );
}