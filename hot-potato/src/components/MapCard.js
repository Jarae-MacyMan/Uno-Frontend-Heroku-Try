// import { useEffect, useState } from "react"; 
// import {Button, CardTitle, Card, CardBody, CardText} from 'reactstrap'
import '../style/lobby.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, FormControl, Input, InputLabel } from '@mui/material';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';
function MapCard(props){
  let navigate = useNavigate()
    // const { map } = props
    // const [ selectedMap, setSelectedMap ] = useState([])

    // useEffect(() => {
    //     fetch(`http://localhost:3032/maps/${map.map_id}`)
    //     .then(res => res.json())
    //     .then((data) => {
    //         setSelectedMap(data)
    //     })
    // }, [])

    return (
        <div>
 
    
<div className='map-card'>
<Card className='card' style={{backgroundColor:"white" }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image="https://cdna.artstation.com/p/assets/images/images/024/979/396/large/sarath-kumar-nyc-street-day.jpg?1584168680"
          alt="nyc"
        />
        <CardContent  className='map-name'>
          <Typography gutterBottom variant="h5" component="div">
       NYC
          </Typography>
          <Typography variant="body2" color="black" >
           Join our NYC map with friends
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions> 
        <Button className='start-btn' style={{color: 'black'}} onClick= {(()=>{
          navigate('/room')
        })}
        > Create game </Button>
      <FormControl  >
<InputLabel> Room code</InputLabel>
           <Input  className='id'>  </Input>
        <Button  style={{color: 'black'}}className='join' size="small" color="primary">
          JOIN
        </Button>
        </FormControl>
       
      </CardActions>
    </Card>

    <Card className='card' style={{backgroundColor:"white" }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image='https://www.to-be-education.com/images/Games/12687/3259a506890725f.jpg'
          alt="jungle"
        />
        <CardContent className='map-name'>
          <Typography gutterBottom variant="h5" component="div">
            JUNGLE
          </Typography>
          <Typography variant="body2" color="black">
          Join our JUNGLE map with friends
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button className='start-btn' style={{color: 'black'}}> Create game </Button>
        <FormControl  >
<InputLabel> Room code</InputLabel>
           <Input  className='id'>  </Input>
        <Button  style={{color: 'black'}}className='join' size="small" color="primary">
          JOIN
        </Button>
        </FormControl>
      </CardActions>
    </Card>

    <Card  className='card' style={{backgroundColor:"white" }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image="https://thumbs.dreamstime.com/b/farm-game-background-d-application-vector-design-tileable-horizontally-size-ready-parallax-effect-69534178.jpg"
          alt="farm"
        />
        <CardContent  className='map-name'>
          <Typography gutterBottom variant="h5" component="div">
            FARM
          </Typography>
          <Typography variant="body2" color="black">
            Join our FARM map with friends
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button style={{color: 'black'}} className='createGame'> Create game </Button>
      <FormControl  >
<InputLabel> Room code</InputLabel>
           <Input  className='id'>  </Input>
        <Button className='join' size="small" color="primary" style={{color: 'black'}}>
          JOIN
        </Button>
        </FormControl>
      </CardActions>
    </Card>
    
    
</div>
        </div>
    )
}

export default MapCard;
