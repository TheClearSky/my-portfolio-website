import './App.css'
import Background from './components/Background';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
        <Background>
        {/* <div style={{zIndex:5,position:'relative',color:'#FFFFFF'}}>Children</div> */}
        <Navbar/>
        </Background>
    </>
  )
}

export default App
