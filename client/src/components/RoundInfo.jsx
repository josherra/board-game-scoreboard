import React, { useEffect, useState } from "react";
import { PersonRoundInfo } from "./PersonRoundInfo";

export const RoundInfo = ({ scores, currentRound, setCurrentRound, setData, data }) => {
  const [tricksCalled, setTricksCalled] = useState(0);
  const [totalTricksAvailable, setTotalTricksAvailable] = useState(0);

  useEffect(() => {
    setTricksCalled(
      data.scores.reduce((accumulator, currentValue) => accumulator + currentValue.rounds[currentRound].bet, 0)
    );

    setTotalTricksAvailable(data.gameRounds[Number(currentRound)]);
  }, [data, currentRound]);

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
      <div className="stats">
        <div className="stat">
          <div className="stat-title">Tricks Available</div>
          <div className="stat-value">{data.gameRounds[Number(currentRound)]}</div>
        </div>
        <div className={`stat ${tricksCalled > totalTricksAvailable ? "text-red-400" : ""}`}>
          <div className="stat-title">Tricks Called</div>
          <div className="stat-value">
            {tricksCalled} / {totalTricksAvailable}
          </div>
        </div>
      </div>
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
