import MapCard from "./MapCard";
import { useContext } from "react";
import Context from "../context/Context";

function MapList(){
    let context = useContext(Context);

    return (
        <div className="border">
        <div className="map-selection-container">
        {context.listOfMaps.map((map) => {
            return <MapCard key={map.map_id} map={map}/>
        })}
       </div>
       </div>
    )
}
export default MapList;