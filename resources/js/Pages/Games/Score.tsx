import GameLayout from "@/Layouts/GameLayout";
import { AuthProps, GameProps, PlayedGamesWithQuesionsAndChoicesProps, ScoreProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import QuestionPlayedPreview from "./Questions/Partials/QuestionPlayedPreview";
import PrimaryButton from "@/Components/PrimaryButton";
import GameImageDisplay from "./Partials/GameImageDisplay";

export default function MyGames({ auth, game, playedGamesWithQuesionsAndChoices}:{
    auth: AuthProps,
    game: GameProps,
    playedGamesWithQuesionsAndChoices: [PlayedGamesWithQuesionsAndChoicesProps]
}) {

    const { post, get, processing, recentlySuccessful } = useForm({
            // 
        });
        const playAgainHandler = (e:any) => {
            post(route('public.play.again.game.start', game.id));
        }

    return (
        <GameLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Game score
                </h2>
            }
            auth={auth}
        >
            <Head title="Dashboard" />

            <div className="pt-12">
                <GameImageDisplay game={game}/>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h3 className="font-bold text-xl">{game.title}</h3>
                    <p>{game.description}</p>
                    <p className="mb-3">Passing percentage: {game.passing_percent}%</p>
                    <PrimaryButton 
                        className="mb-6 col-span-1 col-start-2 text-center inline-grid bg-green-900" 
                        disabled={processing}
                        onClick={playAgainHandler}
                    >
                        Play again
                    </PrimaryButton>
                    {playedGamesWithQuesionsAndChoices.map((p: PlayedGamesWithQuesionsAndChoicesProps, i: number) => 
                        <div className={"p-3 " + ((i % 2 === 0)? "bg-gray-200" : "bg-gray-300")}>                                
                            {/* <div className="mb-2">
                                <h2 className="text-lg font-extrabold">{p.playedGame.title}</h2>
                                <p>{p.playedGame.description}</p>
                            </div>
                            <p>Passing percentage: {p.playedGame.passing_percent}%</p> */}
                            <p>
                                Date: {new Date(p.score.created_at).toLocaleDateString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                    })
                                }
                            </p>
                            <p>Score: {p.score.score} / {p.score.question_count}</p>
                            {p.score.is_passed? (
                                <p className="text-green-800 text-xl">Congratulations! You passed.</p>
                            ) : (
                                <p className="text-red-800 text-xl">Sorry, you failed.</p>
                            )
                            }
                            <QuestionPlayedPreview 
                                playedGame={p.playedGame}
                                playedQuestionsWithChoices={p.playedQuestionsWithChoices}            
                            />
                        </div>
                    )}
                </div>
            </div>
        </GameLayout>
    );
}