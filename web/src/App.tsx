import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
