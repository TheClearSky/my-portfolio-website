import './App.css'
import Background from './components/Background';

function App() {
  return (
    <>
        <Background>
        <div style={{zIndex:5,position:'relative',color:'#FFFFFF'}}>Children</div>
        </Background>
    </>
  )
}

export default App
