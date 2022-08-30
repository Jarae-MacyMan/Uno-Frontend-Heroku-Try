import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import Lobby from './pages/main';
import WaitingRoom from './pages/gameLobby';
// import gameSocket from './multiPlayer/dist/server.dev';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/' element={<Login />}/> 
        {/* <Route exact path='/game' element={<Game></Game>}/> */}
        <Route exact path='/home' element={<Lobby></Lobby>}/> 
        <Route path='Waiting-Room/:id' element={<WaitingRoom></WaitingRoom>}/>
        {/* <Route  path='/game' element={<gameSocket />}/> */}
      </Routes>
    </Router>
  );
}

export default App;
