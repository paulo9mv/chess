import { Box, Button, Grid, IconButton } from "@material-ui/core"
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ComputerIcon from '@material-ui/icons/Computer';
import { FC } from "react"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const Commands: FC = () => {
    const todoStore = useTodoStore() as StoreI
    const moves = todoStore.history

    const { currentMoveOnTheBoard, undo, setCurrentMoveOnTheBoard, move } = todoStore

    const handlePrevious = () => {
        undo();
        setCurrentMoveOnTheBoard(currentMoveOnTheBoard - 1);
    }
    const handleNext = () => {
        move(moves[currentMoveOnTheBoard])
        setCurrentMoveOnTheBoard(currentMoveOnTheBoard + 1);
    }

    return (
        <Grid container spacing={1} style={{height: '100%', flexWrap: 'nowrap'}} alignItems="flex-end">
            <Grid item>
                <IconButton disabled={currentMoveOnTheBoard === 0}
                    onClick={handlePrevious}><ChevronLeftIcon /></IconButton>
            </Grid>
            <Grid item>
                <IconButton  disabled={currentMoveOnTheBoard === moves.length}
                    onClick={handleNext}><ChevronRightIcon /></IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={todoStore.startEvaluate}><ComputerIcon /></IconButton>
            </Grid>
        </Grid>
    )
}

export default Commands