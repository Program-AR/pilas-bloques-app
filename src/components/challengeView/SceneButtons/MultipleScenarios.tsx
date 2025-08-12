import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { scene } from "../scene"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, SwapHorizOutlined } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

type MultipleScenariosButtonProps = {
  challenge: Challenge
  disabled?: boolean
}

export const MultipleScenariosButton = ({ challenge, disabled }: MultipleScenariosButtonProps) => {

  const { isSmallScreen, theme } = useThemeContext()
  const { t } = useTranslation('challenge')
  const [currentScene, setCurrentScene] = useState<string | null>(null)


  useEffect(() => {
    const initScene = async () => {
      await scene.waitUntilReady()
      const initialScene = scene.currentScene()
      setCurrentScene(initialScene)
    }
    initScene()
  }, [])

  const handleShowScenarios = async () => {
    if (currentScene == null) {
      await scene.restartScene(challenge.sceneDescriptor)
      setCurrentScene(scene.currentScene())
      return
    }

    let attempts = 0
    const maxAttempts = 10
    let newScene

    do {
      await scene.restartScene(challenge.sceneDescriptor)
      newScene = scene.currentScene()
      attempts++
    } while (currentScene.toString() === newScene.toString() && attempts < maxAttempts)

    if (attempts === maxAttempts) {
      console.warn('No se pudo obtener una escena diferente luego de varios intentos')
    } else {
      setCurrentScene(newScene)
    }
  }

  return <Tooltip title={t('showScenarios.tooltip')}>
    <Stack alignItems={isSmallScreen ? 'center' : 'flex-start'} marginLeft={isSmallScreen ? '0px' : '7px'}>
      {isSmallScreen ?
        <IconButton className={styles['icon-button']} disabled={disabled}
          style={{ marginTop: '7px' }}
          onClick={handleShowScenarios}
          data-testid='showScenarios-button'
          data-finishedexecution={false}>
          <Stack>
            <Circle className={styles['circle-icon']} style={{ color: disabled ? 'rgba(0,0,0,0.26)' : theme.palette.secondary.main }} />
            <SwapHorizOutlined className={styles['icon']} style={{ color: disabled ? '#fff' : '#000' }} />
          </Stack>
        </IconButton >
        :
        <Button className={styles['scene-button']} disabled={disabled}
          startIcon={<SwapHorizOutlined style={{ color: disabled ? 'rgba(0,0,0,0.26)' : '#000' }} />}
          variant="contained"
          style={{  color: disabled ? 'rgba(0,0,0,0.26)' : '#000', backgroundColor: disabled ? 'rgba(0,0,0,0.12)' : theme.palette.secondary.main }}
          onClick={handleShowScenarios}
          data-testid='showScenarios-button'
          data-finishedexecution={false}>{t("showScenarios.label")} </Button>
      }
    </Stack>
  </Tooltip>
}