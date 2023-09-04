import React from "react";
import { PersonRoundInfo } from "./PersonRoundInfo";

export const RoundInfo = ({ scores, currentRound, setCurrentRound, setData, data }) => {
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
    let previousRound = copy[index].rounds[currentRound - 1];

    if (event == "made") {
      round.score = round.bet ** 2 + 10;
      round.madeBet = true;
      previousRound ? (round.score += previousRound.score) : +0;
      copy[index].rounds[currentRound] = round;
      copy[index].total = round.score;
      setData({ ...data, scores: copy });
    } else {
      round.score = 0;
      previousRound ? (round.score += previousRound.score) : +0;
      round.madeBet = false;
      copy[index].rounds[currentRound] = round;
      copy[index].total = round.score;
      setData({ ...data, scores: copy });
    }
  };

  return (
    <div className="flex flex-col mt-4 items-center">
      <h1 className="md:text-3xl sm:text-xl text-center">Round #{data.gameRounds[Number(currentRound)]}</h1>
      <div className="flex justify-center flex-wrap gap-4 my-4">
        {scores.map((person, index) => (
          <PersonRoundInfo
            key={index}
            data={data}
            person={person}
            currentRound={currentRound}
            changeBet={changeBet}
            betAction={betAction}
            index={index}
          />
        ))}
      </div>
      <div>
        <button
          className="btn btn-sm btn-neutral my-4"
          onClick={() => setCurrentRound(currentRound - 1)}
          disabled={currentRound === 0}
        >
          Prev Round
        </button>
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
