import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignUp></SignUp>}/>
        <Route exact path='/login' element={<Login></Login>}/>
      </Routes>
    </Router>
  );
}

export default App;
