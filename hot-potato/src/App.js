import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import SocketTest from './components/SocketTest';
// import Game from './game'
import Lobby from './pages/main';
import WaitingRoom from './pages/gameLobby';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path='/socket' element={<SocketTest></SocketTest>}/> */}
        {/* <Route exact path='/' element={<Start></Start>} /> */}
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/' element={<Login />}/> 
        {/* <Route exact path='/create' element={<CreateGame></CreateGame>}/> */}
        {/* <Route exact path='/game' element={<Game></Game>}/> */}
        <Route exact path='/home' element={<Lobby></Lobby>}/> 
        <Route path='room/:id' element={<WaitingRoom></WaitingRoom>}/>
      </Routes>
    </Router>
  );
}

export default App;
