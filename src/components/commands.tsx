import { Box, Button, Grid, IconButton, Tooltip } from "@material-ui/core"
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ComputerIcon from '@material-ui/icons/Computer';
import TrashIcon from '@material-ui/icons/Delete'
import { FC } from "react"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const Commands: FC = () => {
    const todoStore = useTodoStore() as StoreI
    const moves = todoStore.history

    const { currentMoveOnTheBoard, undo, setCurrentMoveOnTheBoard, move, isEvaluationFinished, reportMoves } = todoStore

    const handlePrevious = () => {
        undo();
        setCurrentMoveOnTheBoard(currentMoveOnTheBoard - 1);
    }
    const handleNext = () => {
        move(moves[currentMoveOnTheBoard])
        setCurrentMoveOnTheBoard(currentMoveOnTheBoard + 1);
    }

    return (
        <Grid container spacing={1} style={{ height: '100%', flexWrap: 'nowrap' }} alignItems="flex-end">
            <Grid item>
                <Tooltip title="Previous">
                    <IconButton disabled={currentMoveOnTheBoard === 0}
                        onClick={handlePrevious}><ChevronLeftIcon /></IconButton>
                </Tooltip>

            </Grid>
            <Grid item>
                <Tooltip title="Next">
                    <IconButton disabled={currentMoveOnTheBoard === moves.length}
                        onClick={handleNext}><ChevronRightIcon /></IconButton>
                </Tooltip>

            </Grid>
            <Grid item>
                <Tooltip title="Run analysis"><IconButton color="primary" disabled={!isEvaluationFinished || reportMoves.length > 0} onClick={todoStore.startEvaluate}><ComputerIcon /></IconButton></Tooltip>

            </Grid>
            <Grid item>
                <Tooltip title="Delete analysis">
                    <IconButton color="secondary" disabled={!isEvaluationFinished} onClick={todoStore.resetState}><TrashIcon /></IconButton>
                </Tooltip>

            </Grid>
        </Grid>
    )
}

export default Commands