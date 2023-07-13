import { Stack } from "@mui/material"
import { SceneMap, SceneType, SerializedChallenge, defaultChallenge } from "../../../../serializedChallenge"
import { LocalStorage } from "../../../../../localStorage"
import styles from "./grid.module.css"
import { SceneCell } from "./SceneCell"
import { useContext } from "react"
import { CreatorContext } from "../../CreatorContext"


export const SceneGrid = () => {

    const { currentMap } = useContext(CreatorContext)

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const maps: SceneMap[] = challenge.scene.maps
    const sceneType: SceneType = challenge.scene.type

    return <Stack className={styles.grid + ' ' + styles.border}>
        {maps[currentMap.index].map((row, i) =>
            <Stack key={i + row.join(',')} direction="row" data-testid="challenge-row">
                {row.map((cellContent, j) =>
                    <SceneCell
                        position={{ row: i, column: j }}
                        key={i * 100 + j + cellContent}
                        content={cellContent}
                        sceneType={sceneType} />)}
            </Stack>)}
    </Stack>
}

