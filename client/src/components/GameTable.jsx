import React, { useEffect, useState } from "react";

export const GameTable = ({
  data,
  setData,
  gameRounds,
  setGameRounds,
  setCurrentRound,
  hideScorecard,
  currentRound,
}) => {
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

  const filteredRounds = gameRounds.slice(0, currentRound + 1);

  useEffect(() => {
    createGameInfo(data);
  }, []);

  return (
    <div className="mt-4 overflow-x-auto">
      {!hideScorecard && (
        <table className="table-zebra md:table-md sm:table-xs table-xs w-full shadow-sm shadow-slate-300">
          <thead>
            <tr className="sm:text-sm text-left">
              <td>Round</td>
              {data.playerNames.map((person) => (
                <td key={person}>{person}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.scores &&
              filteredRounds.map((round, roundIndex) => (
                <tr key={roundIndex}>
                  <td>{round}</td>
                  {data.scores.map((person, index) => (
                    <>
                      <td>
                        <span
                          className={`${
                            data.scores[index].rounds[roundIndex].madeBet === false ? "line-through opacity-40" : ""
                          } `}
                        >
                          {data.scores[index].rounds[roundIndex].bet}
                        </span>{" "}
                        | {data.scores[index].rounds[roundIndex].score}
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
