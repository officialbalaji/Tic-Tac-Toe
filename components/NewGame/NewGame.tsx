'use client';
import React, { useState } from 'react';
import './NewGame.css';

type NewGameProps = {
  onStartNewGame: (player1: string, player2: string) => void;
};

const NewGame: React.FC<NewGameProps> = ({ onStartNewGame }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [pl1, setPl1] = useState('');
  const [pl2, setPl2] = useState('');

  const handleNewGameClick = () => setShowPopup(true);
  const handleNewGameClose = () => setShowPopup(false);

  const handleOKClick = () => {
    if (pl1.trim() && pl2.trim()) {
      onStartNewGame(pl1, pl2);
      setShowPopup(false);
    } else {
      alert("Please enter names for both players.");
    }
  };

  return (
    <>
      <button className="new-game" onClick={handleNewGameClick}>NEW GAME</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="new-game-popup">
            <button className="close-pop-up" onClick={handleNewGameClose}>
              <label className="close-pop-value">X</label>
            </button>
            <h3>Name of the Players</h3>
            <label>Player 1</label>
            <input type="text" onChange={(e) => setPl1(e.target.value)} />
            <label>Player 2</label>
            <input type="text" onChange={(e) => setPl2(e.target.value)} />
            <button className="pop-up-button" onClick={handleOKClick}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewGame;
