import {useState, useEffect, props} from  'react'
import{Link} from 'react-router-dom'


function GameCard(){
    const { game } = props;

    const [ selectedGame, setSelectedGame ] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3032/games/${game.game_id}`)
        .then(res => res.json())
        .then((data) => {
            setSelectedGame(data)
        })
    }, [])

    return (
        <div className="game-card">
            <div>
                <Link to={`games/${game.game_id}`}></Link>
            </div>
        </div>
    )
}
export default GameCard