import {
  Scene,
  SceneMap,
  SerializedChallenge,
} from "./components/serializedChallenge"
import { InternalizationLanguage } from "./language"

type EmberExecutableChallenge = {
  escena: string
  bloques: string[]
  debugging?: boolean
  estiloToolbox?: "sinCategorias"
  solucionInicial?: string
}

export namespace Ember {
  const refreshIframe = () => {
    const emberIframe = document.getElementById("ember-iframe")! //Asumo un unico iframe
    emberIframe.parentElement?.replaceChild(emberIframe, emberIframe)
  }

  export const changeLanguage = (newLanguage: InternalizationLanguage) => {
    localStorage.setItem("PB_SELECTED_LOCALE", `"${newLanguage.languageCode}"`)
    refreshIframe()
  }

  const setImportedChallenge = (challenge: EmberExecutableChallenge) => {
    localStorage.setItem("PB_IMPORTED_CHALLENGE", JSON.stringify(challenge))
  }

  export const serializedSceneToEmberScene = (scene: Scene) => {
    const mapToString = (map: SceneMap) =>
      `"${JSON.stringify(map).replace(/"/g, "")}"` //[["a","a"],["b","c"]] to "[[a,a],[b,c]]"
    const mapsAsString = scene.maps.map(mapToString).join(",")

    return `new Escena${scene.type}([${mapsAsString}])`
  }

  export const importChallenge = (importedChallenge: SerializedChallenge) => {
    const emberChallenge: EmberExecutableChallenge = {
      escena: serializedSceneToEmberScene(importedChallenge.scene),
      bloques: importedChallenge.toolbox.blocks,
      estiloToolbox: importedChallenge.toolbox.categorized
        ? undefined
        : "sinCategorias",
      debugging: importedChallenge.stepByStep,
      solucionInicial: importedChallenge.predefinedSolution,
    }

    setImportedChallenge(emberChallenge)
  }
}
