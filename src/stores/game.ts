import { ChessInstance, Chess } from "chess.js";
import { MoveStatus } from "../components/move";

export interface StoreProps {
  currentPgn: string,
  currentMove: number,
  currentMoveOnTheBoard: number,
  game?: ChessInstance,
  evaluatedGame?: ChessInstance,
  worker?: Worker,
  reportMoves: Array<MoveStatus>,
  history: Array<string>,
  mateIn: Array<number>,
  expectedPoints: Array<number>,
  foundPoints: Array<number>,
  expectedMoves: Array<string>,
  isEvaluationFinished: boolean,
  loadPgn: (x: string) => boolean,
  onBestMoveFound: (x: string) => void,
  onHandleEvent: (x: MessageEvent) => void,
  onScoreFound: (x: string) => void,
  onEvaluateStart: (fen?: string) => void,
  processResults: () => void,
  startEvaluate: () => void,
  move: (pos: string) => void,
  setCurrentMoveOnTheBoard: (value: number) => void,
  undo: () => void,
  resetState: () => void
}

export const createTodoStore = (): StoreProps => {
  return {
    currentPgn: "",
    currentMove: 0,
    currentMoveOnTheBoard: 0,
    game: undefined,
    evaluatedGame: undefined,
    worker: undefined,
    expectedPoints: [],
    mateIn: [],
    expectedMoves: [],
    foundPoints: [],
    reportMoves: [],
    history: [],
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
    processResults() {
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
    },
    resetState() {
      this.currentPgn = ""
      this.currentMove = 0
      this.expectedPoints = []
      this.mateIn = []
      this.expectedMoves = []
      this.foundPoints = []
      this.reportMoves = []
      this.history = []
      this.worker = undefined
      this.game = undefined
      this.evaluatedGame = undefined
      this.currentMoveOnTheBoard = 0
      this.isEvaluationFinished = true
    },
    startEvaluate() {
      this.isEvaluationFinished = false;
      this.worker = new Worker("src/lib/stockfish.js");

      this.worker.addEventListener("message", this.onHandleEvent);

      this.worker.postMessage("uci");

      this.onEvaluateStart(this.evaluatedGame?.fen());
    },
    onEvaluateStart(fen?: string) {
      this.worker?.postMessage(`position fen ${fen}`);
      this.worker?.postMessage("go depth 16");
    },
    onBestMoveFound(best: string) {
      const bestMove = best.match(/(?<=bestmove\s+).*?(?=\s+ponder)/gs)

      this.expectedMoves[this.currentMove] = bestMove != null ? bestMove[0] : "error";
      this.evaluatedGame?.move(this.history[this.currentMove]);
      this.currentMove++;
   
      if (this.currentMove > this.history.length) {
        this.processResults()
        this.isEvaluationFinished = true;

        return;
      }
        
      this.onEvaluateStart(this.evaluatedGame?.fen())
      this.processResults()
    },
    onHandleEvent(e: MessageEvent) {
      const data: string = e.data

      if (data.startsWith("bestmove")) {
        this.onBestMoveFound(data);
      } else if (data.startsWith("info depth 16") &&
        !data.includes('lowerbound') &&
        !data.includes('upperbound')) {
          this.onScoreFound(data);
      }
    },
    onScoreFound(data: string) {
      const score = data.match(/(?<=cp\s+).*?(?=\s+nodes)/gs);
      const multiplier = this.evaluatedGame?.turn() === 'w' ? 1 : -1;

      if (score != null) {
        const resultToInt = parseInt(score[0])

        this.expectedPoints[this.currentMove] = resultToInt * multiplier;
        this.mateIn[this.currentMove] = NaN;

        return;
      }

      const mate = data.match(/(?<=mate\s+).*?(?=\s+nodes)/gs);
      if (mate != null) {
        const resultToInt = parseInt(mate[0])
        this.expectedPoints[this.currentMove] = (Math.sign(resultToInt) * Infinity) * multiplier
        this.mateIn[this.currentMove] = resultToInt * multiplier;

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

      this.game = new Chess();
      this.evaluatedGame = new Chess();
      this.currentPgn = pgn;
      this.history = tempGame.history()

      return true
    },
  };
};
