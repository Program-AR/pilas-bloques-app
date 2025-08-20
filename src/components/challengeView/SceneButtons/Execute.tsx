import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, PlayArrow, ReplayOutlined } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useTranslation } from "react-i18next"
import { EndDialog } from "./EndChallengeDialog"
import { useInterpreterRunner } from "./useInterpreterRunner"
import { useState } from "react"

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
  const [hasFinished, setHasFinished] = useState(false);

  const { run, showModal, setShowModal } = useInterpreterRunner(challenge, setRunning, 'run', interpreterVersion);

  const handleRun = async () => {
    setHasFinished(false);
    setRunning!(true);
    await run();
    setHasFinished(true);
  };

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    }
    setHasFinished(false);
    setRunning!(false);
  };

  const showRestartState = running || hasFinished;

  return <>
    {showRestartState ? (
      <Tooltip title={t('restart.tooltip')}>
        {isSmallScreen ?
          <IconButton className={styles['icon-button']} onClick={handleRestart}
            data-testid='execute-button' data-finishedexecution={false}>
            <Stack>
              <Circle color='secondary' className={styles['circle-icon']} />
              <ReplayOutlined className={styles['icon']} />
            </Stack>
          </IconButton >
          :
          <Button className={styles['scene-button']}
            sx={{ color: '#fff' }}
            startIcon={<ReplayOutlined />} variant="contained" color="secondary" onClick={handleRestart} data-finishedexecution={false} data-testid='execute-button'>{t("restart.label")} </Button>
        }
      </Tooltip>) : (
      <Tooltip title={t('run.tooltip')}>
        {isSmallScreen ?
          <IconButton className={styles['icon-button']} onClick={handleRun} data-testid='execute-button' data-finishedexecution={true}>
            <Stack>
              <Circle color='success' className={styles['circle-icon']} />
              <PlayArrow className={styles['icon']} />
            </Stack>
          </IconButton >
          :
          <Button className={styles['scene-button']} startIcon={<PlayArrow />} variant="contained" color="success" onClick={handleRun} data-finishedexecution={true} data-testid='execute-button'>{t("run.label")} </Button>
        }
      </Tooltip>
    )}
    <EndDialog showModal={showModal} setShowModal={setShowModal} />
  </>
}