import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import Lobby from './pages/main';
import Game from './pages/unoGame.js';
import SocketTest from './components/SocketTest';
// import gameSocket from './multiPlayer/dist/server.dev';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/' element={<Login />}/> 
        {/* <Route exact path='/game' element={<Game></Game>}/> */}
        <Route exact path='/home' element={<Lobby/>}/> 
        <Route  path='/play' exact element={<Game/>}/>
        {/* <Route  path='/game' element={<gameSocket />}/> */}
        {/* <Route path='game' element={<SocketTest></SocketTest>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
