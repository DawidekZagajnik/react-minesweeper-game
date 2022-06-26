import './App.css';
import Tile from "./components/Tile";
import GamePane from './components/GamePane';

function App() {
  return (
    <div className="App">
      <div style={{marginTop: 500, marginLeft: 500}}>
        <GamePane />
      </div>
    </div>
  );
}

export default App;
