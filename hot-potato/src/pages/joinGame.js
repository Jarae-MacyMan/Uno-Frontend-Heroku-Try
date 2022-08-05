import GameList from "../components/GameList";
import { useNavigate } from "react-router";

function JoinGame(){
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/')}>Go Back</button>
            <h1>Select a game to join:</h1>
            <div className="game-card">
                <div><h3>Map</h3></div>
                <div><h3>Name</h3></div>
                <div><h3>Status</h3></div>
            </div>
            <div><GameList/></div>
        </div>
    )
}

export default JoinGame;