import { Grid, Stack, TextField } from "@mui/material";
import React from "react";


export const SceneEdition = () => (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
        <SizeEditor />
        <SceneGrid />
        <SceneTools />
    </Stack>
)

const SizeEditor = () => <Stack alignItems="center" style={{padding: "10px"}}>
    <TextField margin="normal" label="Cantidad de columas" type="number" defaultValue={3}></TextField>
    <TextField margin="normal" label="Cantidad de filas" type="number" defaultValue={3}></TextField>
</Stack>

// these consts are for testing purpose 
const A = "A"
const O = "O"
const E = "E"
const G = "-"
const mapa = [[A,O,O,O,O],[G,O,G,G,G],[G,O,O,O,G],[E,G,G,G,G]]

// the scene has multiple initial scenarios
const SceneGrid = () => 
    <Stack>
        {mapa.map(row => 
            <Stack direction="row">
                {row.map(cellContent => <Cell>{cellContent}</Cell>)}
            </Stack>)}
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

const Cell: React.FC<Props> = (props) => <div style={{borderStyle:"solid", width:"100%", height:"100%"}}>{props.children}</div>

interface Props {children: React.ReactNode}