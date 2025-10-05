import React, { useState } from 'react';
import './styles.css';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const computeWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6], 
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      } 
    }
    if (squares.every(square => square != null)) {
      return "It's a Draw!"
    }
    return null;
  };

  const winner = computeWinner(squares);
  const status = winner === "It's a Draw!" ? "It's a Draw!" :
                 winner ? `Winner: ${winner}` :
                 `Next player: ${isX ? "X" : "O"}`;
  
  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = [...squares];
    newSquares[index] = isX ? "X" : "O";
    setSquares(newSquares);
    setIsX(!isX);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsX(true);
  }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <p className="status">{status}</p>
      <div className="board-container">
        {squares.map((square, index) => (
          <button key={index} className="square" onClick={() => handleClick(index)}>{square}</button>
        ))}
      </div>
        <button id="reset"onClick={handleReset}>Reset</button>
        <p></p>
    </div>
  );
}  

export default function App() {
  return <Board />;
}