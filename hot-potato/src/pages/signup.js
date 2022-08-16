import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import React from 'react';
import {Button, Input, Label, FormGroup, Form} from 'reactstrap'
import '../style/signup.css'
import NavbarFunc from './navbar';
function SignUp(){
    const navigate = useNavigate()
    const [playerInfo, setPlayerInfo] = React.useState({
        username : '',
        password : ''
    })
   
    const context = React.useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
        const playerUsername = event.target.username.value;
        const playerPassword = event.target.password.value;
        // console.log(playerUsername, playerPassword)

        setPlayerInfo()
        console.log(playerInfo)
    }
    const handleChange = (event) =>{
event.preventDefault()
setPlayerInfo({
    ...playerInfo,
    [event.target.name]: event.target.value
})
    }

    const createNewPlayer = async (playerData) => {
        const response = await fetch("http://localhost:3032/signup", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(playerData)
        })
        const data = await response.json();
        return data;
    }

    React.useEffect(() => {
        createNewPlayer(playerInfo).then(newPlayerData => {
            console.log(`This is the new player data: ${newPlayerData}`);
            context.updateToken(newPlayerData.token)
        })
    }, [playerInfo])

    React.useEffect(() => {
        console.log(`This is context token: ${context.token}`);
    }, [context.token])
   

    return (
        <div>
        <NavbarFunc user= {playerInfo}/>
        <div className='form-container'>
            <body>

              
            <h2>Create a player</h2>
            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name= "username" type="username" placeholder="Enter your username" />
                </div>
                <div>
                    <label>Password</label>
                    <input name= "password" type="password" placeholder="Enter your password" />
                </div>
                <button type='submit'> Submit </button>
            </form> */}
           
            
            <Form inline onSubmit={handleSubmit}>
  <FormGroup className="mb-2 me-sm-2 mb-sm-0">
    <Label
      className="me-sm-2"
      for="exampleEmail"
    >
        Username
      
    </Label>
    <Input
    onChange={handleChange}
      id="exampleEmail"
      name="username"
      placeholder="Entet your username"
      type="username"
      
    />
  </FormGroup>
  <FormGroup className="mb-2 me-sm-2 mb-sm-0">
    <Label
      className="me-sm-2"
      for="examplePassword"
     
    >
      Password
    </Label>
    <Input
     onChange={handleChange}
      id="examplePassword"
      name="password"
      placeholder="don't tell!"
      type="password"
    />
  </FormGroup>
  <div >
  <p >
      <Link to="/login" className='link'>Login</Link>
  </p>
 </div>
  <Button type='submit' onClick={(()=>{
   
    navigate('/home')
 
  })}>
    
    Submit
  </Button>
</Form> 
{/* <NavbarFunc user={playerInfo}/> */}
</body>
            </div>
            </div>
      
    )

}

export default SignUp