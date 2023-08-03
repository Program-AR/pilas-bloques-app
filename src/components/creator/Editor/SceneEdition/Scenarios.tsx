import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PBCard } from "../../../PBCard";
import { CreatorContext } from "../CreatorContext";
import { IconButtonTooltip } from "./IconButtonTooltip";
import { SceneGrid } from "./Grid/SceneGrid";

export const Scenarios = () => {
    const { index, maps, setIndex } = useContext(CreatorContext)

    const { t } = useTranslation('creator');

    const atFirstMap = index === 0
    const atLastMap = index === maps.length - 1

    const multipleScenarios: boolean = maps.length > 1

    const handleBack = () => {
        if (atFirstMap) return
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (atLastMap) return
        setIndex(index + 1)
    }

    return <PBCard sx={{ flexGrow: 1, justifyContent: "space-evenly" }}>
        <Stack direction='column' sx={{ alignItems: 'center' }}>
                <Typography>{`${multipleScenarios ? 'Escenarios iniciales' : 'Escenario inicial'} ${index + 1} / ${maps.length}`}</Typography>
            <Stack direction='row' sx={{ alignItems: 'center' }}>
                <IconButtonTooltip disabled={atFirstMap} onClick={handleBack} icon={<KeyboardArrowLeft />} tooltip={t("mapNavigation.prev")} />
                <SceneGrid />
                <IconButtonTooltip disabled={atLastMap} onClick={handleNext} icon={<KeyboardArrowRight />} tooltip={t("mapNavigation.next")} />
            </Stack>
            <MobileStepper
                variant="dots"
                classes={{}}
                style={{ margin: '15px' }}
                position='static'
                backButton={<span />}
                nextButton={<span />}
                activeStep={index}
                steps={maps.length} />
        </Stack>
    </PBCard>
}
