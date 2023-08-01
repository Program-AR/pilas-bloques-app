import styles from "./grid.module.css"
import { useContext } from "react"
import { CreatorContext } from "../../CreatorContext"
import { ACTOR, INITIAL_ROW, INITIAL_COL, OBSTACLE, EMPTY, setActorAtPosition, actorPosition, hasActor } from "../mapUtils"
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

    let { selectedTool, currentMap, setCurrentMap } = useContext(CreatorContext)

    const imagePath = `imagenes/sceneImages/${props.sceneType}`
    const backgroundCellImage = `${imagePath}/casilla.png`

    const currentContent = props.content

    const objectsInCell = currentContent.split('&').filter(o => o !== '-')

    const objectStyle = (object: string) => styles[`img-${object}`] || styles['img-default']

    const hasMultipleObjects = (cellObjects = objectsInCell): boolean => cellObjects.length > 1

    const isInitialCell: boolean = props.position.row === INITIAL_ROW && props.position.column === INITIAL_COL

    const handleClick = () => {
        setCurrentMap(updatedMap())
    }

    const updatedMap = (): SceneMap => {
        switch (selectedTool) {
            case OBSTACLE: return handleObstacle();
            case EMPTY: return handleEraser();
            case ACTOR: return handleActor();
        }
        return handlePrize();
    }

    const handleActor = (): SceneMap => {
        return setActorAtPosition(deletedActorMap(), props.position.row, props.position.column)
    }
    
    const handleEraser = (): SceneMap => {
        if (hasActor(currentContent) && isInitialCell && !hasMultipleObjects()) return currentMap; // We can't erase actor on the initial cell
        if (hasActor(currentContent) && !hasMultipleObjects()) currentMap = setActorAtPosition(currentMap)
        return mapWithNewCellContent(hasMultipleObjects() ? ACTOR : EMPTY)
    }

    const handlePrize = (): SceneMap => {
        return mapWithNewCellContent(hasActor(currentContent) ? ACTOR + '&' + selectedTool : selectedTool)
    }

    const handleObstacle = (): SceneMap => {
        if (hasActor(currentContent) && isInitialCell) return currentMap; // We can't replace actor on the initial cell
        if (hasActor(currentContent) && !isInitialCell) currentMap = setActorAtPosition(currentMap)
        return mapWithNewCellContent(selectedTool)
    }

    const deletedActorMap = () => {
        let prevPos = actorPosition(currentMap)
        if (!prevPos) return currentMap //if there is no actor in the map

        let cellObjects = currentMap[prevPos.row][prevPos.column].split('&')
        currentMap[prevPos.row][prevPos.column] = hasMultipleObjects(cellObjects) ? cellObjects[1] : EMPTY

        return currentMap
    }

    const mapWithNewCellContent = (content: string, position: Position = props.position): SceneMap => {
        currentMap[position.row][position.column] = content
        return currentMap
    }

    return <div
        data-testid="challenge-cell"
        className={styles.cell}
        style={{ backgroundImage: `url(${backgroundCellImage})`, justifyContent: !hasMultipleObjects() ? 'center' : '' }}
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