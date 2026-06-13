import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, PlayArrow, ReplayOutlined } from "@mui/icons-material"
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
  onRestart?: () => void
}

export const ExecuteButton = ({ challenge, running, setRunning, interpreterVersion, onRestart }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const { t } = useTranslation('challenge')

  const runValidations = async (): Promise<boolean> => {
    return runBlocklyValidations()
  }

  const { run, showModal, setShowModal } = useInterpreterRunner(challenge, setRunning, 'run', interpreterVersion, '', { runValidations });

  return <>
    {running ? (
      <Tooltip title={t('restart.tooltip')}>
        {isSmallScreen ?
          <IconButton className={styles['icon-button']} onClick={onRestart}
            data-testid='execute-button' data-finishedexecution={false}>
            <Stack>
              <Circle color='secondary' className={styles['circle-icon']} />
              <ReplayOutlined className={styles['icon']} />
            </Stack>
          </IconButton >
          :
          <Button className={styles['scene-button']}
            sx={{ color: '#fff' }}
            startIcon={<ReplayOutlined />} variant="contained" color="secondary" onClick={onRestart} data-finishedexecution={false} data-testid='execute-button'>{t("restart.label")} </Button>
        }
      </Tooltip>) : (
      <Tooltip title={t('run.tooltip')}>
        {isSmallScreen ?
          <IconButton className={styles['icon-button']} onClick={run} data-testid='execute-button' data-finishedexecution={true}>
            <Stack>
              <Circle color='success' className={styles['circle-icon']} />
              <PlayArrow className={styles['icon']} />
            </Stack>
          </IconButton >
          :
          <Button className={styles['scene-button']} startIcon={<PlayArrow />} variant="contained" color="success" onClick={run} data-finishedexecution={true} data-testid='execute-button'>{t("run.label")} </Button>
        }
      </Tooltip>
    )}
    <EndDialog showModal={showModal} setShowModal={setShowModal} />
  </>
}