import { Head } from "@inertiajs/react";
import CreateShoppingForm from "./Partials/CreateShoppingForm";
import { AuthProps } from "@/types";
import ShoppingLayout from "@/Layouts/ShoppingLayout";

export default function Create({auth}:{
    auth:AuthProps;
}) {
    return (
        <ShoppingLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Game</h2>}
            auth={auth}
        >
            <Head title="New Game" />

            <div className="py-12"> 
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <CreateShoppingForm
                            className="max-w-full"
                        />
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    );
}