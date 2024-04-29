import { Box, Button, IconButton, Stack } from "@mui/material"
import { PBCard } from "../PBCard"
import { Circle, PlayCircle, SkipNext } from "@mui/icons-material"
import { PBSwitch, pbIconStyle } from "../PBSwitch"
import BoltIcon from '@mui/icons-material/Bolt';
import { useThemeContext } from "../../theme/ThemeContext";

export const SceneButtons = () => {
    return <PBCard>
        <Button variant="contained" color="success" >{"Ejecutar"}</Button>
    </PBCard>
}

export const SceneButtonsVertical = () => {
    return <Stack gap={2} alignItems='center'>
        <TurboModeSwitch />
        <NextStepButton />
        <ExecuteButton />
    </Stack>

}

const NextStepButton = () => {
    return <IconButton sx={{ width: '45%' }}>
        <Stack>
            <Circle sx={{ position: 'absolute', color: '#31b0d5', transform: 'scale(2.2)' }} />
            <SkipNext sx={{ color: 'white', transform: 'scale(1.4)' }} />
        </Stack>
    </IconButton>
}

const ExecuteButton = () => {
    return <IconButton sx={{ width: '45%' }} color='success' size="large">
        <PlayCircle sx={{ transform: 'scale(2.2)' }} />
    </IconButton>
}

const TurboModeSwitch = () => {
    const { theme } = useThemeContext()

    return <PBSwitch
        icon={<BoltIcon sx={pbIconStyle(theme)} />}
        checkedIcon={<BoltIcon sx={pbIconStyle(theme)} />}
        onChange={() => { }} />
}