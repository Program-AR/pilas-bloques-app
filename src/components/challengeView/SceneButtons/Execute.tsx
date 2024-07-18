import { Button } from "@mui/material"
import { workspaceToCode } from "../../blockly/blockly"
//@ts-ignore
import Interpreter from 'js-interpreter'
import { scene } from "../Scene/scene"

export const ExecuteButton = () => {

    const handleExcecute = async () => {
        await scene.restartScene('new EscenaLita(["[[A,-,-],[-,-,-],[-,-,-]]"])') //TODO context para el challenge? de donde lo saco? esta en muchos lugares como parametro???? vale la pena?
        const interpreter = new Interpreter(workspaceToCode())
        
        //create interpreter new Interpreter
        //execute until end
    }

    return <Button variant="contained" color="success" onClick={handleExcecute}>{"Ejecutar"}</Button>

}

class InterpreterFactory {
    createInterpreter() : void {

    } 
}