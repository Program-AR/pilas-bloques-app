import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { MobileStepper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../../../theme/ThemeContext";
import { PBCard } from "../../../../PBCard";
import { CreatorContext } from "../../CreatorContext";
import { IconButtonTooltip } from "../IconButtonTooltip";
import { SceneGrid, SceneGridProps } from "./SceneGrid";

export const Scenarios = (props: SceneGridProps) => {
    const { index, maps, setIndex } = useContext(CreatorContext)

    const { theme } = useThemeContext()

    const { t } = useTranslation('creator');

    const isVerySmallScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

    const isFirstMap = index === 0
    const isLastMap = index === maps.length - 1

    const handleBack = () => {
        setIndex(index - 1)
    }

    const handleNext = () => {
        setIndex(index + 1)
    }

    return <PBCard sx={{ flexGrow: 1 }}>
        <Stack width='100%' justifyContent='space-between' alignItems='center'>
            <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>{`${isVerySmallScreen ? '' : t("mapNavigation.multipleInitialScenarios") + ':'} ${index + 1} / ${maps.length}`}</Typography>
            <Stack width='100%' direction='row' justifyContent='space-around' alignItems='center'>
                <IconButtonTooltip sx={{ marginLeft: theme.spacing(1), visibility: isFirstMap ? "hidden" : "visible"}} disabled={isFirstMap} onClick={handleBack} icon={<KeyboardArrowLeft />} tooltip={t("mapNavigation.prev")} /> 
                <SceneGrid styling={props.styling} />
                <IconButtonTooltip sx={{ marginRight: theme.spacing(1), visibility: isLastMap ? "hidden" : "visible"}} disabled={isLastMap} onClick={handleNext} icon={<KeyboardArrowRight />} tooltip={t("mapNavigation.next")} /> 
            </Stack>
            <MobileStepper
                variant="dots"
                style={{ margin: theme.spacing(1), backgroundColor: 'transparent' }}
                position='static'
                backButton={<span />}
                nextButton={<span />}
                activeStep={index}
                steps={maps.length} />
        </Stack>
    </PBCard>
}
