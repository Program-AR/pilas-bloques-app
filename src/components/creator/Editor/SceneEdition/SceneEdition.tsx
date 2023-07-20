import { Stack } from "@mui/material";
import { SceneGrid } from "./Grid/SceneGrid";
import { SceneTools } from "./SceneTools";
import { useTranslation } from "react-i18next"
import { IncDecButtons } from "./IncDecButtons";
import { useState, useCallback, useEffect, useContext } from 'react';
import { SceneMap } from "../../../serializedChallenge";
import { CreatorContext } from "../CreatorContext";

export const OBSTACLE = "O"
export const ACTOR = "A"
export const EMPTY = "-"

//Remeber to change de default scene at serializedChallenge.tsx if the inital position for Actor changes
export const INITIAL_COL = 0
export const INITIAL_ROW = 0

/**
 * If no position is given, the actor is set in the initial one (0,0)
 * @returns a map with the actor in another position.
 */
export const setActorAtPosition = (inMap: SceneMap, row = INITIAL_ROW, col = INITIAL_COL) => {
    if (inMap[row][col] === EMPTY || inMap[row][col] === OBSTACLE) {
        inMap[row][col] = ""
    }
    inMap[row][col] = ACTOR + (inMap[row][col].length ? '&' + inMap[row][col] : '')

    return inMap;
}

export const relocateActor = (row: string[], colSearch: number, inMap: SceneMap) => {
    if (row.includes(ACTOR, colSearch)) {
        return setActorAtPosition(inMap)
    }
    return inMap;
}

type SizeProps = {
    setColumns: (col: number) => void
    setRows: (row: number) => void
}

const SizeEditor = (props: SizeProps) => {
    const { t } = useTranslation("creator")

    let { map, setMap } = useContext(CreatorContext)

    const rowsInMap = map.length
    const columnsInMap = map[INITIAL_ROW].length

    const [rows, setRow] = useState(rowsInMap || 1)
    const [columns, setCol] = useState(columnsInMap || 1)

    const updateRowsIfChanged = useCallback(() => {
        if (rows < rowsInMap) { //Row was removed
            map = relocateActor(map[map.length - 1], INITIAL_COL, map)
            map.pop()
        }
        if (rows > rowsInMap) //Row was added
            map.push(map[INITIAL_ROW].slice().fill(EMPTY))

        props.setRows(rows)
    }, [props, rows])

    const updateColumnsIfChanged = useCallback(() => {
        if (columns < columnsInMap) { //Column was removed
            map.map((row) => {
                map = relocateActor(row, row.length - 1, map)
                return row.pop()
            })
        }
        if (columns > columnsInMap) //Column was added
            map.map((row, i) => map[i] = row.concat(EMPTY))

        props.setColumns(columns)

    }, [columns, props])

    useEffect(() => {
        updateRowsIfChanged()
        updateColumnsIfChanged()
        setMap(map)
    }, [props, updateColumnsIfChanged, updateRowsIfChanged]);


    return (
        <Stack sx={{ flexDirection: "column", height: "200px", justifyContent: "space-between", padding: "10px" }}>
            <IncDecButtons returnValue={setCol} initialValue={columns} min={1} max={12} label={t("scene.numCols")} testId="col" data-testid="map-col" />
            <IncDecButtons returnValue={setRow} initialValue={rows} min={1} max={10} label={t("scene.numRows")} testId="row" data-testid="map-row" />
        </Stack>
    )
}

export const SceneEdition = () => {
    const [, setCols] = useState(0)
    const [, setRows] = useState(0)

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <SizeEditor setColumns={setCols} setRows={setRows} />
            <SceneGrid />
            <SceneTools />
        </Stack>
    )
}
