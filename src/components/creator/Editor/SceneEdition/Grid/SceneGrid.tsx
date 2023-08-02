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
import { useTranslation } from "react-i18next"

type SceneGridProps = {
    styling?: CSSProperties
}

export const SceneGrid = (props: SceneGridProps) => {
    const { currentMap, index, maps, setIndex } = useContext(CreatorContext)

    const { t } = useTranslation('creator');

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const sceneType: SceneType = challenge.scene.type

    const atFirstMap = index === 0
    const atLastMap = index === maps.length - 1


    const handleBack = () => {
        if (atFirstMap) return
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (atLastMap) return
        setIndex(index + 1)
    }

    return <PBCard sx={{ flexGrow: 1, justifyContent: "space-evenly" }}>
        <IconButtonTooltip disabled={atFirstMap} onClick={handleBack} icon={<KeyboardArrowLeft />} tooltip={t("mapNavigation.prev")} />
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
                variant="dots"
                classes={{ dotActive: styles['active-dot'] }}
                style={{ margin: '15px' }}
                position='static'
                backButton={<span />}
                nextButton={<span />}
                activeStep={index}
                steps={maps.length} />

        </Stack>
        <IconButtonTooltip disabled={atLastMap} onClick={handleNext} icon={<KeyboardArrowRight />} tooltip={t("mapNavigation.next")} />
    </PBCard>
}
