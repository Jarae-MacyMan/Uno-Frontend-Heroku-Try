import NavbarFunc from "./navbar"
import '../style/lobby.css'

import MapList from "../components/MapList"
function Lobby(){

return(
    <div>
     
       <NavbarFunc/>
<div className="heading">
       <h2 > 
        POTATO UNIVERSE
      </h2>
       
        <p className="text">
            Explore our map with friends while trying to beat the potato bomb. Dont get caught with the potato 
            at the wrong time or else you will die. The last person standing is the potato king/queen!
        </p> 
        </div>
        {/* <MapList/> */}
        <MapList/>
        </div>
    

)

}

export default Lobby