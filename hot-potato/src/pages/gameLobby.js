
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import Context from "../context/Context";

function WaitingRoom (){
    let params = useParams();
    const navigate = useNavigate()
    const context = useContext(Context)
    
    const [ game, updateCurrentGame ] = useState([])
    const [ currentPlayerList, setPlayerList ] = useState([])
    const [ enteredInfo, setEnteredInfo ] = useState({})
    const [ isClicked, setIsClicked ] = useState('true')
    const [ makePublicInfo, setMakePublicInfo ] = useState([])
    const [ deleteGameInfo, setDeleteGameInfo ] = useState([])
    let [ deleteAttempts, updateDeleteAttempts ] = useState(0)
    let [leaveAttempts, updateLeaveAttempts] = useState(0)

    useEffect(() => {
        context.getAllGames().then(gamesList => {
            updateCurrentGame(gamesList.find(games => games.game_id == params.id))
        })
    }, [context.gamesList])

    useEffect(() => {
        fetch(`http://localhost:3032/games/${params.id}/players`)
        .then(res => res.json())
        .then((data) => {
            //mapping over the data make another fetch call to get the player username set the playerlist
            data.playerList.map((info) => {
                fetch(`http://localhost:3032/games/${info.game_id}/players/playernames`)
                .then(res => res.json())
                .then((newData) => {
                    setPlayerList(newData.playerList)
                })
            })
        })
    }, [currentPlayerList])


    const handlePublicClick = event => {
        setIsClicked(!isClicked)
        const gameId = params.id;
        setMakePublicInfo({
            game_id : gameId
        })
    }

    const handleCloseClick = event => {
        const gameId = params.id
        setDeleteGameInfo({
            game_id: gameId
        })
        updateDeleteAttempts(deleteAttempts += 1)
    }

    const handleLeaveClick = event => {
        const playerId = context.userInfo.playerInfo.player_id;
        const gameId = params.id;
        setEnteredInfo({
            player_id : playerId
        })
        updateLeaveAttempts(leaveAttempts += 1)
    }

    const makeGamePublic = async (makePublicInfo) => {
        const response = await fetch(`http://localhost:3032/game/${params.id}/public`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(makePublicInfo)
        })
        const data = await response.json()
        return data;
    }

    const deleteGame = async (delteGameInfo) => {
        const response = await fetch(`http://localhost:3032/game`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(delteGameInfo)
        })
        const data = await response.json()
        
        return data
    }

    const leaveGame = async (enteredInfo) => {
        const response = await fetch(`http://localhost:3032/leave/${params.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(enteredInfo)
        })
        const data = await response.json()
        return data
    }

    useEffect(() => {
        makeGamePublic(makePublicInfo)
    }, [makePublicInfo])

    useEffect(() => {
        deleteGame(deleteGameInfo)
        if(deleteAttempts > 0){
            navigate('/home')
        }
    }, [deleteGameInfo])

    useEffect(() => {
        leaveGame(enteredInfo)
            if(leaveAttempts > 0 ){
                navigate('/home')
            }
    }, [enteredInfo])
    
    return(
        <div>
            <div>
                <img src="https://cdna.artstation.com/p/assets/images/images/024/979/396/large/sarath-kumar-nyc-street-day.jpg?1584168680" />
            </div>
            <p>Players in the Lobby: {params.id} </p>
            <div>
                {currentPlayerList.map((player) => {
                    return <p key={player.player_id}>{player.username}</p>
                })}
            </div>
            <div>
                {game.hosted_by === context.userInfo.playerInfo.username && 
                    <div>
                        <button>Start</button>
                        <button onClick={handleCloseClick}>Close</button>
                        <button onClick={handlePublicClick}>{isClicked ? 'Private' : 'Public'}</button>
                    </div>
                }
            </div>
            <button onClick={handleLeaveClick}>Leave Room</button>
        </div>
    )
}


export default WaitingRoom;