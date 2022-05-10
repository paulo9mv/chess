import { Grid } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { Chessboard } from "react-chessboard"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const Board = () => {
    const todoStore = useTodoStore() as StoreI
    const { currentMoveOnTheBoard } = todoStore

    return <Chessboard position={todoStore.game?.fen() || 'start'}/>
}

export default observer(Board)