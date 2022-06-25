import './App.css';
import Tile from "./components/Tile";

function App() {
  return (
    <div className="App">
      <div style={{marginTop: 500, marginLeft: 500, display: "flex", flexDirection: "row"}}>
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div style={{marginLeft: 500, display: "flex", flexDirection: "row"}}>
        <Tile revealed={true} value={0}/>
        <Tile revealed={true} value={1}/>
        <Tile revealed={true} value={2}/>
        <Tile revealed={true} value={3}/>
        <Tile revealed={true} value={4}/>
        <Tile revealed={true} value={5}/>
        <Tile revealed={true} value={6}/>
        <Tile revealed={true} value={7}/>
        <Tile revealed={true} value={8}/>
        <Tile />
        <Tile />
      </div>
    </div>
  );
}

export default App;
