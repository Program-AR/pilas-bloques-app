import { Button } from "@mui/material"
import { workspaceToCode } from "../../blockly/blockly"
//@ts-ignore
import Interpreter from 'js-interpreter'
//@ts-ignore
import beautify from 'js-beautify'
import { scene } from "../Scene/scene"

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
                    console.log("Mas para ejecutar: ", moreToExecute)
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

class InterpreterFactory {
    createInterpreter(): any { ///TODO tipo
        console.log(this.wrappedCode())
        return new Interpreter(this.wrappedCode(), (interpreter: any, scope: any) => {
            return this.init(interpreter, scope);
        })
    }

    init(interpreter: any, scope: any): any {
        interpreter.setProperty(scope, 'out_hacer', interpreter.createAsyncFunction(this.do_wrapper));
        interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(this.highlightBlock));
    }


    /**
     * Generates the function "out_hacer", which will be called in the interpreter
     * 
     * This method will chain two behaviours to simplify the use of async functions. It 
     * will add the behaviour that represents the action the user wants to do wih the actor,
     * and then it will add another behaviour to indicate the async task finished.
     * 
     * For example, if the code calls the function "hacer" this way:
     * 
     *  hacer("Saltar", {});
     *
     *  hacer("Caminar", {pasos: 20});
     * 
     * Internally, the function will make the actor first jump ("Saltar") and then walk
     *  ("caminar") 20 steps ("pasos").
     * 
     * @param behaviour 
     * @param params 
     * @param callback 
     */
    do_wrapper(behaviour: any, params: any, callback: any) {
        const actor = scene.sceneActor()
        params = params ? params.toString() : '';
        params = JSON.parse(params);
        var behaviourClass = scene.behaviourClass(behaviour ? behaviour.toString() : '')

        if (typeof params.receptor === 'string') {
            params.receptor = scene.sceneReceptor(params.receptor)
        }

        actor.hacer_luego(behaviourClass, params);
        actor.hacer_luego(scene.behaviourClass('LlamarCallback'), { callback });
    };

    highlightBlock(id: string){
        console.log(id)
    }

    wrappedCode(): string {
        return beautify.js(`
        var actor_id = 'demo'; // se asume el actor receptor de la escena.

        function hacer(id, comportamiento, params) {
          out_hacer(comportamiento, JSON.stringify(params));
        }

        function main() {
          ${workspaceToCode()}
        }

        main();
      `);
    }
}

export const interpreterFactory = new InterpreterFactory()
