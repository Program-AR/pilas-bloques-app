import { Stack } from "@mui/material";
import { SceneGrid } from "./Grid/SceneGrid";
import { SceneTools } from "./SceneTools";
import { useTranslation } from "react-i18next"
import { IncDecButtons } from "./IncDecButtons";
import { useState, useCallback, useEffect } from 'react';
import { LocalStorage } from "../../../../localStorage";
import { SceneMap, SerializedChallenge } from "../../../serializedChallenge";

const OBSTACLE = "O"
const ACTOR = "A"
const EMPTY = "-"

const COL_0 = 0
const CEL_0 = 0

export const relocateActor = (row: string[], colSearch: number, inMap: SceneMap) => {
    if (row.includes(ACTOR, colSearch)) {
        if (inMap[COL_0][CEL_0] === EMPTY || inMap[COL_0][CEL_0] === OBSTACLE) {
            inMap[COL_0][CEL_0] = ""
        }
        inMap[COL_0][CEL_0] = ACTOR + ( inMap[COL_0][CEL_0].length ? '&' + inMap[COL_0][CEL_0] : '')
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
    const initialColumns = LocalStorage.getCreatorChallenge()?.scene.maps[props.mapIndex][COL_0].length

    const [rows, setRow] = useState(initialRows || 1)
    const [columns, setCol] = useState(initialColumns || 1)

    const rowsInMap = (actualMap: SceneMap): number => actualMap.length

    const columnsInMap = (actualMap: SceneMap): number => actualMap[COL_0].length

    const updateRowsIfChanged = useCallback((actualMap: SceneMap) => {
        if (rows < rowsInMap(actualMap)) { //Row was removed
            actualMap = relocateActor(actualMap[actualMap.length - 1], COL_0, actualMap)
            actualMap.pop()
        }
        if (rows > rowsInMap(actualMap)) //Row was added
            actualMap.push(actualMap[COL_0].slice().fill(EMPTY))

        props.setRows(rows)
    }, [props, rows])

    const updateColumnsIfChanged = useCallback((actualMap: SceneMap) => {
        if (columns < columnsInMap(actualMap)) { //Column was removed
            actualMap.map((row) => {
                actualMap = relocateActor(row, row.length - 1, actualMap)
                return row.pop()
            })
        }
        if (columns > columnsInMap(actualMap)) //Column was added
            actualMap.map((row, i) => actualMap[i] = row.concat(EMPTY))

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
