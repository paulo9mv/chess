import { Button, Card, createStyles, Grid, makeStyles, TextField } from "@material-ui/core";
import { observer, Observer } from "mobx-react-lite";
import { useState } from "react";
import BoardContainer from "../components/board_container";
import Board from "../components/board";
import Moves from "../components/move_list";
import { useTodoStore } from "../context";
import { StoreI } from "../stores/game";
import AnalysisContainer from "../components/analysis_container";

const useStyles = makeStyles(theme =>
    createStyles({
        card: {
            backgroundColor: theme.palette.common.white
        }
    })
)

const Home = () => {

    const classes = useStyles()

    

    return <Grid container spacing={2}>
        <Grid item xs={12}>Test /// 1. e4 e5 2. Nf3 Qh4 3. Nxe5 Qxe4+ 4. Be2 Qxe5 5. O-O Qf6 6. Re1 Ba3 7. Nxa3 Ne7 8. d4 Qxd4 9. c3 Qh4</Grid>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <BoardContainer />
                        </Grid>
                        <Grid item xs={4}>
                            <AnalysisContainer />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </Grid>
    </Grid>

}

export default observer(Home);