
import '../style/lobby.css'
import { Button} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
//import Context from '../context/Context';
//import { Link } from 'react-router-dom'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function MapCard(){
  //let navigate = useNavigate()
  // const [ gameInfo, setGameInfo ] = useState({})
  // const [ joinGameInfo, setJoinGameInfo ] = useState({})
  // let [ joinAttempts, updateJoinAttempts ] = useState(0)
  const [gameRoomCode, setGameRoomCode] = useState('')
  
  //const context = useContext(Context)

  const generateCode = event => {
    let code = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const charactersLength = characters.length;

    for(let i=0; i<6;i++){
        code += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    console.log(code)
    return code
  }
  // const handleSubmit = event => {
  
  //   event.preventDefault();
  //   // const mapId = 1
  //   // const hostedBy = context.userInfo.playerInfo.username
  //   // const hostId = context.userInfo.playerInfo.player_id
  //   let roomCode = generateCode()
  //   setGameRoomCode(roomCode)
  //   console.log(gameRoomCode)
  //   // console.log(mapId, hostedBy, hostId, roomCode)
  //   // setGameInfo({
  //   //   map_id : mapId,
  //   //   room_code : roomCode,
  //   //   hosted_by : hostedBy,
  //   //   host_id : hostId
  //   // })
  // }


  // const handleSubmitJoin = event => {
  //   event.preventDefault();
  //   let roomCode = event.target.code.value
  //   //const playerId = context.userInfo.playerInfo.player_id
  //   //console.log(roomCode)
  //   // setJoinGameInfo({
  //   //   room_code : roomCode,
  //   //   player_id : playerId
  //   // })
  //   // updateJoinAttempts(joinAttempts += 1)
  //   setGameRoomCode(roomCode)
  // }

  // const createGame = async (gameData) => {
  //   const response = await fetch("http://localhost:3032/game", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type" : "application/json",
  //     },
  //     body : JSON.stringify(gameData)
  //   })
  //   const data = await response.json();
  //   console.log(data)
  //   return data
  // }

  // const joinGame = async (joinGameInfo) => {
  //   const response = await fetch("http://localhost:3032/join", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type" : "application/json",
  //     },
  //     body : JSON.stringify(joinGameInfo)
  //   })
  //   const data = await response.json();
  //   console.log(data)
  //   return data
  // }


  // useEffect(() => {
  //   createGame(gameInfo).then(data => {
  //     console.log(gameInfo)
  //     console.log(data)
  //     if('game' in data){
  //       navigate(`/Game?roomCode=${gameRoomCode}`)
  //     }

  //   })
  // }, [gameInfo])

  // useEffect(() => {
  //   joinGame(joinGameInfo).then(data => {
  //     // console.log(data.data.game_id)
  //     if('data' in data){
  //       navigate(`/Game?roomCode=${gameRoomCode}`)
  //     }
  //   })
  // })

  return (
    <div>
   
      <div className='game-control'>   
       <div >
                        <Link to={`/play?roomCode=${generateCode()}`}><button className="game-control-btn">CREATE GAME</button></Link>
                    </div>
            

                <p>OR</p>
                    <div className='input-box'>
                        <input id="outlined-basic" label="Room Code"  type='text' placeholder='Game Code'  onChange={(event) => setGameRoomCode(event.target.value)} />
                        <Link to={`/play?roomCode=${gameRoomCode}`}><button className="game-control-btn">JOIN GAME</button></Link>
                    </div>
                   
                   
            </div>
        

    </div>
  )
}

export default MapCard;
