
import { Box, TextField, Button } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useTodoStore } from "../context"
import { StoreI } from "../stores/game"

const InputPgn = () => {
    const todoStore = useTodoStore() as StoreI
    const [text, setText] = useState("")
    const handleVerify = () => {
        todoStore.loadPgn(text)
    }

    return (
        <Box>
            Add a valid PGN to start. Use bottom commands to control
            <Box>
            <TextField
                id="outlined-multiline-static"
                label="PGN"
                multiline
                minRows={4}
                onChange={e => setText(e.target.value)}
                value={text}
                fullWidth
            />
            </Box>
            <Box style={{marginTop: 4}}>
            <Button variant="contained" color="primary" onClick={handleVerify}>Import</Button>
            </Box>
            
        </Box>
    )
}

export default observer(InputPgn)