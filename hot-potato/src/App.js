import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';

import io from 'socket.io-client'
import {useEffect,useState} from 'react'

const socket = io.connect('http://localhost:3002')


function App() {
//room state
const [room, setRoom ] = useState('')
  //messgage states
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
 function joinRoom(){
  if(room !== ''){
    socket.emit('join_room', room)
  }
 }

function sendMessage(){
  socket.emit('send_message',{message, room})
  
}
useEffect(() => {
socket.on('received_message', (data)=>{
  setMessageReceived(data.message)
})
},[socket])

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignUp></SignUp>}/>
        <Route exact path='/login' element={<Login></Login>}/>
      </Routes>
    </Router>
    
    <div className="App">
      <header>
        Hot Potato
      </header>
      <input placeholder='Room Number..' 
      onChange={(event)=>{
        setRoom(event.target.value)
      }}></input>
<button onClick={joinRoom}>Join Room</button>

      <input placeholder='Message...' 
      onChange={(event)=>{
        setMessage(event.target.value)
      }}></input>
      <button onClick={sendMessage}>click me</button>
     <h1>Message:
      {messageReceived}
     </h1>
    </div>
  );
}

export default App;
