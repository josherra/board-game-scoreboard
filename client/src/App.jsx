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
  const [hideScorecard, setHideScorecard] = useState(true);

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
    <div className="container mx-auto border-red-600 p-4">
      <header className="text-center prose lg:prose-xl max-w-none">
        <h1>Up the River / Down the River</h1>
      </header>
      <main className="p-4">
        <div className="flex justify-center">
          <button className="btn" onClick={onNewGame}>
            Start a new game
          </button>
          {openGame && (
            <button className="btn" onClick={() => setHideScorecard(!hideScorecard)}>
              {hideScorecard ? "Show" : "Hide"} Scorecard
            </button>
          )}
        </div>
        {newGame && <GameStart data={data} setData={setData} setNewGame={setNewGame} setOpenGame={setOpenGame} />}
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
        {openGame && (
          <GameTable
            currentRound={currentRound}
            gameRounds={gameRounds}
            setGameRounds={setGameRounds}
            data={data}
            setData={setData}
            setCurrentRound={setCurrentRound}
            hideScorecard={hideScorecard}
          />
        )}
      </main>
    </div>
  );
}

export default App;
