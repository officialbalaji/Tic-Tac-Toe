import React, { useEffect, useState } from "react";

const PlayWithCpu = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false); // CPU always starts
  const [gameKey, setGameKey] = useState(0); // to force re-render and retrigger useEffect

  useEffect(() => {
    if (!isXNext && !calculateWinner(board) && board.includes(null)) {
      const timeout = setTimeout(() => cpuMove(board), 300);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, board, gameKey]);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board) || !isXNext) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  const cpuMove = (currentBoard: (string | null)[]) => {
    if (calculateWinner(currentBoard)) return;

    let newBoard = [...currentBoard];
    let move = -1;

    // Random first move if board is empty
    if (newBoard.every(cell => cell === null)) {
      const availableMoves = newBoard
        .map((_, i) => i)
        .filter(i => newBoard[i] === null);
      move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
      move = findBestMove(newBoard);
    }

    if (move !== -1) {
      newBoard[move] = "O";
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  const calculateWinner = (squares: (string | null)[]) => {
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

  const findBestMove = (board: (string | null)[]) => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };

  const minimax = (board: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = calculateWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return bestScore;
    }
  };

  const winner = calculateWinner(board);
  
  const status = winner
  
    ? `Winner: ${winner}`
    : board.every(cell => cell !== null)
    ? "Draw!"
    : `Next player: ${isXNext ? "X (You)" : "O (CPU)"}`;
    return (
      <div className="game">
        
        <div className="board">
          {board.map((cell, idx) => (
            <button
              key={idx}
              className="cell"
              onClick={() => handleClick(idx)}
              disabled={!!cell || !isXNext || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>
        <div id="status" className="status">
          {status}
        </div>
      </div>
      
    );
    
};

export default PlayWithCpu;
