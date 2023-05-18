import { Route, Routes } from 'react-router-dom';
import './App.css'
import Background from './components/Background';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
        <Routes>
          <Route element={<Background><Navbar/></Background>}>
            <Route path="/" element={<HomePage/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
