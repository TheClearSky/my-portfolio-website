import './App.css'
import Background from './components/Background';
import Navbar from './components/Navbar';
import RowContainer from './components/RowContainer';
import Canvas3D from './components/Canvas3D';
import NameCard from './components/NameCard';

function App() {
  return (
    <>
        <Background>
        <Navbar/>
        <RowContainer>
          <Canvas3D/>
          <NameCard/>
        </RowContainer>
        </Background>
    </>
  )
}

export default App
