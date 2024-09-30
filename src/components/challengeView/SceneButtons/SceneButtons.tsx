import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { PBCard } from "../../PBCard"
import { Circle, Info, SkipNext } from "@mui/icons-material"
import { PBSwitch, pbIconStyle } from "../../PBSwitch"
import styles from './sceneButtons.module.css'
import BoltIcon from '@mui/icons-material/Bolt';
import { useThemeContext } from "../../../theme/ThemeContext";
import { ExecuteButton } from "./Execute"
import { Challenge } from "../../../staticData/challenges"
import { useTranslation } from "react-i18next"

type SceneButtonsProps = {
  challenge: Challenge
}

const shouldShow = process.env.NODE_ENV !== 'production'

export const SceneButtons = ({ challenge }: SceneButtonsProps) => {
  return <PBCard sx={{justifyContent: 'space-between'}}>
    { shouldShow ? <NextStepButton /> :<></> }
    <ExecuteButton challenge={challenge} />
    { shouldShow ? <TurboModeSwitch /> :<></> }
  </PBCard>
}

export const SceneButtonsVertical = ({ challenge }: SceneButtonsProps) => {
  return <Stack gap={2} alignItems='center'>
    { shouldShow ? <NextStepButton /> :<></> }
    <ExecuteButton challenge={challenge} />
    { shouldShow ? <TurboModeSwitch /> :<></> }
  </Stack>
}

const NextStepButton = () => {
  const { t } = useTranslation('challenge');
  const { isSmallScreen } = useThemeContext()

  return <Tooltip title={t('stepByStepRun.tooltip')}>
    {isSmallScreen ?
      <IconButton className={styles['icon-button']}>
        <Stack>
          <Circle className={styles['circle-icon']} sx={{ color: '#31b0d5' }} />
          <SkipNext className={styles['icon']} />
        </Stack>
      </IconButton>
      :
      <Button variant="contained" sx={{ backgroundColor: "#31b0d5" }} onClick={() => { }}>{t("stepByStepRun.label")}</Button>
    }
  </Tooltip>
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