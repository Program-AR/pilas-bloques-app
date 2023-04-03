import { InternalizationLanguage } from "./language"

export namespace Ember{

    const refreshIframe = () => {
        const emberIframe = document.getElementById('ember-iframe')! //Asumo un unico iframe
        emberIframe && emberIframe.parentElement?.replaceChild(emberIframe, emberIframe)
    }

    export const changeLanguage = (newLanguage: InternalizationLanguage) => {
        localStorage.setItem("PB_SELECTED_LOCALE", `"${newLanguage.languageCode}"`)
        refreshIframe()
    }

}

