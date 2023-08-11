import React, { useEffect, useState } from "react";

export const GameTable = ({ data, setData, gameRounds, setGameRounds, setCurrentRound }) => {
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
        total: 0,
      };

      roundsArray.forEach((round) => {
        object.rounds.push({ round: round, bet: 0, score: 0, madeBet: null });
      });

      tempGameData.push(object);
    });

    setData({ ...data, scores: tempGameData });
    setCurrentRound(0);
  };

  useEffect(() => {
    createGameInfo(data);
  }, []);

  return (
    <div className="border-2 overflow-x-auto">
      <div className="flex">
        <button className="btn" onClick={() => setHideScorecard(!hideScorecard)}>
          {hideScorecard ? "Show" : "Hide"} Scorecard
        </button>
      </div>
      {!hideScorecard && (
        <table className="table table-zebra md:table-md sm:table-xs">
          <thead>
            <tr>
              <td>Round</td>
              {data.playerNames.map((person) => (
                <td>{person}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.scores &&
              gameRounds.map((round, roundIndex) => (
                <tr key={roundIndex}>
                  <td>{round}</td>
                  {data.scores.map((person, index) => (
                    <>
                      <td>
                        {data.scores[index].rounds[roundIndex].bet} // {data.scores[index].total}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
