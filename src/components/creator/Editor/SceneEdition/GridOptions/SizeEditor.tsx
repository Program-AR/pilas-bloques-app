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

    const { currentMap, setCurrentMap } = useContext(CreatorContext)
    const [width, setWidth] = useState('')

    const rows = currentMap.length
    const columns = currentMap[INITIAL_ROW].length

    const addColumn = () => {
        currentMap.forEach((row, i) => currentMap[i] = row.concat(EMPTY))

        setCurrentMap(currentMap)
    }

    const removeColumn = () => {
        currentMap.forEach((row) => {row.pop()})
        relocateActorIfRemoved(currentMap)

        setCurrentMap(currentMap)
    }

    const addRow = () => {
        currentMap.push(currentMap[INITIAL_ROW].slice().fill(EMPTY))

        setCurrentMap(currentMap)
    }

    const removeRow = () => {
        currentMap.pop()
        relocateActorIfRemoved(currentMap)

        setCurrentMap(currentMap)
    }

    const updateStyleGrid = useCallback(() => {
        const widthValue = ((columns / rows) * 75).toFixed(0) + '%';
        if (width !== widthValue) {
            setWidth(widthValue)
            props.setStyleGrid({width: widthValue})
        }
    }, [props, width, columns, rows])

    useEffect(() => {
        updateStyleGrid()
    }, [props, updateStyleGrid]);

    
    return (
            <Stack sx={{ flexDirection: "column", maxWidth: "200px", justifyContent: "space-between", padding: "10px" }}>
                <IncDecButtons add={addColumn} remove={removeColumn} value={columns} min={1} max={10} label={t("scene.numCols")} testId="col" data-testid="map-col" />
                <IncDecButtons add={addRow} remove={removeRow} value={rows} min={1} max={12} label={t("scene.numRows")} testId="row" data-testid="map-row" />
            </Stack>
    )
}