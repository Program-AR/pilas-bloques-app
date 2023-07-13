import { Stack } from "@mui/material"
import { SceneMap, SceneType, SerializedChallenge, defaultChallenge } from "../../../../serializedChallenge"
import { LocalStorage } from "../../../../../localStorage"
import styles from "./grid.module.css"
import { SceneCell } from "./SceneCell"

type SceneGridProps = {
    mapIndex: number
}

export const SceneGrid = (props: SceneGridProps) => {
    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const maps: SceneMap[] = challenge.scene.maps
    const sceneType: SceneType = challenge.scene.type

    return <Stack className={styles.grid + ' ' + styles.border}>
        {maps[props.mapIndex].map((row, i) =>
            <Stack key={i + row.join(',')} direction="row" data-testid="challenge-row">
                {row.map((cellContent, j) =>
                    <SceneCell
                        position={{ mapIndex: props.mapIndex, row: i, column: j }}
                        key={i * 100 + j + cellContent}
                        content={cellContent}
                        sceneType={sceneType} />)}
            </Stack>)}
    </Stack>
}

