import { Stack } from "@mui/material"
import { CSSProperties, useContext, useState, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { CreatorContext } from "../../CreatorContext"
import { INITIAL_ROW, EMPTY, relocateActorIfRemoved } from "../mapUtils"
import { IncDecButtons } from "./IncDecButtons"

export type StyleGridProps = {
    setStyleGrid: (style: CSSProperties) => void
}

export const SizeEditor = (props: StyleGridProps) => {
    const { t } = useTranslation("creator")

    const { map, setMap } = useContext(CreatorContext)
    const [width, setWidth] = useState('')
    
    const rows = map.length
    const columns = map[INITIAL_ROW].length

    const addColumn = () => {
        map.forEach((row, i) => map[i] = row.concat(EMPTY))

        setMap(map)
    }

    const removeColumn = () => {
        map.forEach((row) => {row.pop()})
        relocateActorIfRemoved(map)

        setMap(map)
    }

    const addRow = () => {
        map.push(map[INITIAL_ROW].slice().fill(EMPTY))

        setMap(map)
    }

    const removeRow = () => {
        map.pop()
        relocateActorIfRemoved(map)

        setMap(map)
    }

    const updateStyleGrid = useCallback(()=> {
        const widthValue = ((columns/rows)*50).toFixed(0) + '%';
        if ( width !== widthValue )
        {
            setWidth(widthValue)
            props.setStyleGrid({width: widthValue})
        }
    }, [props, width, columns, rows])

    useEffect(() => {
        updateStyleGrid()
    }, [props, updateStyleGrid]);

    
    return (
        <Stack sx={{ flexDirection: "column", height: "200px", justifyContent: "space-between", padding: "10px" }}>
            <IncDecButtons add={addColumn} remove={removeColumn} value={columns} min={1} max={12} label={t("scene.numCols")} testId="col" data-testid="map-col" />
            <IncDecButtons add={addRow} remove={removeRow} value={rows} min={1} max={10} label={t("scene.numRows")} testId="row" data-testid="map-row" />
        </Stack>
    )
}