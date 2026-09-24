import { adaptURL } from "../../scriptLoader";
import { Challenge } from "../../staticData/challenges";
import { Actor, Behaviour } from "./SceneButtons/interpreterFactory";

class Scene {
  private isReady = false;

  async waitUntilReady(): Promise<void> {
    while (!this.isReady) {
      await new Promise(res => setTimeout(res, 50)) // espera activa
    }
  }

  currentScene(): Challenge["sceneDescriptor"] {
    if (!this.isReady) return ''
    try {
      return this.eval(`
        typeof pilas !== 'undefined' &&
        pilas.mundo &&
        pilas.mundo.gestor_escenas &&
        pilas.mundo.gestor_escenas.escena
          ? pilas.mundo.gestor_escenas.escena.mapaEscena
          : ''
      `) || ''
    } catch (e) {
      return ''
    }
  }

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
    this.isReady = false
    await this.initializePilasWeb(descriptor)
    this.isReady = true
    this.setChallenge(descriptor)
  }

  setChallenge(descriptor: Challenge["sceneDescriptor"]) {
    try {
      const initializer = descriptor === this.sceneName(descriptor) ? `new ${descriptor}()` : descriptor
      this.eval(`
        if (typeof pilas !== 'undefined' && pilas.mundo && pilas.mundo.gestor_escenas) {
          pilas.mundo.gestor_escenas.cambiar_escena(${initializer});
        }
      `)
    } catch (e) {
      console.warn("Error en setChallenge:", e)
    }
  }

  initializePilasWeb(descriptor: string) {
    return new Promise<void>((resolve) => {
      try {
        const pilasweb = this.eval(`
              typeof pilasengine !== 'undefined' ? pilasengine.iniciar({
                      ancho: 420,
                      alto: 480,
                      canvas: document.getElementById('canvas'),
                      data_path: '${adaptURL('libs/data')}',
                      imagenesExtra: ${this.imagesToPreload(descriptor)},
                      cargar_imagenes_estandar: false,
                      silenciar_advertencia_de_multiples_ejecutar: true
              }) : null;`)
        if (pilasweb) {
          pilasweb.ejecutar()
          pilasweb.setFPS(100)
          pilasweb.onready = resolve
        } else {
          resolve()
        }

        this.listenToIframeMessages()
      } catch (e) {
        console.warn("Error al inicializar PilasWeb:", e)
        resolve()
      }
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
    const iframe = this.iframe()
    if (!iframe || !iframe.contentWindow) return undefined
    return (iframe.contentWindow as any).eval(code)
  }

  private imagesToPreload(descriptor: Challenge["sceneDescriptor"]) {
    //Responsibiliy of the exercise's scene class
    try {
      var images = this.eval(`typeof ${this.sceneName(descriptor)} !== 'undefined' && typeof ${this.sceneName(descriptor)}.imagenesPreCarga === 'function' ? ${this.sceneName(descriptor)}.imagenesPreCarga() : (typeof imageList !== 'undefined' ? imageList : [])`)
      return JSON.stringify(images || [])
    } catch (e) {
      return '[]'
    }
  }


  sceneName(sceneDescriptor: string): string {
    // if descriptor is of the form new ClassName(...). The regex (\w+) captures the classname.
    // The [1] access the first capture group
    const name = sceneDescriptor.match(/new\s+(\w+)\s*\(/)
    return name ? name[1] : sceneDescriptor
  }

  async restartScene(descriptor: Challenge["sceneDescriptor"]) {
    try {
      this.eval(`
        if (typeof pilas !== 'undefined' && typeof pilas.reiniciar === 'function') {
          pilas.reiniciar();
        }
      `)
    } catch (e) { }
    this.setChallenge(descriptor)
    await this.waitUntilSceneActorReady()
  }

  private async waitUntilSceneActorReady(): Promise<void> {
    for (let i = 0; i < 100; i++) {
      try {
        const ready = this.eval(`
          (function() {
            if (typeof pilas === 'undefined' || typeof pilas.escena_actual !== 'function') return false;
            var escena = pilas.escena_actual();
            return !!(
              escena &&
              escena.automata &&
              typeof escena.automata.casillaActual === 'function'
            );
          })()
        `)

        if (ready) return
      } catch (_) {
        // la escena todavía no está lista
      }

      await new Promise(res => setTimeout(res, 50))
    }

    throw new Error('Scene actor was not ready after restart')
  }

  pausadoEnBreakpoint() {
    try {
      return Boolean(this.eval(`typeof pilas !== 'undefined' ? pilas.pausadoEnBreakpoint : false`))
    } catch (e) {
      return false
    }
  }

  setPausadoEnBreakpoint(setPaused: boolean) {
    try {
      this.eval(`
        if (typeof pilas !== 'undefined') {
          pilas.pausadoEnBreakpoint = ${setPaused};
          pilas.ejecutando = ${!setPaused};
        }
      `)
    } catch (e) { }
  }

  enableTurboMode() {
    try {
      this.eval(`
        if (typeof ComportamientoConVelocidad !== 'undefined') {
          ComportamientoConVelocidad.modoTurbo = true;
        }
        if (typeof pilas !== 'undefined' && typeof pilas.ponerVelocidadMaxima === 'function') {
          pilas.ponerVelocidadMaxima();
        }
      `);
    } catch (e) { }
  }

  disableTurboMode() {
    try {
      this.eval(`
        if (typeof ComportamientoConVelocidad !== 'undefined') {
          ComportamientoConVelocidad.modoTurbo = false;
        }
        if (typeof pilas !== 'undefined' && typeof pilas.ponerVelocidadNormal === 'function') {
          pilas.ponerVelocidadNormal();
        }
      `);
    } catch (e) { }
  }

  isTurboModeActive() {
    try {
      return Boolean(this.eval(`typeof ComportamientoConVelocidad !== 'undefined' ? ComportamientoConVelocidad.modoTurbo : false`))
    } catch (e) {
      return false
    }
  }

  sceneActor(): Actor {
    return this.eval(`
      typeof pilas !== 'undefined' && pilas.escena_actual && pilas.escena_actual()
        ? pilas.escena_actual().automata
        : null
    `)
  }

  sceneReceptor(receptor: string): Actor {
    return this.eval(`
      typeof pilas !== 'undefined' && pilas.escena_actual && pilas.escena_actual()
        ? pilas.escena_actual().${receptor}
        : null
    `)
  }

  isTheProblemSolved() {
    try {
      return Boolean(this.eval(`
        typeof pilas !== 'undefined' &&
        pilas.escena_actual &&
        pilas.escena_actual() &&
        typeof pilas.escena_actual().estaResueltoElProblema === 'function'
          ? pilas.escena_actual().estaResueltoElProblema()
          : false
      `));
    } catch (e) {
      return false;
    }
  }

  behaviourClass(behaviour: string): Behaviour {
    return this.eval(`
            var comportamiento = null;
    
            if (typeof window['${behaviour}'] !== 'undefined') {
              comportamiento = window['${behaviour}'];
            } else {
              if (typeof pilas !== 'undefined' && pilas.comportamientos && pilas.comportamientos['${behaviour}']) {
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
        (function() {
          if (typeof pilas === 'undefined' || !pilas.escena_actual || !pilas.escena_actual()) return false;
          try {
            var value = pilas.escena_actual().automata.${expression};
          } catch (e) {
            if (pilas.escena_actual().errorHandler) {
              pilas.escena_actual().errorHandler.handle(e);
            }
          }
          return value;
        })()
    `)
  }
}

export const scene = new Scene()