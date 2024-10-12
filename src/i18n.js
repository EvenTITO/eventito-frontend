import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import esTranslation from './locales/es/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: esTranslation,
    },
  },
  lng: 'es', // default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

export default i18n
