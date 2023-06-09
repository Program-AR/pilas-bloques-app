import { Stack, TextField } from "@mui/material";


export const SceneEdition = () => (
    //<div style={{height: "100%"}}>Que</div>
    <Stack direction="row" alignItems="center" justifyContent="space-around">
        <SceneEditor />
        <SceneGrid />
        <SceneToolbox />
    </Stack>
)

const SceneEditor = () => <Stack alignItems="center" style={{height:"100%", width:"25%"}}>
    <TextField margin="normal" label="Cantidad de columas" type="number" defaultValue={3}></TextField>
    <TextField margin="normal" label="Cantidad de filas" type="number" defaultValue={3}></TextField>
</Stack>

const SceneGrid = () => <Stack alignItems="center" style={{height:"100%", width:"50%"}}>
    Escenario
    </Stack>

const SceneToolbox = () =>
 <Stack alignItems="center" style={{height:"100%", width:"25%"}}>
    <p>Poner bstáculo</p>
    <div style={{borderStyle:"solid", width:"4rem", height:"4rem"}}></div>
    <p>Poner bjeto(s)</p>
    <div style={{borderStyle:"solid", width:"4rem", height:"4rem"}}></div>
    <p>Poner personaje</p>
    <div style={{borderStyle:"solid", width:"4rem", height:"4rem"}}></div>
    <p>Borrar</p>
    <div style={{borderStyle:"solid", width:"4rem", height:"4rem"}}></div>
</Stack>