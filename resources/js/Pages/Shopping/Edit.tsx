import { Head } from "@inertiajs/react";
import UpdateShoppingForm from "./Partials/UpdateShoppingForm";
import { AuthProps } from "@/types";
import { ShoppingImageProps, ShoppingItemProps } from "@/types/shopping";
import ShoppingLayout from "@/Layouts/ShoppingLayout";

export default function Edit({ auth, shoppingItem, shoppingImages }:{
    auth: AuthProps,
    shoppingItem: ShoppingItemProps,
    shoppingImages: [ShoppingImageProps]
}) {

    return (
        <ShoppingLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shopping item ID: {shoppingItem.id}</h2>}    
            auth={auth}     
            >
            <Head title={'Shopping ID: ' + shoppingItem.id} />

            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateShoppingForm
                            auth={auth}
                            shoppingItem={shoppingItem}
                            shoppingImages={shoppingImages}
                        />
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    );
}