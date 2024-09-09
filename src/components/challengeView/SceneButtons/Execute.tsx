import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, Typography } from "@mui/material"
import { scene } from "../scene"
import { interpreterFactory } from "./interpreter-factory"
import Interpreter from "js-interpreter"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, PlayArrow } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import ConfettiExplosion from 'react-confetti-explosion';

type ExecuteButtonProps = {
  challenge: Challenge
}

export const ExecuteButton = ({ challenge }: ExecuteButtonProps) => {

  const { isSmallScreen } = useThemeContext()
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation('challenge')
  const { theme } = useThemeContext()

  const handleExcecute = async () => {
    await scene.restartScene(challenge.sceneDescriptor)
    executeUntilEnd(interpreterFactory.createInterpreter()).then((finished) => { if (finished) whenExecuteEnd() })
  }

  const whenExecuteEnd = async () => {
    const solved = await scene.isTheProblemSolved()
    if (solved)
      setShowModal(true)
  }

  const EndDialog = () =>
    <Dialog
      open={showModal}
      disableRestoreFocus
      fullWidth={true}
      maxWidth="md"
      onClose={() => setShowModal(false)}>
      <DialogTitle id="draggable-dialog" sx={{ cursor: 'auto', fontWeight: 'bold', height: '50px', display: 'flex', alignItems: 'center' }}>{t('congratulationsModal.title')}</DialogTitle>
      <DialogContent sx={{ overflow: "hidden", backgroundColor: theme.palette.background.default }}>
        <Stack alignItems="center">
          <ConfettiExplosion {...{ force: 0.8, duration: 3000, particleCount: 250, width: 1600 }} />
          <img alt="register" width="25%" src="imagenes/primer-ciclo.png"></img>
          <Stack display='flex' flexDirection='row' flexWrap='wrap' justifyContent='center' alignItems='center'>
            <Typography style={{ display: 'inline-block', fontSize: '1.1rem', fontWeight: 'bold', fontStyle: 'italic' }}>{t("congratulationsModal.subtitle")}&nbsp;</Typography>
            <Typography style={{ display: 'inline-block', fontSize: '1.1rem' }}>{t("congratulationsModal.text1")}</Typography>
          </Stack>
          <Typography style={{ fontSize: '1.1rem' }}>{t("congratulationsModal.text2")}</Typography>
        </Stack>
      </DialogContent>
    </Dialog>

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
    {isSmallScreen ? <>
      <IconButton className={styles['icon-button']} onClick={handleExcecute}>
        <Stack>
          <Circle color='success' className={styles['circle-icon']} />
          <PlayArrow className={styles['icon']} />
        </Stack>
      </IconButton >
    </> :
      <Button variant="contained" color="success" onClick={handleExcecute}>{"Ejecutar"}</Button>
    }
    <EndDialog />
  </>
}