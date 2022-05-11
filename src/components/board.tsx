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
    const { currentMoveOnTheBoard, expectedMoves, history } = todoStore

    const arrows: Array<Array<string>> = []
    

    if (expectedMoves.length -1 === history.length) {
      expectedMoves.map(i => arrows.push([i.substr(0,2), i.substr(2)]))
    }

    console.log(arrows, currentMoveOnTheBoard, arrows[currentMoveOnTheBoard], expectedMoves, history.length)

    return <Chessboard position={todoStore.game?.fen() || 'start'} customArrows={arrows.length ? [arrows[currentMoveOnTheBoard]] : []} onPieceDrop={(s,t) => false}/>
}

export default observer(Board)