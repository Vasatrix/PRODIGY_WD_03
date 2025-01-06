import React, { useState } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [winner, setWinner] = useState(null);
  const [gameKey, setGameKey] = useState(0); // Unique key to reset the board

  const handleRestart = () => {
    setWinner(null);
    setGameKey((prevKey) => prevKey + 1); // Increment key to force Board re-render
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board key={gameKey} setWinner={setWinner} />
      {winner && <Modal winner={winner} onRestart={handleRestart} />}
    </div>
  );
}

export default App;

