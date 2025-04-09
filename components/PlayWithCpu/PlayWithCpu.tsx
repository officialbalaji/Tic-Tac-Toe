import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [vsCPU, setVsCPU] = useState(false);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (vsCPU && !isXNext) {
      setTimeout(() => cpuMove(newBoard), 500);
    }
  };

  const cpuMove = (currentBoard) => {
    const availableMoves = currentBoard.reduce((acc, val, idx) => (val === null ? [...acc, idx] : acc), []);
    if (availableMoves.length === 0) return;
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    currentBoard[randomMove] = "O";
    setBoard([...currentBoard]);
    setIsXNext(true);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((cell, idx) => (
          <button key={idx} className="cell" onClick={() => handleClick(idx)}>
            {cell}
          </button>
        ))}
      </div>
      <div className="controls">
        <button onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }}>New Game</button>
        <button onClick={() => setVsCPU(!vsCPU)}>{vsCPU ? "Play with Friend" : "Play with CPU"}</button>
        <button onClick={() => window.location.reload()}>Quit Game</button>
      </div>
    </div>
  );
};

export default TicTacToe;
