import React, { useState, useEffect } from "react";
import { calculateWinner } from "../logic";
import { Board, Modal } from "../comp-exp";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXFirst, setIsXFirst] = useState(true);
  const [gameCounter, setGameCounter] = useState(0);
  const [playerWinCount, setPlayerWinCount] = useState([0, 0]);

  const [firstPlayerTimer, setFirstPlayerTimer] = useState(60000);
  const [secondPlayerTimer, setSecondPlayerTimer] = useState(60000);

  const winner = calculateWinner(board);

  const modalShow = (text) => {
    if (document.querySelector(".modal__title") !== undefined) {
      const modal = document.querySelector(".modal");
      const title = document.querySelector(".modal__title");

      modal.classList.add("_modal-active");
      document.querySelector(".modal__content").classList.add("_modal-content-active");
      title.innerHTML = `${text}`;
      document.querySelector(".start__btn").style.visibility = "visible";
    }
  };

  const handleClick = (index) => {
    const boardCopy = [...board];

    if (winner || boardCopy[index]) return;

    boardCopy[index] = isXFirst ? "X" : "O";

    setBoard(boardCopy);
    setIsXFirst(!isXFirst);
  };

  const checkOnDraw = () => {
    if (board.every((elem) => elem !== null)) {
      setGameCounter((prev) => prev + 1);
      document.querySelector(".start__btn").style.visibility = "hidden";
      setTimeout(() => {
        /* alert("Draw, Try again"); */

        modalShow("Draw, Try again");
      }, 2000);
    }
  };

  //Хто ходить
  const whoGoes = () => {
    const p1 = document.querySelector(".player1-stats");
    const p2 = document.querySelector(".player2-stats");

    if (isXFirst) {
      p1.classList.toggle("_player-active");
      p2.classList.toggle("_player-active");
    } else {
      p2.classList.toggle("_player-active");
      p1.classList.toggle("_player-active");
    }
  };

  const timer = (isXFirst) => {};

  useEffect(whoGoes, [isXFirst]);
  useEffect(checkOnDraw, [board]);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setGameCounter((prev) => prev + 1);
      setTimeout(() => modalShow(`Player ${(winner === "X" && 1) || (winner === "O" && 2)} Wins`), 2000);
      winner === "X" ? setPlayerWinCount((prev) => [prev[0] + 1, prev[1]]) : setPlayerWinCount((prev) => [prev[0], prev[1] + 1]);
      document.querySelector(".start__btn").style.visibility = "hidden";
    }
  }, [board]);

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setIsXFirst(true);
  };

  return (
    <>
      <Modal />
      <div className="game">
        <div className="game__counter">Total Games: {gameCounter}</div>
        <div className="player1-stats _player-active">
          <div className="player__title">Player:1</div>
          <div className="player__win-count">Wins: {playerWinCount[0]}</div>
          <div className="player__symbol">Symbol: X</div>
        </div>
        <div className="player2-stats">
          <div className="player__title">Player:2</div>
          <div className="player__win-count">Wins: {playerWinCount[1]}</div>
          <div className="player__symbol">Symbol: O</div>
        </div>
        <div className="who-goes">{`Player: ${isXFirst === true ? "1 (X)" : "2 (O)"}`}</div>
        <Board squares={board} click={handleClick} />
        <button className="start__btn" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </>
  );
};

export default Game;
