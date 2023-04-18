import { Scene, SerializedChallenge } from "./components/home/ImportChallengeCard"
import { InternalizationLanguage } from "./language"

type EmberExecutableChallenge = {
    escena: string,
    bloques: string[],
    debugging?: boolean,
    estiloToolbox?: "sinCategorias",
    solucionInicial?: string
}

export namespace Ember{

    const refreshIframe = () => {
        const emberIframe = document.getElementById('ember-iframe')! //Asumo un unico iframe
        emberIframe.parentElement?.replaceChild(emberIframe, emberIframe)
    }

    export const changeLanguage = (newLanguage: InternalizationLanguage) => {
        localStorage.setItem("PB_SELECTED_LOCALE", `"${newLanguage.languageCode}"`)
        refreshIframe()
    }

    const setImportedChallenge = (challenge: EmberExecutableChallenge) => {
        localStorage.setItem("PB_IMPORTED_CHALLENGE", JSON.stringify(challenge))
    }

    const serializedSceneToEmberScene = (scene: Scene) => { //TODO
        return "new EscenaDuba('[O,O,O,O,O,-,-,-],[O,P,-,O,O,-,-,-],[O,-,-,O,-,-,-,-],[O,-,O,O,-,-,-,-],[O,-,O,O,O,-,-,-],[-,-,O,O,O,O,-,-],[-,-,O,O,O,O,O,O],[-,-,A,O,O,O,O,O]')"
    }

    export const importChallenge = (importedChallenge: SerializedChallenge) => {
        const emberChallenge: EmberExecutableChallenge = {
            escena: serializedSceneToEmberScene(importedChallenge.scene),
            bloques: importedChallenge.toolbox.blocks,
            estiloToolbox: importedChallenge.toolbox.categorized ? undefined :  "sinCategorias",
            debugging: importedChallenge.stepByStep,
            solucionInicial: importedChallenge.predefinedSolution
        }

        setImportedChallenge(emberChallenge)
    }

}

