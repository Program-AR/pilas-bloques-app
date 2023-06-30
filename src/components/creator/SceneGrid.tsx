import { Stack } from "@mui/material"
import { SceneMap, SerializedChallenge } from "../serializedChallenge"
import { LocalStorage } from "../../localStorage"
import { defaultMaps } from "../serializedChallenge"
import styles from "./grid.module.css"

export const SceneGrid = () => {

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const maps: SceneMap[] = challenge ? challenge.scene.maps : defaultMaps

    return <Stack className={styles.grid + ' ' + styles.border} >
        {maps[0].map((row, i) =>
            <Stack key={i + row.join(',')} direction="row" data-testid="challenge-row">
                {row.map((cellContent, j) => <Cell key={i * 100 + j + cellContent} testId="challenge-cell">{cellContent}</Cell>)}
            </Stack>)}
    </Stack>
}

const Cell: React.FC<CellProps> = (props) =>
    <div data-testid={props.testId} className={styles.cell + ' ' + styles.border}>
        {props.children}
    </div>

interface CellProps { children: React.ReactNode, testId: string }