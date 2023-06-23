import i18next from "i18next";
import { Ember } from "./emberCommunication";
import { LocalStorage } from "./localStorage";

export type LanguageCode = string

export type InternalizationLanguage = {
  name: string
  languageCode: LanguageCode
}

export const spanish: InternalizationLanguage = {
  name: "Español",
  languageCode: "es-ar"
}

export const availableLanguages: InternalizationLanguage[] = [
  spanish,
  {
    name: "English",
    languageCode: "en-us"
  },
  {
    name: "Português",
    languageCode: "pt-br"
  }
];

export const changeLanguage = (selectedLanguage: InternalizationLanguage) => {
  i18next.changeLanguage(selectedLanguage.languageCode)
  LocalStorage.saveSelectedLocale(selectedLanguage.languageCode)
  Ember.changeLanguage(selectedLanguage)
}
