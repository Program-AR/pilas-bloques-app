import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { scene } from "../scene"
import { interpreterFactory } from "./interpreterFactory"
import Interpreter from "js-interpreter"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, PlayArrow } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { EndDialog } from "./EndChallengeDialog"

type ExecuteButtonProps = {
  challenge: Challenge
}

export const ExecuteButton = ({ challenge }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const [showModal, setShowModal] = useState(false)
  const [finishedExecution, setFinishedExecution] = useState(false)
  const { t } = useTranslation('challenge')

  const handleExcecute = async () => {
    await scene.restartScene(challenge.sceneDescriptor)
    executeUntilEnd(interpreterFactory.createInterpreter()).then((finished) => { if (finished) whenExecuteEnd() })
  }

  const whenExecuteEnd = async () => {
    setFinishedExecution(true)
    const solved = await scene.isTheProblemSolved()
    if (solved)
      setShowModal(true)
  }

  const executeUntilEnd = (interpreter: Interpreter) => {
    return new Promise((success, reject) => {

      let moreToExecute: boolean

      const executeInterpreter = (interpreter: Interpreter) => {
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

      executeInterpreter(interpreter)
    })
  }

  return <>
    <Tooltip title={t('run.tooltip')}>
      {isSmallScreen ?
        <IconButton className={styles['icon-button']} onClick={handleExcecute} data-testid='execute-button' data-finishedExecution={finishedExecution}>
          <Stack>
            <Circle color='success' className={styles['circle-icon']} />
            <PlayArrow className={styles['icon']} />
          </Stack>
        </IconButton >
        :
        <Button variant="contained" color="success" onClick={handleExcecute} data-testid='execute-button' data-finishedExecution={finishedExecution}>{t("run.label")} </Button>
      }
    </Tooltip>
    <EndDialog showModal={showModal} setShowModal={setShowModal} />
  </>
}