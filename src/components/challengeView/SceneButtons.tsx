import { Button, IconButton, Stack } from "@mui/material"
import { PBCard } from "../PBCard"
import { PlayArrow } from "@mui/icons-material"
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
        <Stack sx={{width: '10vh', justifyContent: 'space-between'}}>
            <TurboModeSwitch/>
            <IconButton onClick={() => { }}>
                <PlayArrow color="primary" />
            </IconButton>
        </Stack>
    </PBCard>
}

const TurboModeSwitch = () => {
    const { theme } = useThemeContext()

    return <PBSwitch
        icon={< BoltIcon sx={pbIconStyle(theme)} />}
        checkedIcon={<BoltIcon sx={pbIconStyle(theme)} />}
        onChange={() => { }} />
}