
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Context from "../context/Context";
import NavbarFunc from "./navbar"
import { Button } from "reactstrap";
import {CircularProgress} from '@mui/material'
import "../style/gameLobby.css"

import Game from './unoGame.js'





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
            // console.log(gamesList)
            updateCurrentGame(gamesList.find((games) =>   games.game_id == params.id))
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

  
// console.log(game.room_code) 

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
        console.log(data)
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
            < Game data={game}/>
        </div>
    
        // <div>
        //     <NavbarFunc/>
        //     <div className="header">
        //     <h2>Waiting room </h2>
        //     <p>Your game room code is: {game.room_code}</p>
        //     {/* <div className="game-img" >

        //         <img  src="https://cdna.artstation.com/p/assets/images/images/024/979/396/large/sarath-kumar-nyc-street-day.jpg?1584168680" />
        //         <CircularProgress className="overlay" color="inherit" />
        //     </div> */}
        //     </div>
        //     <div className="friends">
        //     <h4>Players in the Lobby</h4>
        //     <div>
        //         {currentPlayerList.map((player) => {
        //             return <ol key={player.player_id}> <li>{player.username}</li></ol>
        //         })}
        //     </div>
        //     <div className="game-btn">
        //         {game.hosted_by === context.userInfo.playerInfo.username && 
        //             <div style={{paddingRight:'30px'}}>
        //                 <button className="waiting-btn"
        //                 >Start Game</button>
        //                 {/* <button onClick={handleCloseClick}>Close</button> */}
        //                 {/* <button onClick={handlePublicClick}>{isClicked ? 'Private' : 'Public'}</button> */}
        //             </div>
        //         }
           
        //     <button  onClick={handleLeaveClick} className="waiting-btn">Leave Room</button> 
            
        //     </div>
        //     </div>
        // </div>
    )
}


export default WaitingRoom;