import { AuthProps } from "@/types";
import { Head } from "@inertiajs/react";
import GameAuthenticatedLayout from "./GameAuthenticatedLayout";
import GamePublicLayout from "./GamePublicLayout";
import { PropsWithChildren, ReactNode } from "react";

export default function GameLayout({
    auth, 
    header,
    children
}:PropsWithChildren<{auth?: AuthProps, header?: ReactNode}>) {
    return (
        <>
        {auth?.user? (
            <GameAuthenticatedLayout
                header={header}
            >
            
                <Head title="Play On" />
                <>{children}</>
            </GameAuthenticatedLayout>
        ):(
            <GamePublicLayout
                header={header}
            >
            
                <Head title="Welcome" />
                <>{children}</>
            </GamePublicLayout>
        )}
        </>
    );
}
