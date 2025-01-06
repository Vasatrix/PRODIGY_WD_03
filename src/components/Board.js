import React, { useState } from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ setWinner }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [strikePosition, setStrikePosition] = useState(null);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Set strike position based on the winning line
        const strikeClasses = [
          'row-1', 'row-2', 'row-3', // Rows
          'col-1', 'col-2', 'col-3', // Columns
          'diag-1', 'diag-2',        // Diagonals
        ];
        setStrikePosition(strikeClasses[i]);
        return { winner: board[a], line: [a, b, c] };
      }
    }

    return board.includes(null) ? null : { winner: 'Draw', line: [] };
  };

  const handleClick = (index) => {
    if (board[index] || strikePosition) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
    }
  };

  return (
    <div className="board">
      <div className={`strike ${strikePosition || ''}`} />
      {board.map((value, index) => (
        <Square key={index} value={value} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Board;

