import { useState } from "react";
import chess from "chess";
import { Chessboard } from "react-chessboard";

function App() {
  return (
    <Chessboard
      position={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
    />
  );
}

export default App;
