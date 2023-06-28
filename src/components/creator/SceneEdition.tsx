import { Stack } from "@mui/material";
import { SceneGrid } from "./SceneGrid";
import { IncDecButtons } from "./IncDecButtons";


export const SceneEdition = () => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
        <SizeEditor />
        <SceneGrid />
        <SceneTools />
    </Stack>
)

const SizeEditor = () => 
<Stack sx={{flexDirection:"column", height:"150px", justifyContent:"space-between", padding: "10px"}}>
    <IncDecButtons min={1} max={12} label="Cantidad de columnas"/>
    <IncDecButtons min={1} max={10} label="Cantidad de filas"/>
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