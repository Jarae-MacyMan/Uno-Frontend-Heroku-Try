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
  
    return (
        <div className="map-selection-container">
        {context.listOfMaps.map((map) => {
          return <MapCard key={map.map_id} map={map}/>
        })}
        </div>
    )
}
export default MapList;