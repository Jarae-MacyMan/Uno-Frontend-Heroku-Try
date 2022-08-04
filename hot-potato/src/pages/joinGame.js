import GameList from "../components/GameList";
import { useParams, useNavigate, Link } from "react-router";

function JoinGame(){
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/start')}>Go Back</button>
            <h1>Select a game to join:</h1>
            <div><GameList/></div>
        </div>
    )
}

export default JoinGame;