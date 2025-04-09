'use client';
import React, { useState } from 'react';
import './NewGame.css';

const NewGame = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [pl1, setPl1] = useState('');
  const [pl2, setPl2] = useState('');

  const handleNewGameClick = () => {
    setShowPopup(true);
  };
  const handleNewGameClose = () => {
    setShowPopup(false);
  };
  const handleOKClick = () => {
    const player1 = document.getElementById("player-1");
    const player2 = document.getElementById("player-2");

    if (player1) player1.innerHTML = pl1;
    if (player2) player2.innerHTML = pl2;

    setShowPopup(false);
  };

  return (
    <>
      <button className="new-game" onClick={handleNewGameClick}>NEW GAME</button>

      {showPopup && (
        <div className="popup-overlay"> 
          <div className="new-game-popup">
          <button className="close-pop-up" onClick={handleNewGameClose}>X</button>
            <label>Name of the Players</label>
            <label>Player 1</label>
            <input type="text" value={pl1} onChange={(e) => setPl1(e.target.value)} />
            <label>Player 2</label>
            <input type="text" value={pl2} onChange={(e) => setPl2(e.target.value)} />
            <button className="pop-up-button" onClick={handleOKClick}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewGame;
