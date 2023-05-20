import { Route, Routes } from 'react-router-dom';
import './App.css'
import Background from './components/Background';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
        <Routes>
          <Route element={<Background><Navbar/></Background>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/projects" element={<ProjectsPage/>} />
            <Route path="/skills" element={<SkillsPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
