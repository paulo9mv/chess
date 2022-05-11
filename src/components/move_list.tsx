import { Box, Button, Grid, Typography } from "@material-ui/core"
import { createStyles, makeStyles } from '@material-ui/core'
import { observer } from "mobx-react-lite"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"
import Move from "./move"

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      backgroundColor: theme.palette.common.white
    },
    bold: {
      fontWeight: 600
    }
  })
)

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

  
  const { currentMoveOnTheBoard, undo, setCurrentMoveOnTheBoard, move, reportMoves } = todoStore


  return todoStore.history.length ? <Box><Grid container>
    {moves.map((i, index) => {
      const status = reportMoves.length > index ? reportMoves[index] : "ok"

      return (<Grid key={`${index}_${i}`} item xs={6}>
      <Move status={status} currentMove={index === currentMoveOnTheBoard - 1} index={index} move={i}/>
    </Grid>)
    })}
  </Grid>
  <Button variant="contained" disabled={currentMoveOnTheBoard === 0}
      onClick={handlePrevious}>Previous</Button>
    <Button variant="contained" disabled={currentMoveOnTheBoard === moves.length}
      onClick={handleNext}>Next</Button>
      <Button disabled={!todoStore.currentPgn} onClick={todoStore.startEvaluate}>Analyze</Button>
  </Box> : null
}

export default observer(Moves)