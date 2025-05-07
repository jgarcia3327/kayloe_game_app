import { AuthProps, GameProps } from "@/types";
import { Head } from "@inertiajs/react";
import ShoppingAuthenticatedLayout from "./ShoppingAuthenticatedLayout";
import { PropsWithChildren, ReactNode } from "react";
import ShoppingPublicLayout from "./ShoppingPublicLayout";

export default function GameLayout({
    auth, 
    header,
    children
}:PropsWithChildren<{auth?: AuthProps, header?: ReactNode}>) {
    return (
        <>
        {auth?.user? (
            <ShoppingAuthenticatedLayout
                header={header}
            >
            
                <Head title="Shopping items" />
                <>{children}</>
            </ShoppingAuthenticatedLayout>
        ):(
            <ShoppingPublicLayout
                header={header}
            >
            
                <Head title="Welcome" />
                <>{children}</>
            </ShoppingPublicLayout>
        )}
        </>
    );
}
