import GameCard from "./GameCard";
import { useContext } from "react";
import Context from "../context/Context";

function GameList(){
    let context = useContext(Context)

    return (
        <div>
            {context.listOfGames.map((game) => {
                return <GameCard key={game.game_id} game={game}/>
            })}
        </div>
    )
}

export default GameList;