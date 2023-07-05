import { Stack } from "@mui/material"
import { SceneMap, SceneType, SerializedChallenge, defaultChallenge } from "../serializedChallenge"
import { LocalStorage } from "../../localStorage"
import styles from "./grid.module.css"

export const SceneGrid = () => {

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge =  storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const maps: SceneMap[] = challenge.scene.maps
    const sceneType: SceneType = challenge.scene.type

    return <Stack className={styles.grid} >
        {maps[0].map((row, i) =>
            <Stack key={i + row.join(',')} direction="row" data-testid="challenge-row">
                {row.map((cellContent, j) =>
                    <SceneCell
                        key={i * 100 + j + cellContent}
                        content={cellContent}
                        sceneType={sceneType} />)}
            </Stack>)}
    </Stack>
}

interface CellProps {
    content: string,
    sceneType: SceneType
}

export const SceneCell: React.FC<CellProps> = (props) => {

    const imagePath = `imagenes/sceneImages/${props.sceneType}`
    const backgroundCellImage = `${imagePath}/casilla.png`

    const objectsInCell = props.content.split('&').filter(o => o !== '-')
    const objectStyle = (object: string) => styles[`img-${object}`] || styles['img-default']

    return <div
        data-testid="challenge-cell"
        className={styles.cell}
        style={{ backgroundImage: `url(${backgroundCellImage})` }}>
        {objectsInCell.map(obj =>
            <img
                data-testid="challenge-cell-image"
                key={'&'+obj}
                src={`${imagePath}/${obj}.png`}
                alt={obj}
                className={objectStyle(obj)} />
        )}
    </div>
}
