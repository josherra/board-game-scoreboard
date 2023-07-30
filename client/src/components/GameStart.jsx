import React from "react";

export const GameStart = ({ data, setData, setNewGame, setOpenGame }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewGame(false);
    setOpenGame(true);
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
        onChange={handleChange}
        value={data.players}
        id="players"
        name="players"
        type="number"
      />
      <button type="submit">Start</button>
    </form>
  );
};
