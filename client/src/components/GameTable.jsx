import React, { useEffect, useState } from "react";

export const GameTable = ({ data }) => {
  const [gameData, setGameData] = useState([]);
  const [gameRounds, setGameRounds] = useState([]);

  /**
   * Generate the structure for the rounds.
   * @param {*} rounds
   * @returns {Array}
   */
  const generateRounds = (rounds) => {
    let roundsArray = [];

    for (let i = 1; i <= rounds; i++) {
      roundsArray.push(i);
    }

    let copy = [...roundsArray];
    copy.reverse();
    copy.shift();

    roundsArray = [...roundsArray, ...copy];

    setGameRounds([...roundsArray]);
    return roundsArray;
  };

  /**
   * Create the game info for each player.
   * @param {*} data
   * @returns {Array}
   */
  const createGameInfo = (data, rounds) => {
    let tempGameData = [];

    data.playerNames.forEach((name) => {
      let object = {
        name: name,
        rounds: [],
      };

      rounds.forEach((round) => {
        object.rounds.push({ round: round, bet: null, score: 0 });
      });

      tempGameData.push(object);
    });

    return tempGameData;
  };

  useEffect(() => {
    generateRounds(data.rounds);
    let response = createGameInfo(data, gameRounds);
    setGameData(response);
  }, []);

  return (
    <div className="table">
      {gameRounds.map((round) => (
        <p>{round}</p>
      ))}
    </div>
  );
};
