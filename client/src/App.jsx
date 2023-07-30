import { useState } from "react";
import "./App.css";
import { GameTable } from "./components/GameTable";
import { GameStart } from "./components/GameStart";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [data, setData] = useState({
    rounds: "",
    players: "",
    playerNames: ["XX", "XY", "ZZZ", "YZZ"],
  });

  const onNewGame = () => {
    setData({
      rounds: "",
      players: "",
      playerNames: ["XX", "XY", "ZZZ", "YZZ"],
    });
    setOpenGame(false);
    setNewGame(!newGame);
  };

  return (
    <>
      <header className="header">
        <h1>Up the River / Down the River</h1>
      </header>
      <main className="main">
        <h3>Welcome back, **USER**</h3>
        <button onClick={onNewGame} className="btn">
          Start a new game
        </button>
      </main>
      {newGame && (
        <GameStart
          data={data}
          setData={setData}
          setNewGame={setNewGame}
          setOpenGame={setOpenGame}
        />
      )}
      {openGame && <GameTable data={data} />}
    </>
  );
}

export default App;
