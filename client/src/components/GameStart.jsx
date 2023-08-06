import React, { useState } from "react";

export const GameStart = ({ data, setData, setNewGame, setOpenGame }) => {
  const [players, setPlayers] = useState([]);
  const [playerNames, setPlayerNames] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  const onChangePlayerCount = (e) => {
    setData({ ...data, players: Number(e.target.value) });
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

    setData({ ...data, playerNames: namesArray });
  };

  return (
    <form className="game-start" onSubmit={handleSubmit}>
      <label htmlFor="rounds">How many cards are we going up to?</label>
      <input
        onChange={handleChange}
        value={data.rounds}
        id="rounds"
        name="rounds"
        type="number"
      />
      <label htmlFor="players">How many players?</label>
      <input
        onChange={onChangePlayerCount}
        value={data.players}
        id="players"
        name="players"
        type="number"
        min={1}
        max={4}
      />
      {/* TODO: Clean this up */}
      {players &&
        players.map((player) => (
          <div key={player} style={{ display: "flex" }}>
            <label htmlFor={`player${player}`} style={{ marginRight: "1rem" }}>
              Player {player + 1}
            </label>
            <input
              onChange={addPlayers}
              name={`player${player}`}
              id={`player${player}`}
              placeholder={`Player #${player + 1}`}
            />
          </div>
        ))}
      <button type="submit">Start</button>
    </form>
  );
};
