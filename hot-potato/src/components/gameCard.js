import { useEffect, useState } from "react";

function GameCard(props){
    const { game } = props;
    const [ selectedGame, setSelectedGame ] = useState([])

    // store a game's map
    const [ selectedGameMap, setSelectedGameMap ] = useState([])
    
    // To retrieve a specific game
    useEffect(() => {
        fetch(`http://localhost:3032/games/${game.game_id}`)
        .then(res => res.json())
        .then((data) => {
            setSelectedGame(data)
        })
    }, [])
    
    // To retrieve the specific game's map to show on front-end
    // useEffect(() => {
    //     fetch(`http://localhost:3032/game/${game.game_id}/map/${game.map_id}`)
    //     .then(res => res.json())
    //     .then((data) => {
    //         setSelectedGameMap(data)
    //     })
    // }, [])

    // If a game is Public then the player is free to join once they click 'join'
    const IsPublic = event => {
        console.log('Game is Public')
    }

    // If a game is not public (private) then the player must enter the room code (render form)
    const isNotPublic = () => {
        console.log('Game is not Public')
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter Room Code"></input>
                    <button type="submit"></button>
                </form>
            </div> 
        )
    }

    const handleSubmit = event => {

    }

    return (
        <div className="game-card">
            <div className="margin">
                {/* image wont show when page reloads */}
                <img alt="map"></img>
            </div>
            <div className="margin">{game.hosted_by}</div>
            <div className="margin">{game.is_public === false ? 'Private' : 'Public'}</div>
            <button className="btn" onClick={ game.is_public === false ? isNotPublic : IsPublic }>Join</button>
        </div>
    )
}

export default GameCard;