import AuthenticatedShoppingLayout from '@/Layouts/ShoppingAuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }:PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <AuthenticatedShoppingLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <main className="mt-6">
                                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                    {auth.user.is_admin? (
                                        <a
                                            href={route('shopping.create')}
                                            className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                        >
                                            <div className="pt-3 sm:pt-5">
                                                <h2 className="text-xl font-semibold text-black dark:text-white">
                                                    Create shopping item.
                                                </h2>

                                                <p className="mt-4 text-sm/relaxed">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida risus a condimentum pulvinar. 
                                                Sed nec sem porttitor, finibus neque vel, eleifend nibh. Donec at cursus elit. 
                                                Duis dolor justo, rutrum eu tempus in, maximus non enim. Proin faucibus nibh id arcu ornare suscipit. 
                                                Integer efficitur mi mi, quis sodales mauris suscipit non. Sed congue ligula nunc, ut sagittis nisi placerat et. 
                                                Donec dapibus orci vulputate condimentum efficitur.
                                                </p>
                                            </div>
                                        </a>
                                    ):(<></>)
                                    }

                                    <a
                                        href={route('shopping.mylist')} 
                                        className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                    >
                                        <div className="pt-3 sm:pt-5">
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                My shopping item list.
                                            </h2>

                                            <p className="mt-4 text-sm/relaxed">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida risus a condimentum pulvinar. 
                                            Sed nec sem porttitor, finibus neque vel, eleifend nibh. Donec at cursus elit. 
                                            Duis dolor justo, rutrum eu tempus in, maximus non enim. Proin faucibus nibh id arcu ornare suscipit. 
                                            Integer efficitur mi mi, quis sodales mauris suscipit non. Sed congue ligula nunc, ut sagittis nisi placerat et. 
                                            Donec dapibus orci vulputate condimentum efficitur.
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedShoppingLayout>
    );
}
