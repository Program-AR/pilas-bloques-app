import i18next from "i18next"
import { Ember } from "./emberCommunication"

const SELECTED_LANGUAGE_KEY = "PILAS_SELECTED_LANGUAGE"

export type InternalizationLanguage = {
  name: string
  languageCode: string
}

export const spanish: InternalizationLanguage = {
  name: "Español",
  languageCode: "es-ar",
}

export const availableLanguages: InternalizationLanguage[] = [
  spanish,
  {
    name: "English",
    languageCode: "en-us",
  },
  {
    name: "Português",
    languageCode: "pt-br",
  },
]

const setSelectedLanguageInStorage = (
  selectedLanguage: InternalizationLanguage
) => {
  localStorage.setItem(SELECTED_LANGUAGE_KEY, selectedLanguage.languageCode)
}

export const changeLanguage = (selectedLanguage: InternalizationLanguage) => {
  i18next.changeLanguage(selectedLanguage.languageCode)
  setSelectedLanguageInStorage(selectedLanguage)
  Ember.changeLanguage(selectedLanguage)
}

export const selectedLanguage = (): string | null => {
  return localStorage.getItem(SELECTED_LANGUAGE_KEY)
}
