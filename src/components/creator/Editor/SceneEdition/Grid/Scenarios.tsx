import { useContext } from "react";
import { CreatorContext } from "../../CreatorContext";
import { SceneGrid, SceneGridProps } from "./SceneGrid";
import { useTranslation } from "react-i18next";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Stack, Typography, MobileStepper, useMediaQuery } from "@mui/material";
import theme from "../../../../../theme";
import { PBCard } from "../../../../PBCard";
import { IconButtonTooltip } from "../IconButtonTooltip";

export const Scenarios = (props: SceneGridProps) => {
    const { index, maps, setIndex } = useContext(CreatorContext)

    const { t } = useTranslation('creator');

    const isVerySmallScreen: boolean = useMediaQuery(theme.breakpoints.down("sm"));

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

    return <PBCard sx={{ flexGrow: 1 }}>
        <Stack width='100%' justifyContent='space-between' alignItems='center'>
            <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>{`${isVerySmallScreen ? '' : t("mapNavigation.multipleInitialScenarios") + ':'} ${index + 1} / ${maps.length}`}</Typography>
            <Stack width='100%' direction='row' justifyContent='space-between' alignItems='center'>
                <IconButtonTooltip sx={{ marginLeft: theme.spacing(1) }} disabled={atFirstMap} onClick={handleBack} icon={<KeyboardArrowLeft />} tooltip={t("mapNavigation.prev")} />
                <SceneGrid styling={props.styling} />
                <IconButtonTooltip sx={{ marginRight: theme.spacing(1) }} disabled={atLastMap} onClick={handleNext} icon={<KeyboardArrowRight />} tooltip={t("mapNavigation.next")} />
            </Stack>
            <MobileStepper
                variant="dots"
                style={{ margin: theme.spacing(1), backgroundColor: 'var(--theme-background-color)' }}
                position='static'
                backButton={<span />}
                nextButton={<span />}
                activeStep={index}
                steps={maps.length} />
        </Stack>
    </PBCard>
}
