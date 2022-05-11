import { Card, createStyles, makeStyles } from "@material-ui/core"
import { useStore } from "../context"
import { StoreProps } from "../stores/game"

import Board from "./board"

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      height: '100%'
    }
  })
)

const BoardContainer = () => {
  const classes = useStyles()

  return <Board />
}

export default BoardContainer