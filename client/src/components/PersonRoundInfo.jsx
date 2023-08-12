import React from "react";

export const PersonRoundInfo = ({ person, currentRound, changeBet, betAction, index }) => {
  return (
    <div className="flex border-2 p-4 items-center">
      <p>{person.name}</p>

      <button
        className="btn-sm btn-circle bg-gray-400 text-black disabled:bg-gray-700"
        disabled={person.rounds[currentRound].bet === 0}
        onClick={() => changeBet(index, "decrease")}
      >
        -
      </button>
      <p>{person.rounds[currentRound].bet}</p>
      <button
        className="btn-sm btn-circle bg-gray-400 text-black disabled:bg-gray-700"
        onClick={() => changeBet(index, "increase")}
      >
        +
      </button>
      <button onClick={() => betAction("made", index)}>Made bet</button>
      <button onClick={() => betAction("not made", index)}>Did not make bet</button>
    </div>
  );
};
