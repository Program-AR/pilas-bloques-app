import styles from "./grid.module.css"
import { useContext, useEffect, useState } from "react"
import { CreatorContext } from "../../CreatorContext"
import { ACTOR, INITIAL_ROW, INITIAL_COL, OBSTACLE, setActorAtInitialPosition } from "../SceneEdition"
import { SceneMap, SceneType } from "../../../../serializedChallenge"

type CellProps = {
    position: Position
    content: string,
    sceneType: SceneType
}

export type Position = {
    row: number,
    column: number
}

export const SceneCell: React.FC<CellProps> = (props) => {

    const { selectedTool, currentMap, changeMapAtCurrentIndex } = useContext(CreatorContext)
    const [currentContent, setCurrentContent] = useState(props.content)

    const imagePath = `imagenes/sceneImages/${props.sceneType}`
    const backgroundCellImage = `${imagePath}/casilla.png`

    const objectsInCell = currentContent.split('&').filter(o => o !== '-')

    const objectStyle = (object: string) => styles[`img-${object}`] || styles['img-default']

    const hasMultipleObjects: boolean = objectsInCell.length > 1

    const cellHasActor: boolean = objectsInCell.includes(ACTOR)

    const isInitialCell: boolean = props.position.row === INITIAL_ROW && props.position.column === INITIAL_COL


    const handleClick = () => {
        switch (selectedTool) {
            case '': break; //by context default
            case 'O': handleObstacle(); break;
        }
    }

    const handleObstacle = () => {
        if (cellHasActor && isInitialCell) return; // We can't replace actor on the initial cell
        if (cellHasActor && !isInitialCell) relocateActor()
        setCurrentContent(selectedTool) // obstacle replaces everything
    }

    const relocateActor = () => {
        changeMapAtCurrentIndex(setActorAtInitialPosition(currentMap.map))
    }

    useEffect(() => {
        if(currentContent !== props.content) changeMapAtCurrentIndex(mapWithNewCellContent(currentMap.map, currentContent))
    }, [currentContent])

    const mapWithNewCellContent = (map: SceneMap, content: string) => {
        map[props.position.row][props.position.column] = content
        return map
    }
    return <div
        data-testid="challenge-cell"
        className={styles.cell}
        style={{ backgroundImage: `url(${backgroundCellImage})`, justifyContent: !hasMultipleObjects ? 'center' : '' }}
        onClick={handleClick}>
        {objectsInCell.map(obj =>
            <img
                data-testid="challenge-cell-image"
                key={props.position.row * 100 + props.position.column + obj + '-img'}
                src={`${imagePath}/${obj}.png`}
                alt={obj}
                className={objectStyle(obj)} />
        )}
    </div>
}