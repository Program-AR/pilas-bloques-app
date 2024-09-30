import { workspaceToCode } from "../../blockly/blockly"
import Interpreter from 'js-interpreter'
import beautify from 'js-beautify'
import { scene } from "../scene"

export type Behaviour = {
    receptor: any
    argumentos: any
    iniciar(receptor: any): void
    actualizar(): void
    eliminar(): void
}

export type Actor = {
    hacer_luego: (behaviour: Behaviour, params: {}) => void
}

class InterpreterFactory {
    /**
     * Returns an interpreter to execute the code on the workspace.
     * 
     * The code will be executed in isolation, in a protected environment
     * without access to the outside (you will not have access to pilas, window, or anything...)
     * so the only features you will be able to access are detailed
     * at the init function, which appears below.
     */
    createInterpreter(): Interpreter {
        return new Interpreter(this.wrappedCode(), (interpreter: any, scope: any) => {
            return this.init(interpreter, scope);
        })
    }

    /**
     * Initializes the interpreter and its initial scope, so that 
     * it can use functions like "hacer", "evaluar", etc. 
     * @param interpreter 
     * @param scope 
     */
    init(interpreter: Interpreter, scope: any): void {
        interpreter.setProperty(scope, 'out_hacer', interpreter.createAsyncFunction(this.doWrapper))
        interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(this.highlightBlock))
        interpreter.setProperty(scope, 'evaluar', interpreter.createNativeFunction(this.evaluateWrapper))
        interpreter.setProperty(scope, 'console_log', interpreter.createNativeFunction(this.console_log_wrapper))
    }

    console_log_wrapper = (txt: string) => {
        return console.log(txt = txt ? txt.toString() : '')
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
    doWrapper(behaviour: Behaviour, params: any, callback: () => void) {
        const actor = scene.sceneActor()
        params = JSON.parse(params ? params.toString() : '')
        var behaviourClass = scene.behaviourClass(behaviour ? behaviour.toString() : '')

        if (typeof params.receptor === 'string') {
            params.receptor = scene.sceneReceptor(params.receptor)
        }

        actor.hacer_luego(behaviourClass, params);
        actor.hacer_luego(scene.behaviourClass('LlamarCallback'), { callback });
    };

    highlightBlock(id: string) {
        console.log(id) //TODO
    }

    /**
     * This is the code that executes with an expression (sensor, operation, etc)
     * @param expression 
     * @returns 
     */
    evaluateWrapper(expression: any) {
        return scene.evaluateExpression(expression ? expression.toString() : '')
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