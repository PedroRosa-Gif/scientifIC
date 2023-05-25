import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreateScientificResearch from './pages/ScientificResearch/CreateScientificResearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<SignUp />} />
        <Route path='/iniciacoes-cientificas/criar' element={<CreateScientificResearch />} />
      </Routes>
    </Router>
  );
}

export default App;
