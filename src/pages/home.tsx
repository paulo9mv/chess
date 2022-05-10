import { Button, Grid, TextField } from "@material-ui/core";
import { observer, Observer } from "mobx-react-lite";
import { useState } from "react";
import Board from "../components/board";
import Moves from "../components/moves";
import { useTodoStore } from "../context";
import { StoreI } from "../stores/game";

const Home = () => {
    const todoStore = useTodoStore() as StoreI

    const [text, setText] = useState("")
    const handleVerify = () => {
        const isValid = todoStore.loadPgn(text)

        if (!isValid) {
            console.error("Invalid PGN")
        }
    }

    return <Grid container spacing={2}>
        <Grid item xs={12}>Test /// 1. e4 e5 2. Nf3 Qh4 3. Nxe5 Qxe4+ 4. Be2 Qxe5 5. O-O Qf6 6. Re1 Ba3 7. Nxa3 Ne7 8. d4 Qxd4 9. c3 Qh4</Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
            Upload or paste PGN here:
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                minRows={4}
                onChange={e => setText(e.target.value)}
                value={text}
            />
            <Button onClick={handleVerify}>Verify</Button>
            <Button disabled={!todoStore.currentPgn} onClick={todoStore.startEvaluate}>Analyze</Button>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={2} />
                <Grid item xs={6}>
                    <Board />
                </Grid>
                <Grid item xs={2}>
                    <Moves />
                </Grid>
            </Grid>
        </Grid>
    </Grid>

}

export default observer(Home);