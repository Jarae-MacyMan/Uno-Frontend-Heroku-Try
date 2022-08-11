import io from 'socket.io-client';
import React, { useState } from 'react';



function SocketTest(){
     let playerNum = 0
 const [gameCode, setGameCode] = useState('')   
const socket = io('http://localhost:3002')

socket.on('init', handleInit)
socket.on('gameCode', handleGameCode)
socket.on('unknownGame', handleUnknownGame)
socket.on('tooManyPlayers', handleTooManyPlayers)


function reset(){
    playerNum = null 
   setGameCode('')
}
function handleUnknownGame(){
    reset()
alert('Unknown Game Code ')
}
function handleTooManyPlayers(){
     reset()
    alert('This game is full')
}
function handleInit(number){
  playerNum = number
}
function newGame(){
socket.emit('newgame')


}
 function joinGame(){
socket.emit('joinGame', gameCode)

 }
 function handleGameCode(gameCode){
    console.log(gameCode)
return (
    <div>
        <h4>Your game code is: {gameCode}</h4>
    </div>
)
 }
return (
    <div>
    <header>Hot Potato</header>
   <button onClick={newGame}>Create new game</button>
   <br></br>
    <input placeholder='Enter room code...' 
    onChange={(event)=> {
        setGameCode(event.target.value)
    }}>
    </input>
   <button onClick={()=> {
    joinGame()
    handleGameCode()
   }} >Join Room</button>
  
    </div>
    )
}

export default SocketTest;