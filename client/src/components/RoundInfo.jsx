import React from "react";

export const RoundInfo = ({
  scores,
  currentRound,
  setCurrentRound,
  setData,
  data,
}) => {
  console.log(scores);

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

  return (
    <div className="round-box">
      <p>Round {currentRound + 1}</p>
      {scores.map((person, index) => (
        <div style={{ display: "flex", margin: "1rem" }}>
          <p style={{ marginRight: "1rem" }}>{person.name}</p>

          <button
            onClick={() => changeBet(index, "decrease")}
            className="btn btn-small"
          >
            -
          </button>
          <p>{person.rounds[currentRound].bet}</p>
          <button
            onClick={() => changeBet(index, "increase")}
            className="btn btn-small"
          >
            +
          </button>
        </div>
      ))}
      <button
        onClick={() => setCurrentRound(currentRound + -1)}
        disabled={currentRound === 0}
      >
        Prev Round
      </button>
      {/* TODO: Fix the calculation for game rounds */}
      <button
        disabled={currentRound + 1 === data.rounds * 2 - 1}
        onClick={() => setCurrentRound(currentRound + 1)}
      >
        Next Round
      </button>
    </div>
  );
};
