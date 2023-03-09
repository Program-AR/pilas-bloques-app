import { InternalizationLanguage } from "./language"

export namespace Ember{

    export const changeLanguage = (newLanguageCode: string) => {
        localStorage.setItem('PB_SELECTED_LOCALE', `"${newLanguageCode}"`)
    }

}

