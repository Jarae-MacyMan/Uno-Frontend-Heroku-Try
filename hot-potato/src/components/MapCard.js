
import '../style/lobby.css'
import { Button} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';

function MapCard(props){
  let navigate = useNavigate()
  const [ gameInfo, setGameInfo ] = useState({})
  const [ joinGameInfo, setJoinGameInfo ] = useState({})
  let [ joinAttempts, updateJoinAttempts ] = useState(0)
  
  const context = useContext(Context)

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

  const handleSubmit = event => {
    event.preventDefault();
    const mapId = 1
    const hostedBy = context.userInfo.playerInfo.username
    const hostId = context.userInfo.playerInfo.player_id
    let roomCode = generateCode()
    console.log(mapId, hostedBy, hostId, roomCode)
    setGameInfo({
      map_id : mapId,
      room_code : roomCode,
      hosted_by : hostedBy,
      host_id : hostId
    })
  }

  const handleSubmitJoin = event => {
    event.preventDefault();
    let roomCode = event.target.code.value
    const playerId = context.userInfo.playerInfo.player_id
    console.log(roomCode, playerId)
    setJoinGameInfo({
      room_code : roomCode,
      player_id : playerId
    })
    updateJoinAttempts(joinAttempts += 1)
  }

  const createGame = async (gameData) => {
    const response = await fetch("http://localhost:3032/game", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(gameData)
    })
    const data = await response.json();
    console.log(data)
    return data
  }

  const joinGame = async (joinGameInfo) => {
    const response = await fetch("http://localhost:3032/join", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(joinGameInfo)
    })
    const data = await response.json();
    console.log(data)
    return data
  }
function socketCreateGame(){

}
function socketJoinGame(){

}

  useEffect(() => {
    createGame(gameInfo).then(data => {
      console.log(gameInfo)
      console.log(data)
      if('game' in data){
        navigate(`/Waiting-Room/${data.game[0].game_id}`)
      }

    })
  }, [gameInfo])

  useEffect(() => {
    joinGame(joinGameInfo).then(data => {
      // console.log(data.data.game_id)
      if('data' in data){
        navigate(`/Waiting-Room/${data.data.game_id}`)
      }
    })
  })

  return (
    <div>
      <div className='game-control'>
       
      <form onSubmit={handleSubmit}>
        <button className='game-control-btn' type='submit'> Create game</button>
 </form>
 <p>  OR</p>
 <form onSubmit={handleSubmitJoin}>
  <input type='text' placeholder='enter room code'></input>

  <button  className='game-control-btn ' type='submit' >Join room</button>

 </form>
 
      </div>
     
    </div>
  )
}

export default MapCard;
