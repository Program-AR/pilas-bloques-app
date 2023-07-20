import styles from "./grid.module.css"
import { useContext, useEffect, useState } from "react"
import { CreatorContext } from "../../CreatorContext"
import { ACTOR, INITIAL_ROW, INITIAL_COL, OBSTACLE, EMPTY, setActorAtPosition } from "../SceneEdition"
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

    let { selectedTool, map, setMap } = useContext(CreatorContext)

    const imagePath = `imagenes/sceneImages/${props.sceneType}`
    const backgroundCellImage = `${imagePath}/casilla.png`

    const objectsInCell = props.content.split('&').filter(o => o !== '-')

    const objectStyle = (object: string) => styles[`img-${object}`] || styles['img-default']

    const hasMultipleObjects: boolean = objectsInCell.length > 1

    const cellHasActor: boolean = objectsInCell.includes(ACTOR)

    const isInitialCell: boolean = props.position.row === INITIAL_ROW && props.position.column === INITIAL_COL

    const handleClick = () => {
        setMap(updatedMap())
    }

    const updatedMap = (): SceneMap => {
        switch (selectedTool) {
            case '': return map; //by context default
            case OBSTACLE: return handleObstacle();
            case EMPTY: return handleEraser();
            case ACTOR: return handleActor();
        }
        return handlePrize();
    }

    const handleActor = (): SceneMap => {
        return setActorAtPosition(deletedActorMap(), props.position.row, props.position.column)
    }

    const deletedActorMap = () => {
        let prevPos = actorPosition()
        let cell = map[prevPos.row][prevPos.column].split('&')
        map[prevPos.row][prevPos.column] = cell.length > 1 ? cell[1] : EMPTY
        return map
    }

    const handleEraser = (): SceneMap => {
        if (cellHasActor && isInitialCell && !hasMultipleObjects) return map; // We can't erase actor on the initial cell
        if (cellHasActor && !hasMultipleObjects) map = setActorAtPosition(map)
        return currentMapWithNewCellContent(hasMultipleObjects ? ACTOR : EMPTY)
    } 

    const handlePrize = (): SceneMap => {
        return currentMapWithNewCellContent(cellHasActor ? ACTOR + '&' + selectedTool : selectedTool)
    }

    const handleObstacle = (): SceneMap => {
        if (cellHasActor && isInitialCell) return map; // We can't replace actor on the initial cell
        if (cellHasActor && !isInitialCell) map = setActorAtPosition(map)
        return currentMapWithNewCellContent(selectedTool)
    } 

    const actorPosition = (): Position => {
        const hasActor = (cell: string) => cell.split('&').includes(ACTOR)
        let row = map.findIndex(row => row.some(hasActor))
        let column = map[row].findIndex(hasActor)
        return { row, column }
    }

    const currentMapWithNewCellContent = (content: string, position: Position = props.position): SceneMap => {
        map[position.row][position.column] = content
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