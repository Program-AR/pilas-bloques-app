import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { selectedLanguage, spanish } from './language';
import HttpBackend from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import ChainedBackend from 'i18next-chained-backend'

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(ChainedBackend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    lowerCaseLng: true,
    fallbackLng: spanish.languageCode,
    lng: selectedLanguage() || spanish.languageCode,
      backend: {
        backends: [
          HttpBackend, // Doesn't make sense, but apparently without this Electron doesn't work
          resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`))
        ],
        backendOptions: [{
          loadPath: './locales/{{lng}}/{{ns}}.json'
        }]
      }

  });

export default i18n;
