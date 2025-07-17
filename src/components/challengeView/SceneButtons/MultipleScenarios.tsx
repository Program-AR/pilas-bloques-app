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
}

export const MultipleScenariosButton = ({ challenge }: MultipleScenariosButtonProps) => {

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
    {isSmallScreen ?
      <IconButton className={styles['icon-button']}  style={{backgroundColor: theme.palette.secondary.main}} onClick={handleShowScenarios} data-testid='showScenarios-button' data-finishedexecution={false}>
        <Stack>
          <Circle className={styles['circle-icon']} style={{color: theme.palette.secondary.main}} />
          <SwapHorizOutlined className={styles['icon']}/>
        </Stack>
      </IconButton >
      :
      <Button className={styles['scene-button']} startIcon={<SwapHorizOutlined />} variant="contained" style={{backgroundColor: theme.palette.secondary.main}} onClick={handleShowScenarios} data-testid='showScenarios-button' data-finishedexecution={false}>{t("showScenarios.label")} </Button>
    }
  </Tooltip>
}