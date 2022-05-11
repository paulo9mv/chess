import { ChessInstance, Chess } from "chess.js";
import { observable, computed } from "mobx";
import { observer } from "mobx-react-lite";
import { urlToHttpOptions } from "url";
import { MoveStatus } from "../components/move";

export interface StoreI {
  currentPgn: string,
  reportMoves: Array<MoveStatus>,
  history: Array<any>,
  currentMove: number,
  currentMoveOnTheBoard: number,
  expectedPoints: Array<any>,
  foundPoints: Array<any>,
  expectedMoves: Array<any>
  worker: any,
  game?: ChessInstance,
  evaluatedGame?: ChessInstance,
  startWorker: Function
  loadPgn: Function,
  onBestMoveFound: Function,
  onHandleEvent: any,
  onScoreFound: any,
  bestMove: string,
  onEvaluateStart: any,
  printBlunders: any,
  startEvaluate: any,
  move: any,
  setCurrentMoveOnTheBoard: any,
  undo: any,
  isEvaluationFinished: boolean
}

export const createTodoStore = (): StoreI => {
  return {
    currentPgn: "",
    currentMove: 0,
    bestMove: "",
    expectedPoints: [],
    expectedMoves: [],
    foundPoints: [],
    reportMoves: [],
    history: [],
    worker: null,
    game: undefined,
    evaluatedGame: undefined,
    currentMoveOnTheBoard: 0,
    isEvaluationFinished: true,
    setCurrentMoveOnTheBoard(value: number) {
      this.currentMoveOnTheBoard = value
    },
    undo() {
      this.game?.undo()
    },
    move(pos: string) {
      this.game?.move(pos)
    },
    printBlunders() {
      const arr = this.expectedPoints.map(i => i)
      const tempArray =this.expectedPoints.map((i, index, arr) => {
        if (index === 0) {
          return i - i;
        }

        return i - arr[index-1];
      })
      const impr = tempArray.map((i, index) => {
        if (i === 0) {
          return "ok"
        }

        if (Math.abs(i) > 800) {
          return "blunder"
        } else if (Math.abs(i) > 400) {
          return "mistake"
        } else if (Math.abs(i) > 80) {
          return "inaccuracy"
        } else {
          return "ok"
        }
      })

      impr.shift()
      this.reportMoves = impr

      console.log(impr)
      console.log("expectedPoints", arr)
      console.log("tempArray", tempArray)
    },
    startEvaluate() {
      this.startWorker();
      this.isEvaluationFinished = false;
      this.onEvaluateStart(this.evaluatedGame?.fen());
    },
    startWorker() {
      this.worker = new Worker("src/lib/stockfish.js");

      this.worker.addEventListener("message", this.onHandleEvent);

      this.worker.postMessage("uci");
    },
    onEvaluateStart(fen: string) {
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage("go depth 16");
    },
    onBestMoveFound(best: string) {
      //console.log(this.history)
      //console.log("our best move is: ", best)

      this.expectedMoves[this.currentMove] = best;

      //console.log('currentMove:', this.history[this.currentMove])

      this.evaluatedGame?.move(this.history[this.currentMove]);
      this.currentMove++;
   

      if (this.currentMove > this.history.length) {
        console.log(this.expectedPoints)
        console.log(this.foundPoints)

        this.printBlunders()

        this.isEvaluationFinished = true;

        return;
      }
        
      this.onEvaluateStart(this.evaluatedGame?.fen())

      this.printBlunders()
    },
    onHandleEvent(e: any) {
      const data: string = e.data

      if (data.startsWith("bestmove")) {
        this.onBestMoveFound(data);
      } else if (data.startsWith("info depth 16") && !data.includes('lowerbound')&& !data.includes('upperbound')) {
        this.onScoreFound(data);
      }
    },
    onScoreFound(data: string) {
      var result = data.match(/(?<=cp\s+).*?(?=\s+nodes)/gs);
      console.log(data);
      const multiplier = this.evaluatedGame?.turn() === 'w' ? 1 : -1;

      console.log(multiplier, this.evaluatedGame?.turn())

      if (result != null) {
        const resultToInt = parseInt(result[0])
        console.log("Current points:", resultToInt * multiplier)

        this.expectedPoints[this.currentMove] = resultToInt * multiplier;

        return;
      }
      result = data.match(/(?<=mate\s+).*?(?=\s+nodes)/gs);
      if (result != null) {
        console.log(result[0])
        const resultToInt = parseInt(result[0])
        console.log("Mate in:", resultToInt)

        this.expectedPoints[this.currentMove] = (Math.sign(resultToInt) * Infinity) * multiplier

        return;
      }
    },
    loadPgn(pgn: string) {
      const tempGame = new Chess();
      const isValidPgn = tempGame.load_pgn(pgn);

      if (!isValidPgn) {
        console.error("Invalid PGN");
        return false;
      }

      console.log("Valid PGN");

      this.game = new Chess();
      this.evaluatedGame = new Chess();
      this.currentPgn = pgn;
      this.history = tempGame.history()

      return true
    },
  };
};
