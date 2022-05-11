import { Box, createStyles, Grid, makeStyles } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { Chessboard } from "react-chessboard"
import { useStore } from "../context"
import { StoreProps } from "../stores/game"

const useStyles = makeStyles(theme =>
    createStyles({
      card: {
        backgroundColor: theme.palette.common.white
      }
    })
  )

const Board = () => {
    const store: StoreProps = useStore()
    const { currentMoveOnTheBoard, expectedMoves, history } = store
    const arrows: Array<Array<string>> = []
    
    if (expectedMoves.length -1 === history.length) {
      expectedMoves.map(i => arrows.push([i.substr(0,2), i.substr(2)]))
    }

    return <Chessboard
      position={store.game?.fen() || 'start'}
      customArrows={arrows.length ? [arrows[currentMoveOnTheBoard]] : []}
      onPieceDrop={(s,t) => false}
    />
}

export default observer(Board)