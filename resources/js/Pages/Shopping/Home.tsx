import { AuthProps} from '@/types';
import ShoppingLayout from '@/Layouts/ShoppingLayout';


export default function Home({ auth}: {
    auth: AuthProps;
}) {

    return (
        <ShoppingLayout 
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Shopping items
                </h2>
                }
        >
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                Shopping app
                            </div>
                        </header>

                        <main className="mt-6">
                            <h1>Hello world!</h1>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Shopping app by Kayloe
                        </footer>
                    </div>
                </div>
            </div>
        </ShoppingLayout>
    );
}

