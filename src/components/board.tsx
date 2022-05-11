import { Box, createStyles, Grid, makeStyles } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { Chessboard } from "react-chessboard"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const useStyles = makeStyles(theme =>
    createStyles({
      card: {
        backgroundColor: theme.palette.common.white
      }
    })
  )

const Board = () => {
    const todoStore = useTodoStore() as StoreI
    const { currentMoveOnTheBoard } = todoStore
    return <Chessboard position={todoStore.game?.fen() || 'start'}/>
}

export default observer(Board)