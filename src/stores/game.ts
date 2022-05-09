import { ChessInstance, Chess } from "chess.js";
import { observable, computed } from "mobx";
import { observer } from "mobx-react-lite";
import { urlToHttpOptions } from "url";

export interface StoreI {
  currentPgn: string,
  history: Array<any>,
  currentMove: number,
  expectedPoints: Array<any>,
  foundPoints: Array<any>,
  expectedMoves: Array<any>
  worker: any,
  game?: ChessInstance,
  startWorker: Function
  loadPgn: Function,
  onBestMoveFound: Function,
  onHandleEvent: any,
  onScoreFound: any,
  bestMove: string,
  onEvaluateStart: any,
  printBlunders: any
}

export const createTodoStore = (): StoreI => {
  return {
    currentPgn: "",
    currentMove: 0,
    bestMove: "",
    expectedPoints: [],
    expectedMoves: [],
    foundPoints: [],
    history: [],
    worker: null,
    game: undefined,
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
          return "gafe"
        } else if (Math.abs(i) > 400) {
          return "erro"
        } else if (Math.abs(i) > 100) {
          return "imprecisao"
        } else {
          return "ok"
        }
      }).shift()

      console.log(impr)
      console.log("expectedPoints", arr)
      console.log("tempArray", tempArray)
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

      this.game?.move(this.history[this.currentMove]);
      this.currentMove++;

      console.log(this.game?.ascii())
      //console.log(this.game?.game_over())    

      if (this.currentMove > this.history.length) {
        console.log(this.expectedPoints)
        console.log(this.foundPoints)

        this.printBlunders()

        return;
      }
        
      this.onEvaluateStart(this.game?.fen())

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
      const multiplier = this.game?.turn() === 'w' ? 1 : -1;

      console.log(multiplier, this.game?.turn())

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

        this.expectedPoints[this.currentMove] = Infinity * multiplier

        return;
      }
    },
    loadPgn(pgn: string) {
      const tempGame = new Chess();
      const isValidPgn = tempGame.load_pgn(pgn);

      if (!isValidPgn) {
        console.error("Invalid PGN");
        return;
      }

      console.log("Valid PGN");

      this.game = new Chess();
      this.currentPgn = pgn;
      this.history = tempGame.history()
    },
  };
};
