import { IconButton, Stack } from "@mui/material"
import { PBCard } from "../../PBCard"
import { Circle, Info, PlayArrow, SkipNext } from "@mui/icons-material"
import { PBSwitch, pbIconStyle } from "../../PBSwitch"
import styles from './sceneButtons.module.css'
import BoltIcon from '@mui/icons-material/Bolt';
import { useThemeContext } from "../../../theme/ThemeContext";
import { ExecuteButton } from "./Execute"

export const SceneButtons = () => {
    return <PBCard>
        <ExecuteButton/>
    </PBCard>
}

export const SceneButtonsVertical = () => {
    return <Stack gap={2} alignItems='center'>
        <TurboModeSwitch />
        <NextStepButton />
        <ExcecuteButtonVertical />
    </Stack>
}

const NextStepButton = () => {
    return <IconButton className={styles['icon-button']}>
        <Stack>
            <Circle className={styles['circle-icon']} sx={{ color: '#31b0d5' }} />
            <SkipNext className={styles['icon']} />
        </Stack>
    </IconButton>
}

const ExcecuteButtonVertical = () => {
    return <IconButton className={styles['icon-button']}>
        <Stack>
            <Circle color='success' className={styles['circle-icon']} />
            <PlayArrow className={styles['icon']} />
        </Stack>
    </IconButton>
}

const TurboModeSwitch = () => {
    const { theme } = useThemeContext()

    return <PBSwitch
        sx={{
            "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                    "+ .MuiSwitch-track": {
                        backgroundColor: '#4ec2df',
                        opacity: 1,
                    }
                },
            },
        }}
        icon={<BoltIcon sx={pbIconStyle(theme)} />}
        checkedIcon={<BoltIcon sx={pbIconStyle(theme)} />}
        onChange={() => { }} />
}

type InfoButtonProps = {
    onClick: () => void
}

export const InfoButton = ({ onClick }: InfoButtonProps) => {
    return <IconButton onClick={onClick}>
        <Info color="primary" />
    </IconButton>
}