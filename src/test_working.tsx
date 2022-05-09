import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import pgn from "./pgn/example_pgn.pgn?raw";

var stockfish = new Worker("src/lib/stockfish.js");

stockfish.addEventListener("message", function (e) {
  console.log(e.data);

  const a: String = e.data;

  if (a.startsWith("bestmove")) {
    console.log(a.split("bestmove"));
  }
});

const PlayRandomMoveEngine = () => {
  const [game, setGame] = useState(new Chess());
  const [undoCount, setUndoCount] = useState(0);
  let [initialMoves, setInitialMoves] = useState([] as any);

  useEffect(() => {
    const b = game.load_pgn(pgn);
    console.log("isValid", b);
    setInitialMoves(game.history());
  }, []);

  return (
    <>
      <button
        disabled={undoCount === initialMoves.length}
        onClick={() => {
          game.undo();
          setUndoCount(undoCount + 1);
        }}
      >
        Voltar
      </button>
      <button
        disabled={undoCount === 0}
        onClick={() => {
          game.move(initialMoves[initialMoves.length - undoCount]);
          setUndoCount(undoCount - 1);
        }}
      >
        Avançar
      </button>
      <Chessboard position={game.fen()} />
    </>
  );
};

export default PlayRandomMoveEngine;
