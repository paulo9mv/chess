import { Box, Card, createStyles, makeStyles } from "@material-ui/core"
import { observer } from "mobx-react-lite";
import { useTodoStore } from "../context";
import { StoreI } from "../stores/game";
import InputPgn from "./input_pgn";

import Moves from "./move_list"

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      height: '100%',
      display: 'flex'
    },
     box: {
       padding: 16
     }
  })
)

const AnalysisContainer = () => {
  const classes = useStyles()
  const todoStore: StoreI = useTodoStore() 
    const { history } = todoStore;

  return <Card className={classes.card}>
    <Box className={classes.box}>
    {history.length ? <Moves /> : <InputPgn />}
    </Box>
  </Card>
}

export default observer(AnalysisContainer)