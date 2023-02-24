import i18next from "i18next";
import { Ember } from "./emberCommunication";

const SELECTED_LANGUAGE_KEY = 'PILAS_SELECTED_LANGUAGE'

export type InternalizationLanguage = {
  name: string
  languageCode: string
}

export const availableLanguages: InternalizationLanguage[] = [
  {
    name: "Español",
    languageCode: "es-AR"
  },
  {
    name: "English",
    languageCode: "en-US"
  },
  {
    name: "Português",
    languageCode: "pt-BR"
  }
];

const setSelectedLanguageInStorage = (selectedLanguage: InternalizationLanguage) => {
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
