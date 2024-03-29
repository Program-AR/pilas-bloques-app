import { Stack } from "@mui/material"
import { SceneType, SerializedChallenge, defaultChallenge } from "../../../../serializedChallenge"
import { LocalStorage } from "../../../../../localStorage"
import styles from "./grid.module.css"
import { SceneCell } from "./SceneCell"
import { useContext, CSSProperties } from "react"
import { CreatorContext } from "../../CreatorContext"

export type SceneGridProps = {
    styling?: CSSProperties
}

export const SceneGrid = (props: SceneGridProps) => {
    const { currentMap } = useContext(CreatorContext)

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const sceneType: SceneType = challenge.scene.type

    return <Stack justifyContent='flex-start' className={styles.grid} style={props.styling} data-testid="dummy-test-scene-grid">
        {currentMap.map((row, i) =>
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
