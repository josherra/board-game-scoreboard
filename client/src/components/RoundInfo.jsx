import React from "react";

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
    <div className="round-box">
      <p>Round #{currentRound + 1}</p>
      <p># of tricks available {gameRounds[Number(currentRound)]}</p>
      {scores.map((person, index) => (
        <div
          style={{
            display: "flex",
            margin: "1rem",
            opacity: `${person.rounds[currentRound].madeBet === false ? "40%" : ""}`,
          }}
        >
          <p
            style={{
              marginRight: "1rem",
            }}
          >
            {person.name}
          </p>

          <button
            disabled={person.rounds[currentRound].bet === 0}
            onClick={() => changeBet(index, "decrease")}
            className="btn-small"
          >
            -
          </button>
          <p>{person.rounds[currentRound].bet}</p>
          <button onClick={() => changeBet(index, "increase")} className="btn-small">
            +
          </button>
          <button onClick={() => betAction("made", index)}>Made bet</button>
          <button onClick={() => betAction("not made", index)}>Did not make bet</button>
        </div>
      ))}
      <button onClick={() => setCurrentRound(currentRound - 1)} disabled={currentRound === 0}>
        Prev Round
      </button>
      {/* TODO: Fix the calculation for game rounds */}
      <button disabled={currentRound + 1 === data.rounds * 2 - 1} onClick={() => setCurrentRound(currentRound + 1)}>
        Next Round
      </button>
    </div>
  );
};
