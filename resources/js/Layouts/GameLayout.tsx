import { AuthProps, GameProps } from "@/types";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "./AuthenticatedLayout";
import PublicLayout from "./PublicLayout";
import { PropsWithChildren, ReactNode } from "react";

export default function GameLayout({
    auth, 
    header,
    children
}:PropsWithChildren<{auth: AuthProps, header?: ReactNode}>) {
    return (
        <>
        {auth.user? (
            <AuthenticatedLayout
                header={header}
            >
            
                <Head title="Play On" />
                <>{children}</>
            </AuthenticatedLayout>
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
