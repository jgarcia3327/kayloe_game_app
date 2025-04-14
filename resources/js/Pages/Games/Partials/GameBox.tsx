import { GameProps, AuthProps } from "@/types";

export default function GameBox({ auth, games }:{
    auth: AuthProps;
    games: GameProps;
}) {

    return (
        <div className="columns-1 md:columns-2 lg:columns-2 gap-68">
            {games.map((game: GameProps) => 
                <div 
                    key={game.id}
                    className="break-inside-avoid py-2"
                >
                    <div className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                        <div className="pt-3 sm:pt-5 w-full">
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                {game.title}
                            </h2>

                            <p className="mt-4 text-sm/relaxed">
                                {game.description}
                            </p>
                            <div className="grid grid-cols-2 w-full pt-8">
                                {auth.user && game.user_id === auth.user.id ? 
                                <>
                                    <a className="mr-3 col-span-1 text-center bg-red-400 rounded-md" href={route("public.play.game", game.id)}>Play</a>
                                    <a className="ml-3 cols-span-1 text-center bg-green-300 rounded-md" href={route('game.edit', game.id)}>Edit</a>
                                </>
                                :
                                <a className="mr-3 col-span-full text-center bg-red-400 rounded-md" href={route("public.play.game", game.id).toString()}>Play</a>
                                }
                            </div>
                        </div>
                    </div>           
                </div>
            )}
        </div>
    );
}
