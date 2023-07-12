import { Stack } from "@mui/material";
import { SceneGrid } from "./Grid/SceneGrid";
import { SceneTools } from "./SceneTools";
import { useTranslation } from "react-i18next"
import { IncDecButtons } from "./IncDecButtons";
import { useState, useCallback, useEffect } from 'react';
import { LocalStorage } from "../../../../localStorage";
import { SceneMap, SerializedChallenge } from "../../../serializedChallenge";

export const OBSTACLE = "O"
export const ACTOR = "A"
export const EMPTY = "-"

//Remeber to change de default scene at serializedChallenge.tsx if the inital position for Actor changes
export const INITIAL_COL = 0
export const INITIAL_ROW = 0

export const setActorAtInitialPosition = (inMap: SceneMap) => {
    if (inMap[INITIAL_ROW][INITIAL_COL] === EMPTY || inMap[INITIAL_ROW][INITIAL_COL] === OBSTACLE) {
        inMap[INITIAL_ROW][INITIAL_COL] = ""
    }
    inMap[INITIAL_ROW][INITIAL_COL] = ACTOR + (inMap[INITIAL_ROW][INITIAL_COL].length ? '&' + inMap[INITIAL_ROW][INITIAL_COL] : '')

    return inMap;
}


export const relocateActor = (row: string[], colSearch: number, inMap: SceneMap) => {
    if (row.includes(ACTOR, colSearch)) {
        return setActorAtInitialPosition(inMap)
    }
    return inMap;
}

type SizeProps = {
    mapIndex: number
    setColumns: (col: number) => void
    setRows: (row: number) => void
}

const SizeEditor = (props: SizeProps) => {
    const { t } = useTranslation("creator")

    const initialRows = LocalStorage.getCreatorChallenge()?.scene.maps[props.mapIndex].length
    const initialColumns = LocalStorage.getCreatorChallenge()?.scene.maps[props.mapIndex][INITIAL_ROW].length

    const [rows, setRow] = useState(initialRows || 1)
    const [columns, setCol] = useState(initialColumns || 1)

    const rowsInMap = (currentMap: SceneMap): number => currentMap.length

    const columnsInMap = (currentMap: SceneMap): number => currentMap[INITIAL_ROW].length

    const updateRowsIfChanged = useCallback((currentMap: SceneMap) => {
        if (rows < rowsInMap(currentMap)) { //Row was removed
            currentMap = relocateActor(currentMap[currentMap.length - 1], INITIAL_COL, currentMap)
            currentMap.pop()
        }
        if (rows > rowsInMap(currentMap)) //Row was added
            currentMap.push(currentMap[INITIAL_ROW].slice().fill(EMPTY))

        props.setRows(rows)
    }, [props, rows])

    const updateColumnsIfChanged = useCallback((currentMap: SceneMap) => {
        if (columns < columnsInMap(currentMap)) { //Column was removed
            currentMap.map((row) => {
                currentMap = relocateActor(row, row.length - 1, currentMap)
                return row.pop()
            })
        }
        if (columns > columnsInMap(currentMap)) //Column was added
            currentMap.map((row, i) => currentMap[i] = row.concat(EMPTY))

        props.setColumns(columns)

    }, [columns, props])

    useEffect(() => {

        const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!
        const map: SceneMap = challenge.scene.maps[props.mapIndex];

        updateRowsIfChanged(map)
        updateColumnsIfChanged(map)
        
        LocalStorage.saveCreatorChallenge(challenge)

    }, [props, updateColumnsIfChanged, updateRowsIfChanged]);


    return (
        <Stack sx={{ flexDirection: "column", height: "200px", justifyContent: "space-between", padding: "10px" }}>
            <IncDecButtons returnValue={setCol} initialValue={columns} min={1} max={12} label={t("scene.numCols")} testId="col" data-testid="map-col"/>
            <IncDecButtons returnValue={setRow} initialValue={rows} min={1} max={10} label={t("scene.numRows")} testId="row" data-testid="map-row"/>
        </Stack>
    )
}

export const SceneEdition = () => {
    const [, setCols] = useState(0)
    const [, setRows] = useState(0)
    const [workingMap,] = useState(0)

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <SizeEditor mapIndex={workingMap} setColumns={setCols} setRows={setRows} />
            <SceneGrid mapIndex={workingMap} />
            <SceneTools />
        </Stack>
    )
}
