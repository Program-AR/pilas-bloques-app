import i18next from "i18next";
import { Ember } from "./emberCommunication";

export type InternalizationLanguage = {
  name: string
  localeCode: string
}

export const availableLanguages: InternalizationLanguage[] = [
  {
    name: "Español",
    localeCode: "es-AR"
  },
  {
    name: "English",
    localeCode: "en-US"
  },
  {
    name: "Português",
    localeCode: "pt-BR"
  }
];


export const changeLanguage = (selectedLanguage: InternalizationLanguage) => {
  i18next.changeLanguage(selectedLanguage.localeCode)
  Ember.changeLanguage(selectedLanguage)
}