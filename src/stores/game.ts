import { observable, computed } from "mobx";
import { observer } from "mobx-react-lite";

export interface StoreI {
  currentPgn: string,
  worker: any,
  loadPgn: Function
}

export const createTodoStore = (): StoreI => {
  return {
    currentPgn: "",
    worker: null,
    loadPgn(pgn: string) {
      this.currentPgn = pgn;
    },
  };
};
