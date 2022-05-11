import { Avatar, Box, createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStore } from "../context";
import { StoreProps } from "../stores/game";
import { MoveStatus } from "./move";

const useStyles = makeStyles(theme =>
    createStyles({
      blunder: {
        backgroundColor: theme.palette.error.main,
      },
      mistake: {
        backgroundColor: theme.palette.warning.main,
      },
      inaccuracy: {
        backgroundColor: theme.palette.primary.light,
      },
      ok: {
        backgroundColor: theme.palette.common.white
      },
    })
  )

interface ReportRowProps {
    type: MoveStatus
    quantity: number
}

interface ReportBlockProps {
  report: Array<MoveStatus>
}

const ReportRow: FC<ReportRowProps> = ({type, quantity = 0}) => {
    const classes = useStyles()
    const color = classes[type]

    const getIconByStatus = (status: MoveStatus) => {
        switch (status) {
          case "blunder":
            return "??"
          case "mistake":
            return "?"
          case "inaccuracy":
            return "!?"
          default:
            return ""
        }
      }

    return <Box flexDirection="row" style={{display: 'flex'}}>
        <Avatar className={color} style={{ height: '16px', width: '16px', fontSize: '12px', marginRight: 6 }}>{getIconByStatus(type)}</Avatar>
        <Typography style={{fontSize: 12}}>{`${quantity} ${type}`}</Typography>
    </Box>
}

const ReportBlock: FC<ReportBlockProps> = ({report}) => {
    const counts = {} as any;

    for (const num of report) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return <Box>
        <ReportRow type="blunder" quantity={counts["blunder"]}/>
        <ReportRow type="mistake" quantity={counts["mistake"]}/>
        <ReportRow type="inaccuracy" quantity={counts["inaccuracy"]} />
    </Box>
}

const Report: FC = () => {
    const store = useStore() as StoreProps
    const { reportMoves, isEvaluationFinished } = store
    const hasAnalysisFinished = reportMoves.length && isEvaluationFinished

    const whiteReport = reportMoves.filter((_, index) => index % 2 === 0)
    const blackReport = reportMoves.filter((_, index) => index % 2 !== 0)

    return hasAnalysisFinished ? (
        <Grid container style={{ height: '100%', flexWrap: 'nowrap', maxWidth: '100%' }}>
            <Grid item xs={6}>
                White
                <ReportBlock report={whiteReport} />
            </Grid>
            <Grid item xs={6}>
                Black
                <ReportBlock report={blackReport}/>
            </Grid>
        </Grid>
    ) : null
}

export default observer(Report);