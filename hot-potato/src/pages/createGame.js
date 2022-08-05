import MapList from "../components/MapList";
import { useNavigate } from "react-router-dom";

function CreateGame(){
    const navigate = useNavigate()

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

    return (
        <div>
            <button onClick={() => navigate('/')}>Go back</button>
            <h1>Choose a Map</h1>
            <div><MapList/></div>
            <div className="create-btn-div"><button onClick={generateCode} className="create-btn">Create</button></div>
        </div>
    )
}

export default CreateGame;