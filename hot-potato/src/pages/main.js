import NavbarFunc from "./navbar"
import '../style/lobby.css'

import React, { useContext, useEffect, useState } from 'react'
import Context from "../context/Context"
import MapCard from "../components/MapCard"


const Lobby = () =>{
  return(
    <div>
       <NavbarFunc/>
      <div className="heading">
       <h2>WELCOME TO UNO</h2>
        <p className="text"> Explore our map with friends while trying to beat the potato bomb. Dont get caught with the potato at the wrong time or else you will die. The last person standing is the potato king/queen!</p> 
      </div>
      <MapCard/>
    </div>
  )
}

export default Lobby