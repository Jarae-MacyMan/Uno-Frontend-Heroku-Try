


import { useNavigate } from 'react-router-dom';
import WaitingRoom from '../pages/gameLobby';
import {useEffect, useState} from 'react'
import MapList from './MapList';

function MapCard(props){
  let navigate = useNavigate()
    const { map } = props

    const [ selectedMap, setSelectedMap ] = useState([])

    // useEffect(() => {
    //     fetch(`http://localhost:3032/maps/${map.map_id}`)
    //     .then(res => res.json())
    //     .then((data) => {

    //         setSelectedMap(data)
    //     })
    // }, [])

    return (
        <div>
 
    


    
    

        </div>
    )
}

export default MapCard;
