import React from "react";

export const PersonRoundInfo = ({ person, currentRound, changeBet, betAction, index }) => {
  return (
    <div
      className={`card p-4 w-[200px] justify-center items-center gap-4 shadow-md shadow-slate-700 ${
        person.rounds[currentRound].madeBet === false
          ? "shadow-red-400"
          : person.rounds[currentRound].madeBet === true
          ? "shadow-green-400"
          : ""
      }`}
    >
      <p className="card-title">{person.name}</p>
      <div className="flex justify-between gap-4">
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
          disabled={person.rounds[currentRound].bet === person.rounds[currentRound].round}
          onClick={() => changeBet(index, "increase")}
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <button className="btn-sm btn btn-primary" onClick={() => betAction("made", index)}>
          Made bet
        </button>
        <button className="btn-sm btn btn-error" onClick={() => betAction("not made", index)}>
          Did not make bet
        </button>
      </div>
    </div>
  );
};
