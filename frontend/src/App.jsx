import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Background from './components/Background';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import OverlayScrollbar from './components/OverlayScrollbar';

function App() {
  return (
    <>
        <Routes>
          <Route element={<Background><Navbar/></Background>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/projects" element={<ProjectsPage/>} />
            {/* The skills page is gone; old links land on the home page. */}
            <Route path="/skills" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<ContactPage/>} />
          </Route>
        </Routes>
        <OverlayScrollbar />
    </>
  )
}

export default App
