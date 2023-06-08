import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) description = "Go to move #" + move;
    else description = "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) status = "Winner: " + winner;
  else status = "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(index) {
    if (winner || squares[index]) return;
    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[index] = "X";
    else nextSquares[index] = "O";
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        ></Square>
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        ></Square>
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        ></Square>
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        ></Square>
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        ></Square>
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        ></Square>
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        ></Square>
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < winningCombinations.length; index++) {
    const [a, b, c] = winningCombinations[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
