import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { scene } from "../scene"
import { interpreterFactory } from "./interpreterFactory"
import Interpreter from "js-interpreter"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, SkipNext } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { EndDialog } from "./EndChallengeDialog"

type ExecuteButtonProps = {
  challenge: Challenge
  running?: boolean
  setRunning?: (running: boolean) => void
}

export const StepByStepButton = ({ challenge, running, setRunning }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const [showModal, setShowModal] = useState(false)
  const [stepping, setStepping] = useState(false)
  const { t } = useTranslation('challenge')

  const handleExcecute = async () => {
    setRunning && setRunning(true)
    setStepping(true)
    await scene.restartScene(challenge.sceneDescriptor)
    executeUntilEnd(interpreterFactory.createInterpreter()).then((finished) => { if (finished) whenExecuteEnd() })
  }

  const handleStep = () => {
    if ((window as any).continueExecution) {
      (window as any).continueExecution();
    }
  };

  const whenExecuteEnd = async () => {
    setRunning && setRunning(false)
    setStepping(false)
    const solved = await scene.isTheProblemSolved()
    if (solved)
      setShowModal(true)
  }

  const executeUntilEnd = (interpreter: Interpreter) => {
    return new Promise((resolve, reject) => {
      let moreToExecute = true;
      let paused = false;

      const executeInterpreter = () => {
        try {
          if (!paused) {
            moreToExecute = interpreter.run();
            interpreter.paused = true;
            paused = true;
          }
        } catch (e) {
          reject(e);
          return;
        }

        if (moreToExecute) {
          setTimeout(executeInterpreter, 10);
        } else {
          setStepping(false);
          resolve(true);
        }
      };

      const continueExecution = () => {
        if (paused) {
          interpreter.paused = false;
          paused = false;
          setTimeout(executeInterpreter, 10);
        }
      };

      (window as any).continueExecution = continueExecution;

      executeInterpreter();
    });
  };

  return <>
    <Tooltip title={t('stepByStepRun.tooltip')}>
      {isSmallScreen ?
        <IconButton className={styles['icon-button']} disabled={running && !stepping} onClick={() => running ? handleStep() : handleExcecute()}
          data-testid='step-button'>
          <Stack>
            <Circle className={styles['circle-icon']} sx={{ color: '#31b0d5' }} />
            <SkipNext className={styles['icon']} />
          </Stack>
        </IconButton>
        :
        <Button className={styles['scene-button']} disabled={running && !stepping} startIcon={<SkipNext />} variant="contained" sx={{ backgroundColor: "#31b0d5" }} onClick={() => running ? handleStep() : handleExcecute()}>{t("stepByStepRun.label")}</Button>
      }
    </Tooltip>

    <EndDialog showModal={showModal} setShowModal={setShowModal} />
  </>
}