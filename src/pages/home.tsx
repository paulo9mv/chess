import { Grid, LinearProgress } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import BoardContainer from "../components/board_container";
import AnalysisContainer from "../components/analysis_container";
import { useTodoStore } from "../context";
import { StoreI } from "../stores/game";

const Home = () => {
    const todoStore: StoreI = useTodoStore()
    const { isEvaluationFinished, reportMoves, history } = todoStore;

    console.log(reportMoves.length, history.length)

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
                            { !isEvaluationFinished && <LinearProgress value={(reportMoves.length / history.length) * 100} variant="determinate"/>}
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