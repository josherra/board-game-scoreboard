import React from "react";
import { PersonRoundInfo } from "./PersonRoundInfo";

export const RoundInfo = ({ scores, currentRound, setCurrentRound, setData, data, gameRounds }) => {
  const changeBet = (index, type) => {
    if (type == "decrease") {
      let copy = [...data.scores];
      copy[index].rounds[currentRound].bet -= 1;
      setData({ ...data, scores: copy });
    } else if (type == "increase") {
      let copy = [...data.scores];
      copy[index].rounds[currentRound].bet += 1;
      setData({ ...data, scores: copy });
    }
  };

  const betAction = (event, index) => {
    let copy = [...data.scores];
    let round = copy[index].rounds[currentRound];

    if (event == "made") {
      round.score = round.bet ** 2 + 10;
      round.madeBet = true;
      copy[index].total += round.score;
      copy[index].rounds[currentRound] = round;
      setData({ ...data, scores: copy });
    } else {
      round.score = 0;
      round.madeBet = false;
      copy[index].rounds[currentRound] = round;
      setData({ ...data, scores: copy });
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <h1 className="text-3xl text-center">Round #{currentRound + 1}</h1>
      <p># of tricks available {gameRounds[Number(currentRound)]}</p>
      {scores.map((person, index) => (
        <PersonRoundInfo
          person={person}
          currentRound={currentRound}
          changeBet={changeBet}
          betAction={betAction}
          index={index}
        />
      ))}
      <div>
        <button
          className="btn btn-sm btn-neutral my-4"
          onClick={() => setCurrentRound(currentRound - 1)}
          disabled={currentRound === 0}
        >
          Prev Round
        </button>
        {/* TODO: Fix the calculation for game rounds */}
        <button
          className="btn btn-sm btn-neutral my-4"
          disabled={currentRound + 1 === data.rounds * 2 - 1}
          onClick={() => setCurrentRound(currentRound + 1)}
        >
          Next Round
        </button>
      </div>
    </div>
  );
};
