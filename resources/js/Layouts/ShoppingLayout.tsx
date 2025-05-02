import { AuthProps, GameProps } from "@/types";
import { Head } from "@inertiajs/react";
import AuthenticatedShoppingLayout from "./AuthenticatedShoppingLayout";
import PublicLayout from "./PublicLayout";
import { PropsWithChildren, ReactNode } from "react";

export default function GameLayout({
    auth, 
    header,
    children
}:PropsWithChildren<{auth?: AuthProps, header?: ReactNode}>) {
    return (
        <>
        {auth?.user? (
            <AuthenticatedShoppingLayout
                header={header}
            >
            
                <Head title="Shopping items" />
                <>{children}</>
            </AuthenticatedShoppingLayout>
        ):(
            <PublicLayout
                header={header}
            >
            
                <Head title="Welcome" />
                <>{children}</>
            </PublicLayout>
        )}
        </>
    );
}
