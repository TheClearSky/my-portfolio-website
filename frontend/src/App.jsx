import './App.css'
import Background from './components/Background';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
        <Background>
        <Navbar/>
        <HomePage/>
        </Background>
    </>
  )
}

export default App
