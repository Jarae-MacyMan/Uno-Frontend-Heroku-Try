import { useEffect, useState } from "react";

function GameCard(props){
    const { game } = props;
    const [ selectedGame, setSelectedGame ] = useState([])

    // store a game's map
    // const [ selectedGameMap, setSelectedGameMap ] = useState([])
    
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

    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(true);
    };

    const [ enteredCode, setEnteredCode ] = useState({})

    const handleSubmit = event => {
        event.preventDefault()
        console.log(event.target.code.value)
        const codeEntered = event.target.code.value;

        setEnteredCode({
            room_code : codeEntered
        })
    }

    const postPlayerInGame = async (code) => {
        const response = await fetch("http://localhost:3032/join", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(code)   
        })
        const data = await response.json()
        return data;
    }

    const handleJoin = event => {
        
    }

    const handleSecondClick = event => {
        setIsShown(false);
    }


    useEffect(() => {
        postPlayerInGame(enteredCode)
    }, [enteredCode])

    return (
        <div className="game-card">
            <div className="margin">
                {/* image wont show when page reloads */}
                <img alt="map-img"></img>
            </div>
            <div className="margin">{game.hosted_by}</div>
            <div className="margin">{game.is_public === false ? 'Private' : 'Public'}</div>
            <button className="btn" onClick={ game.is_public === false ? handleClick : IsPublic }>Join</button>

            { isShown && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="code" placeholder="Enter the room code"></input>
                        <button onClick={handleJoin} type="submit">Enter</button>
                    </form>
                    <button onClick={handleSecondClick}>Cancle</button>
                </div>
            )}
        </div>
    )
}

export default GameCard;