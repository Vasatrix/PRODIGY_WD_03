import React from 'react';
import './Modal.css';

const Modal = ({ winner, onRestart }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>{winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`}</h2>
      <button onClick={onRestart}>Restart</button>
    </div>
  </div>
);

export default Modal;
