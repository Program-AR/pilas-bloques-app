import { Challenge } from "../../staticData/challenges";

class Scene {
    iframe?: HTMLIFrameElement;

    /**
     * Instantiates and runs pilas-engine (pilasweb) main framework.
     * Preloads needed challenge's images.
     * Sets up messaging events from iframe. Iframe should exist before calling this method.
     * @param descriptor The scene descriptor
     */
    async load(descriptor: Challenge["sceneDescriptor"]) {
        this.iframe = document.getElementById("sceneIframe") as HTMLIFrameElement
        await this.initializePilasWeb(descriptor)
        await this.setChallenge(descriptor)
    }

    setChallenge(descriptor: Challenge["sceneDescriptor"]) {
        const initializer = descriptor === this.sceneName(descriptor) ? `new ${descriptor}()` : descriptor
        this.eval(`pilas.mundo.gestor_escenas.cambiar_escena(${initializer})`)
    }

    initializePilasWeb(descriptor: string) {
        return new Promise<void>((success) => {
            const pilasweb = this.eval(`
            pilasengine.iniciar({
                    ancho: 420,
                    alto: 480,
                    canvas: document.getElementById('canvas'),
                    data_path: 'libs/data',
                    imagenesExtra: ${this.imagesToPreload(descriptor)},
                    cargar_imagenes_estandar: false,
                    silenciar_advertencia_de_multiples_ejecutar: true
            });`)
            pilasweb.ejecutar()
            pilasweb.setFPS(100)
            pilasweb.onready = () => {
                success();
                // TODO: ver si es necesario frenar la ruedita de cargar.
            };
        })
    }

    /**
     * Evals code on the iframe. Shouldn't be called outside the class.
     * The idea is that the responsability of managing the scene remains on this object.
     * @param code string with js code to run on the iframe
     */
    private eval(code: string): any {
        return (this.iframe?.contentWindow as any).eval(code)
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
}

export const scene = new Scene()