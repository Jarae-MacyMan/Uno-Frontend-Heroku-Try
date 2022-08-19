import MapCard from "./MapCard";
import { useContext, useState } from "react";
import Context from "../context/Context";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,  FormGroup, Input } from '@mui/material';
import '../style/lobby.css'
import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";


function MapList(){
    let context = useContext(Context);
    let navigate = useNavigate();
    const [joinCode , setJoinCode] = useState('')

    function handleSumbit(event){
  event.preventDefault()
  setJoinCode(event.target.value)

    }
  

    return (
      
        <div className="map-selection-container">
        {context.listOfMaps.map((map) => {
            // console.log(map.map_id)

return (
    <Card className='card' style={{backgroundColor:"white" }} >
      <CardActionArea>
        <CardMedia
        
          component="img"
          height="170"
          // image="https://cdna.artstation.com/p/assets/images/images/024/979/396/large/sarath-kumar-nyc-street-day.jpg?1584168680"
          alt="nyc"
      src={map.img}
        />
        <CardContent  className='map-name'>
          <Typography gutterBottom variant="h5" component="div">
       {map.name}
          </Typography>
          <Typography variant="body2" color="black" >
           Join our {map.name} map with friends
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions> 
        <Button className='start-btn' style={{color: 'black'}} onClick= {(()=>{
          navigate('/room')
          return( <MapCard key={map.map_id} map={map}/>)
     
        })}
        > Create game {map.map_id}</Button>
  
         <Form onClick={handleSumbit}>
          <FormGroup className="mb-2 me-sm-2 mb-sm-0">
  
    <Input
    className="id"
      id="exampleEmail"
      name="roomCode"
      placeholder="Enter Room code"
      type="name"
    />
  </FormGroup>
  <Button>
    join
  </Button>

 </Form>
       
      </CardActions>
    </Card>
    
)


           
        }    )}
       </div>
      
    )
}
export default MapList;