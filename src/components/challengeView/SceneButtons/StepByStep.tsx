import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, SkipNext } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useTranslation } from "react-i18next"
import { EndDialog } from "./EndChallengeDialog"
import { useInterpreterRunner } from "./useInterpreterRunner"

type ExecuteButtonProps = {
  challenge: Challenge
  running?: boolean
  setRunning?: (running: boolean) => void
  interpreterVersion: number
}

export const StepByStepButton = ({ challenge, running, setRunning, interpreterVersion }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const { t } = useTranslation('challenge')

  const { run, showModal, setShowModal, stepping } = useInterpreterRunner(challenge, setRunning, 'step', interpreterVersion);

  return <>
    <Tooltip title={t('stepByStepRun.tooltip')}>
      {isSmallScreen ?
        <IconButton className={styles['icon-button']} disabled={running && !stepping} onClick={run}
          data-testid='step-button'>
          <Stack>
            <Circle className={styles['circle-icon']} sx={{ color: '#31b0d5' }} />
            <SkipNext className={styles['icon']} />
          </Stack>
        </IconButton>
        :
        <Button className={styles['scene-button']} disabled={running && !stepping} startIcon={<SkipNext />} variant="contained" sx={{ backgroundColor: "#31b0d5" }} onClick={run}>{t("stepByStepRun.label")}</Button>
      }
    </Tooltip>
    <EndDialog showModal={showModal} setShowModal={setShowModal} />
  </>
}