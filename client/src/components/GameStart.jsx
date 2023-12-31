import React, { useState } from "react";

export const GameStart = ({ createGameInfo, setNewGame, setOpenGame }) => {
  const [players, setPlayers] = useState([]);
  const [playerNames, setPlayerNames] = useState({});
  const [localData, setLocalData] = useState({ rounds: "", players: "" });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: Number(e.target.value) });
  };

  const onChangePlayerCount = (e) => {
    setLocalData({ ...localData, players: Number(e.target.value), rounds: "" });
    const newArray = Array.from(Array(Number(e.target.value)).keys());
    setPlayers(newArray);
  };

  const addPlayers = (e) => {
    setPlayerNames({ ...playerNames, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewGame(false);
    setOpenGame(true);

    let namesArray = [];

    Object.values(playerNames).forEach((name) => {
      namesArray.push(name);
    });

    createGameInfo(localData, namesArray);
  };

  return (
    <form className="mt-4 p-4 flex flex-col max-w-lg w-full self-start" onSubmit={handleSubmit}>
      <label htmlFor="players">How many players?</label>
      <input
        className="input input-bordered input-m max-w-xs rounded my-4"
        onChange={onChangePlayerCount}
        value={localData.players}
        id="players"
        name="players"
        type="number"
        min={1}
        max={26}
      />
      <label htmlFor="rounds">How many tricks are we going up to?</label>
      <input
        className="input input-bordered input-m max-w-xs rounded my-4"
        onChange={handleChange}
        value={localData.rounds}
        id="rounds"
        name="rounds"
        type="number"
        min={1}
        max={localData.players ? Math.floor(52 / localData.players) : 26}
      />
      {/* TODO: Clean this up */}
      {players &&
        players.map((player) => (
          <div key={player}>
            <label htmlFor={`player${player}`}>Player {player + 1}</label>
            <input
              className="input input-bordered input-sm max-w-xs rounded my-4 mx-2"
              onChange={addPlayers}
              name={`player${player}`}
              id={`player${player}`}
              placeholder={`Player #${player + 1}`}
            />
          </div>
        ))}
      <button className="btn w-52" type="submit">
        Start
      </button>
    </form>
  );
};
