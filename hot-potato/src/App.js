
import './App.css';
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
