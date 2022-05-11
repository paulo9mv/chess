import { Card, Grid, LinearProgress } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import BoardContainer from "../components/board_container";
import AnalysisContainer from "../components/analysis_container";
import { useTodoStore } from "../context";
import { StoreI } from "../stores/game";

const Home = () => {
    const todoStore: StoreI = useTodoStore()
    const { isEvaluationFinished, reportMoves, history } = todoStore;

    return <Grid container spacing={2}>
        <Grid item xs={12}><Card style={{height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{`♟️ Chess Analysis (Stockfish v14.1 🐟)`}</Card></Grid>
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