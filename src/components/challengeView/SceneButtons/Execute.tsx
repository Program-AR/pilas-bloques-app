import { Button, IconButton, Stack } from "@mui/material"
import { scene } from "../scene"
import { interpreterFactory } from "./interpreterFactory"
import Interpreter from "js-interpreter"
import { useThemeContext } from "../../../theme/ThemeContext"
import styles from './sceneButtons.module.css'
import { Circle, PlayArrow } from "@mui/icons-material"
import { Challenge } from "../../../staticData/challenges"

type ExecuteButtonProps = {
    challenge: Challenge
}

export const ExecuteButton = ({ challenge }: ExecuteButtonProps) => {

    const { isSmallScreen } = useThemeContext()

    const handleExcecute = async () => {
        await scene.restartScene(challenge.sceneDescriptor)
        executeUntilEnd(interpreterFactory.createInterpreter())
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
        {isSmallScreen ? <>
            <IconButton className={styles['icon-button']} onClick={handleExcecute} data-testid='execute-button'>
                <Stack>
                    <Circle color='success' className={styles['circle-icon']} />
                    <PlayArrow className={styles['icon']} />
                </Stack>
            </IconButton >
        </> :
            <Button variant="contained" color="success" onClick={handleExcecute} data-testid='execute-button' >{"Ejecutar"}</Button>
        }
    </>

}