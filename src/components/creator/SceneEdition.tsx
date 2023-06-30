import { Stack, TextField } from "@mui/material";
import { SceneGrid } from "./SceneGrid";
import { SceneTools } from "./SceneTools";


export const SceneEdition = () => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
        <SizeEditor />
        <SceneGrid />
        <SceneTools />
    </Stack>
)

const SizeEditor = () => <Stack alignItems="center" style={{padding: "10px"}}>
    <TextField variant="standard" margin="normal" label="Cantidad de columas" type="number" defaultValue={3}></TextField>
    <TextField variant="standard" margin="normal" label="Cantidad de filas" type="number" defaultValue={3}></TextField>
</Stack>

