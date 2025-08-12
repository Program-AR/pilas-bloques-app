import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { scene } from "../scene"
import { interpreterFactory } from "./interpreterFactory"
import Interpreter from "js-interpreter"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, PlayArrow, ReplayOutlined } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { EndDialog } from "./EndChallengeDialog"

type ExecuteButtonProps = {
  challenge: Challenge
  running?: boolean
  setRunning?: (running: boolean) => void
  step?: boolean
}

export const ExecuteButton = ({ challenge, running, setRunning, step }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const [showModal, setShowModal] = useState(false)
  const [finishedExecution, setFinishedExecution] = useState(false)
  const { t } = useTranslation('challenge')

  const handleExcecute = async () => {
    setRunning && setRunning(true)
    await scene.restartScene(challenge.sceneDescriptor)
    executeUntilEnd(interpreterFactory.createInterpreter(), step).then((finished) => { if (finished) whenExecuteEnd() })
  }

  const whenExecuteEnd = async () => {
    setFinishedExecution(true)
    setRunning && setRunning(false)
    const solved = await scene.isTheProblemSolved()
    if (solved)
      setShowModal(true)
  }

  const executeUntilEnd = (interpreter: Interpreter, stepByStep: boolean = false) => {
    return new Promise((success, reject) => {

      let moreToExecute: boolean

      const executeInterpreter = (interpreter: Interpreter, stepAction: boolean = false) => {
        try {
          moreToExecute = interpreter.run();
        } catch (e) {
          console.log(e);
          reject(e);
        }
        if (moreToExecute) {
          setTimeout(executeInterpreter, 10, interpreter)
        } else {
          success({ finished: true })
        }
      }
      executeInterpreter(interpreter, stepByStep)
    })
  }

  return <>
    {running || finishedExecution ? (
      <Tooltip title={t('restart.tooltip')}>
        {isSmallScreen ?
          <IconButton className={styles['icon-button']} onClick={handleExcecute}
            data-testid='restart-button' data-finishedexecution={finishedExecution}>
            <Stack>
              <Circle color='secondary' className={styles['circle-icon']} />
              <ReplayOutlined className={styles['icon']} />
            </Stack>
          </IconButton >
          :
          <Button className={styles['scene-button']}
            sx={{color: '#fff'}}
            startIcon={<ReplayOutlined />} variant="contained" color="secondary" onClick={handleExcecute} data-testid='restart-button' data-finishedexecution={finishedExecution}>{t("restart.label")} </Button>
        }
      </Tooltip>) : (
      <Tooltip title={t('run.tooltip')}>
        {isSmallScreen ?
          <IconButton className={styles['icon-button']} onClick={handleExcecute} data-testid='execute-button' data-finishedexecution={finishedExecution}>
            <Stack>
              <Circle color='success' className={styles['circle-icon']} />
              <PlayArrow className={styles['icon']} />
            </Stack>
          </IconButton >
          :
          <Button className={styles['scene-button']} startIcon={<PlayArrow />} variant="contained" color="success" onClick={handleExcecute} data-testid='execute-button' data-finishedexecution={finishedExecution}>{t("run.label")} </Button>
        }
      </Tooltip>
    )}
    <EndDialog showModal={showModal} setShowModal={setShowModal} />
  </>
}