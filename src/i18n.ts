import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export type InternalizationLanguage = {
  name: string
  localeCode: string
}

export const availableLanguages: InternalizationLanguage[] = [
  {
    name: "Español",
    localeCode: "esAR"
  },
  {
    name: "English",
    localeCode: "enUS"
  },
  {
    name: "Português",
    localeCode: "ptBR"
  }
]

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'esAR',
    lng: 'esAR',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
