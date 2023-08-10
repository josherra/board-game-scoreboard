import { useState } from "react";
import "./App.css";
import { GameTable } from "./components/GameTable";
import { GameStart } from "./components/GameStart";
import { RoundInfo } from "./components/RoundInfo";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [data, setData] = useState({
    rounds: "",
    players: "",
    playerNames: [],
    scores: [],
  });
  const [gameRounds, setGameRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);

  const onNewGame = () => {
    setData({
      rounds: "",
      players: "",
      playerNames: [],
    });
    setOpenGame(false);
    setNewGame(!newGame);
  };

  return (
    <div className="container mx-auto border-red-600">
      <header className="prose lg:prose-xl max-w-none">
        <h1>Up the River / Down the River</h1>
      </header>
      <main className="prose">
        <h3>Welcome back, **USER**</h3>
        <button onClick={onNewGame} className="btn">
          Start a new game
        </button>
      </main>
      {newGame && <GameStart data={data} setData={setData} setNewGame={setNewGame} setOpenGame={setOpenGame} />}
      {openGame && (
        <GameTable
          gameRounds={gameRounds}
          setGameRounds={setGameRounds}
          data={data}
          setData={setData}
          setCurrentRound={setCurrentRound}
        />
      )}
      {data.scores && data.scores.length > 0 && (
        <RoundInfo
          currentRound={currentRound}
          scores={data.scores}
          setData={setData}
          data={data}
          setCurrentRound={setCurrentRound}
          gameRounds={gameRounds}
        />
      )}
    </div>
  );
}

export default App;
