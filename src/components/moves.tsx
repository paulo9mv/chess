import { Button, Grid } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const Moves = () => {
  const todoStore = useTodoStore() as StoreI
  const handlePrevious = () => {
    undo();
    setCurrentMoveOnTheBoard(currentMoveOnTheBoard - 1);
  }
  const handleNext = () => {
    move(moves[currentMoveOnTheBoard])
    setCurrentMoveOnTheBoard(currentMoveOnTheBoard + 1);
  }

  const moves = todoStore.history

  if (!todoStore.history.length) return <div>Chess</div>
  const { game, currentMoveOnTheBoard, undo, setCurrentMoveOnTheBoard, move } = todoStore


  return <Grid container>
    {moves.map((i, index) => (<Grid key={`${index}_${i}`} item xs={6}>
      <div>{index == (currentMoveOnTheBoard - 1) ? <b>{i}</b> : i}</div>
    </Grid>))}
    <Button disabled={currentMoveOnTheBoard === 0}
      onClick={handlePrevious}>Previous</Button>
    <Button disabled={currentMoveOnTheBoard === moves.length}
      onClick={handleNext}>Next</Button>
  </Grid>
}

export default observer(Moves)