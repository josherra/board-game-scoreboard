import React, { useEffect, useState } from "react";

export const GameTable = ({ data }) => {
  const [gameData, setGameData] = useState([]);
  const [gameRounds, setGameRounds] = useState([]);
  const [hideScorecard, setHideScorecard] = useState(true);

  /**
   * Create the game info for each player.
   * @param {*} data
   * @returns {Array}
   */
  const createGameInfo = async (data) => {
    let tempGameData = [];
    let roundsArray = [];

    for (let i = 1; i <= data.rounds; i++) {
      roundsArray.push(i);
    }

    let copy = [...roundsArray];
    copy.reverse();
    copy.shift();

    roundsArray = [...roundsArray, ...copy];

    setGameRounds([...roundsArray]);

    data.playerNames.forEach((name) => {
      let object = {
        name: name,
        rounds: [],
      };

      roundsArray.forEach((round) => {
        object.rounds.push({ round: round, bet: null, score: 0 });
      });

      tempGameData.push(object);
    });

    setGameData(tempGameData);
  };

  useEffect(() => {
    createGameInfo(data);
  }, []);

  return (
    <>
      <button
        className="btn btn-cyan"
        onClick={() => setHideScorecard(!hideScorecard)}
      >
        {hideScorecard ? "Show" : "Hide"} Scorecard
      </button>
      {!hideScorecard && (
        <table className="table">
          <thead>
            <tr>
              <td>Round</td>
              {data.playerNames.map((person) => (
                <td style={{ background: "green" }}>{person}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {gameData &&
              gameRounds.map((round, roundIndex) => (
                <tr key={roundIndex}>
                  <td>{round}</td>
                  {gameData.map((person, index) => (
                    <td>{gameData[index].rounds[roundIndex].bet}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};
