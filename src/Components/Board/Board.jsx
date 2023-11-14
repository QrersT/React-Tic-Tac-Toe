import React, { useContext } from "react";
import { Square } from "../comp-exp";
import { Context } from "../../App";
const Board = ({ squares, click }) => {
  const { gameCounter, setGameCounter } = useContext(Context);
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => {
            click(i);
          }}
        />
      ))}
    </div>
  );
};

export default Board;
