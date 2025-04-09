'use client';
import React, { useState } from "react";
import NewGame from "@/components/NewGame/NewGame";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [disabledCells, setDisabledCells] = useState<number[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const cellId = Number((event.target as HTMLElement).getAttribute('data-id'));
    if (cellId && !disabledCells.includes(cellId)) {
      alert(`You clicked cell ${cellId}`);
      setDisabledCells(prev => [...prev, cellId]);
    }
  };

  return (
    <div className="game-container">
      <div className="menu">
        <NewGame />
        <button className="play-cpu">PLAY WITH CPU</button>
        <button className="about">ABOUT TIC TAC TOE</button>
        <button className="quit-game">QUIT GAME</button>
      </div>
      <div className="board">
        {[...Array(9)].map((_, i) => {
          const id = i + 1;
          const isDisabled = disabledCells.includes(id);
          return (
            <div
              key={id}
              data-id={id}
              className={`cell ${isDisabled ? "disabled" : ""}`}
              onClick={!isDisabled ? handleClick : undefined}
            >
              {isDisabled ? "X" : ""}
            </div>
          );
        })}
      </div>
      <div className="status">
        <p id="player-1"></p> 
        <p id="player-2"></p>
      </div>


    </div>
  );
};

export default TicTacToe;
