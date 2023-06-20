import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import ICsPage from './pages/ICsPage';
import CreateScientificResearch from './pages/ScientificResearch/CreateScientificResearch';
import ScientificResearchApplications from './pages/ScientificResearch/ScientificResearchApplications';
import OnGoingScientificResearch from './pages/ScientificResearch/OnGoingScientificResearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<SignUp />} />
        <Route path='/perfil' element={<Profile />} />
        <Route path='/iniciacoes-cientificas' element={<ICsPage />} />
        <Route path='/iniciacoes-cientificas/minhas/:idResearch' element={<OnGoingScientificResearch />} />
        <Route path='/iniciacoes-cientificas/criar' element={<CreateScientificResearch />} />
        <Route path='/iniciacoes-cientificas/candidaturas/:idResearch' element={<ScientificResearchApplications />} />
      </Routes>
    </Router>
  );
}

export default App;
