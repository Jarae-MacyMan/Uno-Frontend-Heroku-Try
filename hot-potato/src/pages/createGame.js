import MapList from "../components/MapList";
import { useParams, useNavigate, Link } from "react-router-dom";

function CreateGame(){
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate('/start')}>Go back</button>
            <h1>Choose a Map</h1>
            <div><MapList/></div>
            <button>Create</button>
        </div>
    )
}

export default CreateGame;