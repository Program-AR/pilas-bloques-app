import { Scene, SceneMap, SerializedChallenge } from "./components/serializedChallenge"
import { InternalizationLanguage } from "./language"
import { LocalStorage } from "./localStorage"

export type EmberExecutableChallenge = {
    escena: string,
    bloques: string[],
    debugging?: boolean,
    estiloToolbox?: "sinCategorias",
    solucionInicial?: string
    titulo: string,
    enunciado: string,
    consignaInicial: string
}

export namespace Ember{

    const refreshIframe = () => {
        const emberIframe = document.getElementById('ember-iframe')! //Asumo un unico iframe
        emberIframe.parentElement?.replaceChild(emberIframe, emberIframe)
    }

    export const changeLanguage = (newLanguage: InternalizationLanguage) => {
        LocalStorage.saveSelectedLocale(newLanguage.languageCode)
        refreshIframe()
    }

    export const serializedSceneToEmberScene = (scene: Scene) => { 
        const mapToString = (map: SceneMap) => `"${JSON.stringify(map).replace(/"/g,'')}"` //[["a","a"],["b","c"]] to "[[a,a],[b,c]]"
        const mapsAsString = scene.maps.map(mapToString).join(',')
        
        return `new Escena${scene.type}([${mapsAsString}])`
    }

    export const importChallenge = (importedChallenge: SerializedChallenge) => {
        const emberChallenge: EmberExecutableChallenge = {
            escena: serializedSceneToEmberScene(importedChallenge.scene),
            bloques: importedChallenge.toolbox.blocks,
            estiloToolbox: importedChallenge.toolbox.categorized ? undefined :  "sinCategorias",
            debugging: importedChallenge.stepByStep,
            solucionInicial: importedChallenge.predefinedSolution,
            titulo: importedChallenge.title,
            enunciado: importedChallenge.statement.description,
            consignaInicial: importedChallenge.statement.clue || ""
        }

        LocalStorage.saveImportedChallenge(emberChallenge)
    }

}

