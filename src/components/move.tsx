import { Box, createStyles, makeStyles, Typography } from "@material-ui/core"
import { FC } from "react"

export type MoveStatus = "ok" | "blunder" | "mistake" | "inaccuracy"

interface Props {
    index: number
    move: string
    currentMove: boolean
    status: MoveStatus
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
          backgroundColor: theme.palette.error.main
      },
      mistake: {
            backgroundColor: theme.palette.warning.main
      },
      inaccuracy: {
            backgroundColor: theme.palette.primary.main
      },
      ok: {
          backgroundColor: theme.palette.common.white
      }
    })
  )

const Move: FC<Props> = ({index, move, currentMove, status}) => {
    const classes = useStyles()
    const color = classes[status]
    const bold = currentMove ? classes.bold : ""
  
    return (
        <Box>
            <Typography display="inline" className={bold}>
                {`${index + 1}. `} 
            </Typography>
            <Typography display="inline" className={`${color} ${bold}`}>
                {move}
            </Typography>
        </Box>
    )
  }

export default Move