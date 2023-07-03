import { Stack } from "@mui/material"
import { SceneMap, SceneType, SerializedChallenge } from "../serializedChallenge"
import { LocalStorage } from "../../localStorage"
import { defaultMaps } from "./Selection"
import styles from "./grid.module.css"

export const SceneGrid = () => {

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const maps: SceneMap[] = challenge ? challenge.scene.maps : defaultMaps
    console.log(maps)

    const sceneType: SceneType = challenge!.scene.type

    return <Stack className={styles.grid + ' ' + styles.border} >
        {maps[0].map((row, i) =>
            <Stack key={i + row.join(',')} direction="row" data-testid="challenge-row">
                {row.map((cellContent, j) =>
                    <Cell key={i * 100 + j + cellContent} testId="challenge-cell" sceneType={sceneType}>
                        <Content content={cellContent} sceneType={sceneType}></Content>
                    </Cell>)}
            </Stack>)}
    </Stack>
}

const imagePath = `imagenes/sceneImages`

interface ContentProps { content: string, sceneType: SceneType }

const Content: React.FC<ContentProps> = (props) => {

    const objectsInCell = props.content.split('&')
    console.log(objectsInCell)

    const objectStyle = (object: string) => styles['img-default'] + ' ' + styles[`img-${object}`]

    return <div className="content-images">
        {objectsInCell.map((obj, i) =>
            <img
                key={i + obj}//TODO revisar jey para que tenga la de la cell
                src={`${imagePath}/${props.sceneType}/${obj}.png`}
                alt={obj}
                className={objectStyle(obj)} />
        )}
    </div>

}

const Cell: React.FC<CellProps> = (props) => {

    const image = `${imagePath}/${props.sceneType}/casilla.png`

    return <div
        data-testid={props.testId}
        className={styles.cell}
        style={{ backgroundImage: `url(${image})` }}>
        {props.children}
    </div>
}

interface CellProps { children: React.ReactNode, testId: string, sceneType: SceneType }