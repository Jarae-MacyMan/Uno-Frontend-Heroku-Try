import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import CreateGame from './pages/createGame';
import JoinGame from './pages/joinGame';
import SocketTest from './components/SocketTest';
import Start from './pages/start';
import Game from './game'
import Lobby from './pages/main';
import WaitingRoom from './pages/gameLobby';

function App() {
  return (
    <div>
      
   {/* <Login></Login> */}
    <Router>
      <Routes>
        <Route exact path='/socket' element={<SocketTest></SocketTest>}/>
        <Route exact path='/' element={<Start></Start>} />
         <Route exact path='/signup' element={<SignUp></SignUp>}/>
        <Route exact path='/login' element={<Login></Login>}/> 
        <Route exact path='/create' element={<CreateGame></CreateGame>}/>
        <Route exact path='/join' element={<JoinGame></JoinGame>}/>
         <Route exact path='/game' element={<Game></Game>}/>
         <Route exact path='/home' element={<Lobby></Lobby>}/> 
         <Route exact path='/room' element={<WaitingRoom></WaitingRoom>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
