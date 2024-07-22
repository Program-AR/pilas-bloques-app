import { Button } from "@mui/material"
import { scene } from "../scene"
import { interpreterFactory } from "./interpreter-factory"

export const ExecuteButton = () => {

    const handleExcecute = async () => {
        await scene.restartScene('new EscenaLita(["[[A,-,-],[-,-,-],[-,-,-]]"])') //TODO context para el challenge? de donde lo saco? esta en muchos lugares como parametro???? vale la pena?
        const interpreter = interpreterFactory.createInterpreter()
        executeUntilEnd(interpreter)
    }

    const executeUntilEnd = (interpreter: any) => {
        return new Promise((success, reject) => {
            let moreToExecute: boolean

            const executeInterpreter = (interpreter: any) => {
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

    return <Button variant="contained" color="success" onClick={handleExcecute}>{"Ejecutar"}</Button>

}
