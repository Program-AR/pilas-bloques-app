import styles from "./grid.module.css"
import { useContext, useEffect, useState } from "react"
import { CreatorContext } from "../../CreatorContext"
import { ACTOR, OBSTACLE, setActorAtInitialPosition } from "../SceneEdition"
import { SceneMap, SceneType } from "../../../../serializedChallenge"
import { LocalStorage } from "../../../../../localStorage"

type CellProps = {
    position: Position
    content: string,
    sceneType: SceneType
}

type Position = {
    mapIndex: number,
    row: number,
    column: number
}

export const SceneCell: React.FC<CellProps> = (props) => {

    const { selectedTool } = useContext(CreatorContext)
    const [currentCell, setCurrentCell] = useState(props.content)

    const imagePath = `imagenes/sceneImages/${props.sceneType}`
    const backgroundCellImage = `${imagePath}/casilla.png`

    const objectsInCell = currentCell.split('&').filter(o => o !== '-')
    const objectStyle = (object: string) => styles[`img-${object}`] || styles['img-default']

    const hasMultipleObjects = objectsInCell.length > 1

    const cellHasActor: boolean = objectsInCell.includes(ACTOR)

    const handleClick = () => {
        if(selectedTool === OBSTACLE && cellHasActor) relocateActor()
        setCurrentCell(selectedTool)
    }

    const relocateActor = () => {
        //this is going to change in the refactor 
        const challenge = LocalStorage.getCreatorChallenge()
        const currentMapIndex = props.position.mapIndex

        challenge!.scene.maps[currentMapIndex] = setActorAtInitialPosition(challenge!.scene.maps[currentMapIndex])
        LocalStorage.saveCreatorChallenge(challenge)
    }

    useEffect(() => {
        const challenge = LocalStorage.getCreatorChallenge()
        challenge!.scene.maps[props.position.mapIndex] = mapWithNewCellContent(challenge!.scene.maps[props.position.mapIndex], currentCell)
        LocalStorage.saveCreatorChallenge(challenge)
    }, [currentCell])

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
                key={'&' + obj}
                src={`${imagePath}/${obj}.png`}
                alt={obj}
                className={objectStyle(obj)} />
        )}
    </div>
}