import { useParams, useNavigate, Link, Navigate } from "react-router-dom";

function Start(){
    const navigate = useNavigate()
    return (
        <div className="start-page-container">
            <h1> HOT POTATO</h1>
            <div className="btn-div"><button onClick={() => navigate('/create') }>Create a game</button></div>
            <div className="btn-div"><button onClick={() => navigate('/join')}>Join a game</button></div>
        </div>
    )
}

export default Start;