import { useState, useEffect } from "react";
import Context from "./Context";

function ContextProvider({children}){
    const [ listOfPlayers, updateListOfPlayers ] = useState([])
    const [ token, updateToken ] = useState("")
    const [ verifiedPlayer, updateVerifiedPlayer ] = useState({})

    const getAllPlayers = async() => {
        const res = await fetch("http://localhost:3032/players")
        const data = await res.json();
        return data.data
    }

    useEffect(() => {
      getAllPlayers().then(players => {
        updateListOfPlayers(players);
      })  
    }, [])


    const state = {
        getAllPlayers,
        listOfPlayers, 
        updateListOfPlayers,
        token,
        updateToken, 
        verifiedPlayer,
        updateVerifiedPlayer
    }

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;