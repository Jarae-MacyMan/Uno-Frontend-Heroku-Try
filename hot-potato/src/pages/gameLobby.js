import NavbarFunc from "./navbar";
import MapCard from "../components/MapCard";
import '../style/waitingRoom.css'
import { useEffect, useState } from "react";
import {ListGroup,ListGroupItem, ListGroupItemHeading} from 'reactstrap'

function WaitingRoom (){
    const [roomCode , setRoomCode] = useState('')
 
        useEffect(()=>{
            let code = ""
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            const charactersLength = characters.length;
        
            for(let i=0; i<6;i++){
                code += characters.charAt(Math.floor(Math.random() * charactersLength))
            setRoomCode(code)
            }
        },[])
            ``

console.log(roomCode)
return(
    
<div>
   
<NavbarFunc/>
<div className="heading">
       <h2 className="heading2"> 
        WAITING ROOM
      </h2>
       
        <p className="text">
      Send the given code in the forum to allow others players to join your game!!!
        </p> 
<h3 className="code-text">Your game code is: {roomCode} </h3>
        </div> 
        
<div className="main-container">
    
<div className="waiting-img">
        <img src="https://sagamer.co.za/wp-content/uploads/2015/03/loading-please-wait.png"></img> 
        </div>

</div>
<div className="friend-list">
  <h3>Players</h3>
<ol>
  <li>khalia</li>
  <li>Liam</li>
  <li>Jarae</li>
  <li>khalia</li>
</ol>
<button className="start-btn"> Start Game</button>
</div>

</div>
)

}


export default WaitingRoom;