import { IconButton, Stack } from "@mui/material"
import { PBCard } from "../../PBCard"
import { Info } from "@mui/icons-material"
import { PBSwitch, pbIconStyle } from "../../PBSwitch"
import BoltIcon from '@mui/icons-material/Bolt';
import { useThemeContext } from "../../../theme/ThemeContext";
import { ExecuteButton } from "./Execute"
import { Challenge } from "../../../staticData/challenges"

import { scene } from "../scene"
import { StepByStepButton } from "./StepByStep"


type SceneButtonsProps = {
  challenge: Challenge
  vertical?: boolean
  running?: boolean
  setRunning?: (running: boolean) => void
}

const shouldShow = process.env.NODE_ENV !== 'production'

export const SceneButtons = ({ challenge, vertical, running, setRunning }: SceneButtonsProps) => {

  return <PBCard sx={{ justifyContent: 'space-between', padding: '7px' }}>
    {!vertical &&
      <Stack direction='row' justifyContent='flex-start' flexGrow={2} spacing={2} marginRight='7px'>
        {shouldShow && <StepByStepButton challenge={challenge} running={running} setRunning={setRunning}/>}
        <ExecuteButton challenge={challenge} running={running} setRunning={setRunning} />
      </Stack>}
    {!vertical && shouldShow && <TurboModeSwitch />}
    {vertical &&
      <Stack gap={2} alignItems='center'>
        {shouldShow && <StepByStepButton challenge={challenge} running={running} setRunning={setRunning}/>}
        <ExecuteButton challenge={challenge} running={running} setRunning={setRunning} />        
        {shouldShow && <TurboModeSwitch />}
      </Stack>}
  </PBCard>
}

const TurboModeSwitch = () => {
  const { theme } = useThemeContext()


  const handleTurboMode = async () => {
    const active = await scene.isTurboModeActive()
    if (!active)
      return scene.enableTurboMode()
    else
      return scene.disableTurboMode()
  }

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
    onChange={() => handleTurboMode()} />
}

type InfoButtonProps = {
  onClick: () => void
}

export const InfoButton = ({ onClick }: InfoButtonProps) => {
  return <IconButton onClick={onClick}>
    <Info color="primary" />
  </IconButton>
}