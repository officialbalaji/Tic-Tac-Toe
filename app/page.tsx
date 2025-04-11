'use client';
import React, { useState } from "react";
import NewGame from "@/components/NewGame/NewGame";
import PlayWithCpu from "@/components/PlayWithCpu/PlayWithCpu";
import "./TicTacToe.css";
import Link from "next/link";

const TicTacToe = () => {
  const [showCpuGame, setShowCpuGame] = useState(false);
  const [playerNames, setPlayerNames] = useState<{ player1: string; player2: string }>({ player1: '', player2: '' });
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const isGameActive = playerNames.player1 !== '' && playerNames.player2 !== '' || showCpuGame;

  const handleCellClick = (index: number) => {
    if (!isGameActive || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win === 'X' ? playerNames.player1 : playerNames.player2);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const checkWinner = (b: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const handleStartNewGame = (p1: string, p2: string) => {
    resetGame();
    setPlayerNames({ player1: p1, player2: p2 });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setShowCpuGame(false);
    setPlayerNames({ player1: '', player2: '' });
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <br/>
      <div className="menu">
        <NewGame onStartNewGame={handleStartNewGame} />
        <button
          className="play-cpu"
          onClick={() => {
            resetGame();
            setShowCpuGame(false);
            setTimeout(() => setShowCpuGame(true), 500);
          }}
        >
          PLAY WITH CPU
        </button>
        <Link href="https://en.wikipedia.org/wiki/Tic-tac-toe">
          <button className="about">ABOUT TIC TAC TOE</button>
        </Link>
        <button className="quit-game" onClick={() => resetGame()}>QUIT GAME</button>
      </div>

      {showCpuGame ? (
        <PlayWithCpu />
      ) : (
        <div className="board">
          {board.map((cell, i) => (
            <div
              key={i}
              className={`cell ${!isGameActive ? 'disabled' : ''}`}
              onClick={() => handleCellClick(i)}
            >
              {cell}
            </div>
          ))}
        </div>
      )}

      <div className="status">
        {winner ? (
          <p>{winner === 'Draw' ? 'It’s a draw!' : `${winner} wins!`}</p>
        ) : (
          <p>
            {isGameActive ? showCpuGame?  '': `${isXTurn ? playerNames.player1 : playerNames.player2}'s Turn` : 'Select a mode to start playing'}
          </p>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
