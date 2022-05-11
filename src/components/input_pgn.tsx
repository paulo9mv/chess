
import { Box, TextField, Button } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const InputPgn = () => {
    const todoStore = useTodoStore() as StoreI
    const [text, setText] = useState("")
    const handleVerify = () => {
        const isValid = todoStore.loadPgn(text)

        if (!isValid) {
            console.error("Invalid PGN")
        }
    }

    return (
        <Box>
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


        </Box>
    )
}

export default observer(InputPgn)