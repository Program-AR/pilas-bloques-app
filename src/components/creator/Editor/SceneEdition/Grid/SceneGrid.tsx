import { MobileStepper, Stack } from "@mui/material"
import { SceneType, SerializedChallenge, defaultChallenge } from "../../../../serializedChallenge"
import { LocalStorage } from "../../../../../localStorage"
import styles from "./grid.module.css"
import { SceneCell } from "./SceneCell"
import { useContext, CSSProperties } from "react"
import { CreatorContext } from "../../CreatorContext"
import { PBCard } from "../../../../PBCard"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { IconButtonTooltip } from "../IconButtonTooltip"

type SceneGridProps = {
     styling?: CSSProperties
}

export const SceneGrid = (props: SceneGridProps) => {
    const { currentMap, index, maps, setIndex } = useContext(CreatorContext)

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const sceneType: SceneType = challenge.scene.type

    const handleBack = () => {
        if(index === 0) return
        setIndex(index - 1)
    }

    const handleNext = () => {
        if(index === maps.length - 1) return 
        setIndex(index + 1)
    }

    return <PBCard sx={{flexGrow: 1, justifyContent:"space-evenly"}}>
        <IconButtonTooltip onClick={handleBack} icon={<KeyboardArrowLeft/>} tooltip={'Anterior'}/>
        <Stack className={styles.grid} style={props.styling}>
            {currentMap.map((row, i) =>
                <Stack key={i + row.join(',')} direction="row" data-testid="challenge-row">
                    {row.map((cellContent, j) =>
                        <SceneCell
                            position={{ row: i, column: j }}
                            key={i * 100 + j + cellContent}
                            content={cellContent}
                            sceneType={sceneType} />)}
                </Stack>)}
        <MobileStepper 
            style={{margin: '15px'}}
            position='static' 
            backButton={<span/>} 
            nextButton={<span/>}
            activeStep={index} 
            steps={maps.length}/>
        </Stack>
        <IconButtonTooltip disabled={false} onClick={handleNext} icon={<KeyboardArrowRight/>} tooltip={'Anterior'}/>
    </PBCard>
}
