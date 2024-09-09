import { adaptURL } from "../../scriptLoader";
import { Challenge } from "../../staticData/challenges";
import { Actor, Behaviour } from "./SceneButtons/interpreter-factory";

class Scene {
    iframe(): HTMLIFrameElement {
        return document.getElementById("sceneIframe") as HTMLIFrameElement
    }

    /**
     * Instantiates and runs pilas-engine (pilasweb) main framework.
     * Preloads needed challenge's images.
     * Sets up messaging events from iframe. Iframe should exist before calling this method.
     * @param descriptor The scene descriptor
     */
    async load(descriptor: Challenge["sceneDescriptor"]) {
        await this.initializePilasWeb(descriptor)
        await this.setChallenge(descriptor)
    }

    setChallenge(descriptor: Challenge["sceneDescriptor"]) {
        const initializer = descriptor === this.sceneName(descriptor) ? `new ${descriptor}()` : descriptor
        this.eval(`pilas.mundo.gestor_escenas.cambiar_escena(${initializer})`)
    }

    initializePilasWeb(descriptor: string) {
        return new Promise<void>((resolve) => {
            const pilasweb = this.eval(`
            pilasengine.iniciar({
                    ancho: 420,
                    alto: 480,
                    canvas: document.getElementById('canvas'),
                    data_path: '${adaptURL('libs/data')}',
                    imagenesExtra: ${this.imagesToPreload(descriptor)},
                    cargar_imagenes_estandar: false,
                    silenciar_advertencia_de_multiples_ejecutar: true
            });`)
            pilasweb.ejecutar()
            pilasweb.setFPS(100)
            pilasweb.onready = resolve

            this.listenToIframeMessages()
        })
    }

    listenToIframeMessages() {
        window.addEventListener("message", (event) => {
            // exercises post error messages in the form  { tipo: "error", error: object }
            // where object can be any error or { name: "ActividadError", message: "description"}
            if (event.data.tipo === "error")
                console.log(`Pilasweb execution ended with error: ${JSON.stringify(event.data.error)}`)
        })
    }

    /**
     * Evals code on the iframe. Shouldn't be called outside the class.
     * The idea is that the responsability of managing the scene remains on this object.
     * @param code string with js code to run on the iframe
     */
    private eval(code: string): any {
        return (this.iframe().contentWindow as any).eval(code)
    }

    private imagesToPreload(descriptor: Challenge["sceneDescriptor"]) {
        //Responsibiliy of the exercise's scene class
        var images = this.eval(`${this.sceneName(descriptor)}.imagenesPreCarga()`)
        //TODO: Some scenes (like EscapeEnYacare) don't have images to preload. They should.
        images = images.length ? images : this.eval(`imageList`)

        return JSON.stringify(images)
    }


    sceneName(sceneDescriptor: string): string {
        // if descriptor is of the form new ClassName(...). The regex (\w+) captures the classname.
        // The [1] access the first capture group
        const name = sceneDescriptor.match(/new\s+(\w+)\s*\(/)
        return name ? name[1] : sceneDescriptor
    }

    async restartScene(descriptor: Challenge["sceneDescriptor"]) {
        this.eval('pilas.reiniciar()')
        await this.setChallenge(descriptor)
    }

    sceneActor(): Actor {
        return this.eval('pilas.escena_actual().automata')
    }

    sceneReceptor(receptor: string): Actor {
        return this.eval(`pilas.escena_actual().${receptor}`)
    }

    isTheProblemSolved() {
      return this.eval(`pilas.escena_actual().estaResueltoElProblema();`);
    }

    behaviourClass(behaviour: string): Behaviour {
        return this.eval(`
            var comportamiento = null;
    
            if (window['${behaviour}']) {
              comportamiento = ${behaviour};
            } else {
              if (pilas.comportamientos['${behaviour}']) {
                comportamiento = pilas.comportamientos['${behaviour}'];
              } else {
                throw new Error("No existe un comportamiento llamado '${behaviour}'.");
              }
            }
    
            comportamiento;
          `)
    }

    evaluateExpression(expression: string): boolean {
        return this.eval(`
        try {
          var value = pilas.escena_actual().automata.${expression}
        } catch (e) {
          pilas.escena_actual().errorHandler.handle(e);
        }

        value`)
    }
}

export const scene = new Scene()