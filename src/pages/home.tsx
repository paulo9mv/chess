// Packages
import { FC } from "react";
import { Card, Grid, LinearProgress } from "@material-ui/core";
import { observer } from "mobx-react-lite";

//Components
import BoardContainer from "../components/board_container";
import AnalysisContainer from "../components/analysis_container";

// Store
import { useStore } from "../context";

const Home: FC = () => {
  const store = useStore()
  const { isEvaluationFinished, reportMoves, history } = store;

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Card style={{ height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {`♟️ Chess Analysis (Stockfish v14.1 🐟)`}
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={5}>
          <BoardContainer />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          {!isEvaluationFinished && <LinearProgress value={(reportMoves.length / history.length) * 100} variant="determinate" />}
          <AnalysisContainer />
        </Grid>
      </Grid>
    </Grid>
  </Grid>

}

export default observer(Home);