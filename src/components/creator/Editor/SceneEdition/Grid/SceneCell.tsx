import styles from "./grid.module.css"
import { useContext, useEffect, useState } from "react"
import { CreatorContext } from "../../CreatorContext"
import { ACTOR, INITIAL_ROW, INITIAL_COL, OBSTACLE, setActorAtInitialPosition } from "../SceneEdition"
import { SceneMap, SceneType } from "../../../../serializedChallenge"
import { LocalStorage } from "../../../../../localStorage"

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

    const { selectedTool, currentMap } = useContext(CreatorContext)
    const [currentContent, setCurrentCell] = useState(props.content)

    const imagePath = `imagenes/sceneImages/${props.sceneType}`
    const backgroundCellImage = `${imagePath}/casilla.png`

    const objectsInCell = currentContent.split('&').filter(o => o !== '-')
    const objectStyle = (object: string) => styles[`img-${object}`] || styles['img-default']

    const hasMultipleObjects: boolean = objectsInCell.length > 1

    const cellHasActor: boolean = objectsInCell.includes(ACTOR)

    const isInitialCell: boolean = props.position.row === INITIAL_ROW && props.position.column === INITIAL_COL


    const handleClick = () => {
        if (selectedTool === OBSTACLE && cellHasActor){
            if(!isInitialCell){
                setCurrentCell(selectedTool)
                relocateActor()
            }
        }else{
            setCurrentCell(selectedTool)
        }
    }

    const relocateActor = () => {
        //this is going to change in the refactor 
        const challenge = LocalStorage.getCreatorChallenge()

        challenge!.scene.maps[currentMap.index] = setActorAtInitialPosition(challenge!.scene.maps[currentMap.index])
        LocalStorage.saveCreatorChallenge(challenge)
    }

    useEffect(() => {
        const challenge = LocalStorage.getCreatorChallenge()
        challenge!.scene.maps[currentMap.index] = mapWithNewCellContent(challenge!.scene.maps[currentMap.index], currentContent)
        LocalStorage.saveCreatorChallenge(challenge)
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
                key={'&' + obj}
                src={`${imagePath}/${obj}.png`}
                alt={obj}
                className={objectStyle(obj)} />
        )}
    </div>
}