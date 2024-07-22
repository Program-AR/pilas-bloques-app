import { workspaceToCode } from "../../blockly/blockly"
//@ts-ignore
import Interpreter from 'js-interpreter'
//@ts-ignore
import beautify from 'js-beautify'
import { scene } from "../scene"


class InterpreterFactory {
    createInterpreter(): any { ///TODO tipo
        console.log(this.wrappedCode())
        return new Interpreter(this.wrappedCode(), (interpreter: any, scope: any) => {
            return this.init(interpreter, scope);
        })
    }

    init(interpreter: any, scope: any): any {
        interpreter.setProperty(scope, 'out_hacer', interpreter.createAsyncFunction(this.doWrapper))
        interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(this.highlightBlock))
        interpreter.setProperty(scope, 'evaluar', interpreter.createNativeFunction(this.evaluateWrapper))
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
    doWrapper(behaviour: any, params: any, callback: any) {
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