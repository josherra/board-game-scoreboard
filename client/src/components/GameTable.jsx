import React from "react";

export const GameTable = ({ data, hideScorecard, currentRound }) => {
  const filteredRounds = data.gameRounds.slice(0, currentRound + 1);

  return (
    <div className="mt-4 overflow-x-auto">
      {!hideScorecard && (
        <table className="table-zebra md:table-md sm:table-xs table-xs w-full shadow-sm shadow-slate-300">
          <thead>
            <tr className="sm:text-sm text-left">
              <td>Round</td>
              {data.scores.map((person) => (
                <td key={person.name}>{person.name}</td>
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
