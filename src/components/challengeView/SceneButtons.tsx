import { Button, IconButton, Stack } from "@mui/material"
import { PBCard } from "../PBCard"
import { PlayCircle, NextPlan } from "@mui/icons-material"
import { PBSwitch, pbIconStyle } from "../PBSwitch"
import BoltIcon from '@mui/icons-material/Bolt';
import { useThemeContext } from "../../theme/ThemeContext";

export const SceneButtons = () => {
    return <PBCard>
        <Button variant="contained" color="success" >{"Ejecutar"}</Button>
    </PBCard>
}

export const SceneButtonsVertical = () => {
    return <PBCard>
        <Stack>
            <TurboModeSwitch />
            <NextStepButton />
            <ExecuteButton />
        </Stack>
    </PBCard>
}

const NextStepButton = () => {
    return <IconButton >
        <NextPlan />
    </IconButton>
}

const ExecuteButton = () => {
    return <IconButton color='success' size="large">
        <PlayCircle />
    </IconButton>
}

const TurboModeSwitch = () => {
    const { theme } = useThemeContext()

    return <PBSwitch
        icon={< BoltIcon sx={pbIconStyle(theme)} />}
        checkedIcon={<BoltIcon sx={pbIconStyle(theme)} />}
        onChange={() => { }} />
}