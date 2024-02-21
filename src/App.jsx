import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = initialGameBoard;
  let winner = null;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const activePlayer = derivedActivePlayer(gameTurns);

  for (const combination of WINNING_COMBINATIONS) {
    const boardValues = combination.map((c) => gameBoard[c.row][c.column]);
    const hasWinned =
      boardValues.every((x) => !!x) &&
      boardValues.every((x) => x === boardValues[0]);
    if (hasWinned) {
      winner = boardValues[0];
      break;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = derivedActivePlayer(gameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won {winner}!!!</p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
          hasWinned={!!winner}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
