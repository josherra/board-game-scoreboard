export const GameButton = ({ data, setData, setOpenGame, setNewGame, newGame }) => {
  /**
   * Starts a new game after clicking the button. Checks to see if a game is currently in progress, and makes the user click a confirmation dialog if one is.
   */
  const onNewGame = () => {
    if (Object.keys(data).length == 0 || window.confirm("Are you sure you want to start a new game?")) {
      localStorage.removeItem("data");
      setData({});
      setOpenGame(false);
      setNewGame(!newGame);
    }
  };

  return (
    <button className="btn mt-8 w-[300px]" onClick={onNewGame}>
      Start a new game
    </button>
  );
};
