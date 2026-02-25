// Packages
import { Box, TextField, Button } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { useState } from "react"

// Store
import { useStore } from "../context"
import { StoreProps } from "../stores/game"

const InputPgn = () => {
  const store: StoreProps = useStore()
  const [text, setText] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const handleVerify = () => {
    const success = store.loadPgn(text)
    setError(!success)
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
          onChange={e => { setText(e.target.value); setError(false) }}
          value={text}
          fullWidth
          error={error}
          helperText={error ? "Invalid PGN. Please check the format and try again." : ""}
        />
      </Box>
      <Box style={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={handleVerify}>Import</Button>
      </Box>
    </Box>
  )
}

export default observer(InputPgn)