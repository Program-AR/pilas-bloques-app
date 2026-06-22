import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, SkipNext } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useTranslation } from "react-i18next"
import { EndDialog } from "./EndChallengeDialog"
import { useInterpreterRunner } from "./useInterpreterRunner"
import { runBlocklyValidations } from "../../blockly/blocklyValidations"

type ExecuteButtonProps = {
  challenge: Challenge
  running?: boolean
  setRunning?: (running: boolean) => void
  interpreterVersion: number
}

export const StepByStepButton = ({ challenge, running, setRunning, interpreterVersion }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const { t } = useTranslation(['challenge', 'mulang'])

  const runValidations = async () => {
    return runBlocklyValidations(challenge, t)
  }

  const { run, showModal, setShowModal, stepping, mulangResults, solved } = useInterpreterRunner(challenge, setRunning, 'step', interpreterVersion, '', { runValidations });

  return <>
    <Tooltip title={t('stepByStepRun.tooltip')}>
      {isSmallScreen ?
        <IconButton className={styles['icon-button']} disabled={running && !stepping} onClick={run}
          data-testid='step-button'>
          <Stack>
            <Circle className={styles['circle-icon']} sx={{
              color: running && !stepping ? 'rgba(0,0,0,0.26)' : '#31b0d5',
              '&:hover': { color: '#269abc' },
            }} />
            <SkipNext className={styles['icon']} />
          </Stack>
        </IconButton>
        :
        <Button className={styles['scene-button']} disabled={running && !stepping} startIcon={<SkipNext />} variant="contained"
          sx={{
            backgroundColor: '#31b0d5',
            '&:hover': { backgroundColor: '#269abc' }
          }} onClick={run}>{t("stepByStepRun.label")}</Button>
      }
    </Tooltip>
    <EndDialog showModal={showModal} setShowModal={setShowModal} challenge={challenge} mulangResults={mulangResults} solved={solved}/>
  </>
}