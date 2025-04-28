import { GameProps } from "@/types"

export default function GameImageDisplay({game}:{
    game: GameProps
}) {
    return (
        <>
            {game.image && 
                <div className="flex items-center justify-center">
                    <img className="object-scale-down rounded-md max-w-3xl gap-4" src={'/storage/assets/images/games/'+game.image}/>
                </div>
            }
        </>
    )
}