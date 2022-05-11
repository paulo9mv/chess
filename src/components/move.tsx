// Packages
import { Avatar, Box, createStyles, Grid, makeStyles, Typography } from "@material-ui/core"
import { FC } from "react"

export type MoveStatus = "ok" | "blunder" | "mistake" | "inaccuracy"

interface Props {
  index: number
  move: string
  currentMove: boolean
  status: MoveStatus
  score: number
  mateIn: number
}

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      backgroundColor: theme.palette.common.white
    },
    bold: {
      fontWeight: 800
    },
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


const Move: FC<Props> = ({ index, move, currentMove, status, score, mateIn }) => {
  const classes = useStyles()
  const color = classes[status]
  const bold = currentMove ? classes.bold : ""

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

  const isFirstMove = score == undefined && mateIn == undefined
  const scoreRound = Number.isNaN(score) ? null :
    Math.abs(score) == Infinity ? `M${Math.abs(mateIn)}` :
      score > 0 ? `+${(score / 100).toFixed(1)}` :
        (score / 100).toFixed(1)

  return (
    <Grid container>
      <Grid item xs={9}>
        <Box flexDirection="row" style={{ display: 'flex', alignItems: 'center' }}>
          <Typography display="inline" className={bold}>
            {`${index + 1}. ${move}`}
          </Typography>
          <Avatar className={color} style={{ marginLeft: 6, height: '16px', width: '16px', fontSize: '12px' }}>
            {getIconByStatus(status)}
          </Avatar>
          <Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box style={{ display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {!isFirstMove && <Typography display="inline" className={bold} style={{ fontSize: 10 }}>
            {scoreRound}
          </Typography>}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Move