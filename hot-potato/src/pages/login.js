import { Link, useNavigate} from 'react-router-dom';
import Context from '../context/Context';
import React from 'react';

function Login(){
    const navigate = useNavigate();
    const [playerInfo, setPlayerInfo] = React.useState({});
    let   [attempts, updateAttempts] = React.useState(0);
    const [message, setMessage] = React.useState('')
    const context = React.useContext(Context);
    console.log(context)


    const handleSubmit = (event) => {
        event.preventDefault();
        const playerUsername = event.target.username.value;
        const playerPassword = event.target.password.value;
        console.log(playerUsername, playerPassword);
        if(playerUsername){
            setPlayerInfo({
            username : playerUsername,
            password : playerPassword
            })
        }
        updateAttempts(attempts += 1)    
    }

    const loginAttempt = async(playerData) => {
        const response = await fetch("http://localhost:3032/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playerData)
        })
        const data = await response.json()
        console.log(data)
        return data;
    }

    React.useEffect(() => {
        if(attempts > 0){
            loginAttempt(playerInfo).then(data => {
                if(data.message) {
                    setMessage(data.message)
                } else {
                    setMessage('');
                    context.updateUserInfo(data)
                    navigate('/home')
                }
            })
        }
    }, [playerInfo])

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name='username' type="username" placeholder='Enter Username'/>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" placeholder='Enter Password'/>
                </div>
                <button type='submit'> Submit </button>
            </form>
            <span>
                <Link to="/signup">SignUp</Link>
                <Link to="/home">Home</Link>
                <Link to="Waiting-Room/194">Waiting Room 194</Link>
            </span>
        </div>
    )
}

export default Login;