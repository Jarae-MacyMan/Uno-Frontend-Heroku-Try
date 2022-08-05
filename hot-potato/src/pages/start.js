import { useNavigate } from "react-router-dom";

function Start(){
    const navigate = useNavigate()
    return (
        <div className="start-page-container">
            <h1 className="title"> HOT POTATO</h1>
            <div className="btn-div"><button className="start-btn" onClick={() => navigate('/create')}>Create a game</button></div>
            <div className="btn-div"><button className="start-btn" onClick={() => navigate('/join')}>Join a game</button></div>
            <br></br>
            <div className="btn-div"><button className="start-btn" onClick={() => navigate('/socket')}>Test Socket.io</button></div>
        </div>
    )
}

export default Start;