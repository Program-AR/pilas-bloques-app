import { Stack, TextField } from "@mui/material";
import { SceneGrid } from "./SceneGrid";


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

const SceneTools = () =>
 <Stack alignItems="center" style={{padding: "10px"}}>
    <p>Poner obstáculo</p>
    <Tool />
    <p>Poner objeto(s)</p>
    <Stack direction="row" style={{flexWrap: "wrap", justifyContent: "center"}}>
        <Tool />
        <Tool />
        <Tool />
        <Tool />
        <Tool />
    </Stack>
    <p>Poner personaje</p>
    <Tool />
    <p>Borrar</p>
    <Tool />
</Stack>

const Tool = () => <div style={{borderStyle:"solid", width:"50px", height:"50px"}}></div>