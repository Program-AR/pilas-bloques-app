import { SerializedChallenge } from "./components/home/ImportChallengeCard"
import { InternalizationLanguage } from "./language"

type EmberExecutableChallenge = {
    escena: string,
    bloques: string[],
    debugging: boolean,
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

    export const importChallenge = (importedChallenge: SerializedChallenge) => {
        const emberChallenge: EmberExecutableChallenge = {
            escena: importedChallenge.scene,
            bloques: importedChallenge.blocks,
            estiloToolbox: importedChallenge.uncategorizedToolbox ? "sinCategorias" : undefined,
            debugging: importedChallenge.debugging,
            solucionInicial: importedChallenge.predefinedSolution
        }

        setImportedChallenge(emberChallenge)
    }

}

