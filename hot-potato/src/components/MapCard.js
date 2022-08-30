// import { useEffect, useState } from "react"; 
// import {Button, CardTitle, Card, CardBody, CardText} from 'reactstrap'
import '../style/lobby.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, FormControl, Input, InputLabel } from '@mui/material';
import { width } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';

function MapCard(props){
  let navigate = useNavigate()
  const [ gameInfo, setGameInfo ] = useState({})
  const [ joinGameInfo, setJoinGameInfo ] = useState({})
  let [ joinAttempts, updateJoinAttempts ] = useState(0)
  
  const context = useContext(Context)

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

  const handleSubmit = event => {
    event.preventDefault();
    const mapId = 1
    const hostedBy = context.userInfo.playerInfo.username
    const hostId = context.userInfo.playerInfo.player_id
    let roomCode = generateCode()
    console.log(mapId, hostedBy, hostId, roomCode)
    setGameInfo({
      map_id : mapId,
      room_code : roomCode,
      hosted_by : hostedBy,
      host_id : hostId
    })
  }

  const handleSubmitJoin = event => {
    event.preventDefault();
    let roomCode = event.target.code.value
    const playerId = context.userInfo.playerInfo.player_id
    console.log(roomCode, playerId)
    setJoinGameInfo({
      room_code : roomCode,
      player_id : playerId
    })
    updateJoinAttempts(joinAttempts += 1)
  }

  const createGame = async (gameData) => {
    const response = await fetch("http://localhost:3032/game", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(gameData)
    })
    const data = await response.json();
    console.log(data)
    return data
  }

  const joinGame = async (joinGameInfo) => {
    const response = await fetch("http://localhost:3032/join", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(joinGameInfo)
    })
    const data = await response.json();
    console.log(data)
    return data
  }

  useEffect(() => {
    createGame(gameInfo).then(data => {
      console.log(gameInfo)
      console.log(data)
      if('game' in data){
        navigate(`/Waiting-Room/${data.game[0].game_id}`)
      }

    })
  }, [gameInfo])

  useEffect(() => {
    joinGame(joinGameInfo).then(data => {
      // console.log(data.data.game_id)
      if('data' in data){
        navigate(`/Waiting-Room/${data.data.game_id}`)
      }
    })
  })

  return (
    <div>
      <div className='map-card'>
        <Card className='card' style={{backgroundColor:"white" }} >
          <CardActionArea>
            <CardMedia component="img" height="170" image="https://cdna.artstation.com/p/assets/images/images/024/979/396/large/sarath-kumar-nyc-street-day.jpg?1584168680" alt="nyc"/>
            <CardContent className='map-name'>
              <Typography gutterBottom variant="h5" component="div">NYC</Typography>
              <Typography variant="body2" color="black">Join our NYC map with friends</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <form onSubmit={handleSubmit}>
            <FormControl>
               <Button className='start-btn' style={{color: 'black'}} type="submit">Create game</Button>
            </FormControl>
            </form>
            <form onSubmit={handleSubmitJoin}>
            <FormControl>
              <InputLabel>Room code</InputLabel>
              <Input className='id' type='text' id='code'/>
              <Button style={{color: 'black'}}className='join' size="small" color="primary" type='submit'>JOIN</Button>
            </FormControl>
            </form>
          </CardActions>
        </Card>
        <Card className='card' style={{backgroundColor:"white" }} >
          <CardActionArea>
            <CardMedia component="img" height="170" image='https://www.to-be-education.com/images/Games/12687/3259a506890725f.jpg' alt="jungle"/>
            <CardContent className='map-name'>
              <Typography gutterBottom variant="h5" component="div">JUNGLE</Typography>
              <Typography variant="body2" color="black">Join our JUNGLE map with friends</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button className='start-btn' style={{color: 'black'}}>Create game</Button>
            <FormControl>
              <InputLabel>Room code</InputLabel>
              <Input className='id'/>
              <Button style={{color: 'black'}}className='join' size="small" color="primary">JOIN</Button>
            </FormControl>
          </CardActions>
        </Card>
        <Card className='card' style={{backgroundColor:"white" }} >
          <CardActionArea>
            <CardMedia component="img" height="170" image="https://thumbs.dreamstime.com/b/farm-game-background-d-application-vector-design-tileable-horizontally-size-ready-parallax-effect-69534178.jpg"alt="farm"/>
            <CardContent className='map-name'>
              <Typography gutterBottom variant="h5" component="div">FARM</Typography>
              <Typography variant="body2" color="black">Join our FARM map with friends</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button style={{color: 'black'}} className='createGame'>Create game</Button>
            <FormControl>
              <InputLabel>Room code</InputLabel>
              <Input className='id'/>
              <Button className='join' size="small" color="primary" style={{color: 'black'}}>JOIN</Button>
            </FormControl>
          </CardActions>
        </Card> 
      </div>
    </div>
  )
}

export default MapCard;
