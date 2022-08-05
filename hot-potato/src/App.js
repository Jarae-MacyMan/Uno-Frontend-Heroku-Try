import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';
import CreateGame from './pages/createGame';
import JoinGame from './pages/joinGame';
import SocketTest from './components/SocketTest';
import Start from './pages/start';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/socket' element={<SocketTest></SocketTest>}/>
        <Route exact path='/' element={<Start></Start>} />
        <Route exact path='/signup' element={<SignUp></SignUp>}/>
        <Route exact path='/login' element={<Login></Login>}/>
        <Route exact path='/create' element={<CreateGame></CreateGame>}/>
        <Route exact path='/join' element={<JoinGame></JoinGame>}/>
      </Routes>
    </Router>
  );
}

export default App;
