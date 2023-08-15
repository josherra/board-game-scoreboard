import { useEffect, useState } from "react";
import "./App.css";
import { GameTable } from "./components/GameTable";
import { GameStart } from "./components/GameStart";
import { RoundInfo } from "./components/RoundInfo";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [data, setData] = useState({});
  const [gameRounds, setGameRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [hideScorecard, setHideScorecard] = useState(true);

  const onNewGame = () => {
    setData({
      rounds: "",
      players: "",
    });
    setOpenGame(false);
    setNewGame(!newGame);
  };

  useEffect(() => {
    const foundData = JSON.parse(localStorage.getItem("data"));
    if (Number(foundData.rounds) > 0) {
      setData(foundData);
      setOpenGame(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  /**
   * Create the game info for each player.
   * @param {*} data
   * @returns {Array}
   */
  const createGameInfo = async (data, playerNames) => {
    let tempGameData = [];
    let roundsArray = [];

    for (let i = 1; i <= data.rounds; i++) {
      roundsArray.push(i);
    }

    let copy = [...roundsArray];
    copy.reverse();
    copy.shift();

    roundsArray = [...roundsArray, ...copy];

    playerNames.forEach((name) => {
      let object = {
        name: name,
        rounds: [],
        total: 0,
      };

      roundsArray.forEach((round) => {
        object.rounds.push({ round: round, bet: 0, score: 0, madeBet: null });
      });

      tempGameData.push(object);
    });

    setData({ ...data, scores: tempGameData, gameRounds: roundsArray });
    setCurrentRound(0);
  };

  return (
    <div className="md:container mx-auto border-red-600 p-4">
      <header className="text-center prose lg:prose-xl sm:prose-h1 max-w-none">
        <h1>Up the River / Down the River</h1>
      </header>
      <main className="p-4 flex flex-col items-center">
        <button className="btn mt-8 w-[300px]" onClick={onNewGame}>
          Start a new game
        </button>
        {newGame && (
          <GameStart
            createGameInfo={createGameInfo}
            data={data}
            setData={setData}
            setNewGame={setNewGame}
            setOpenGame={setOpenGame}
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
        {openGame && (
          <>
            <button className="btn" onClick={() => setHideScorecard(!hideScorecard)}>
              {hideScorecard ? "Show" : "Hide"} Scorecard
            </button>
            <GameTable currentRound={currentRound} data={data} hideScorecard={hideScorecard} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
