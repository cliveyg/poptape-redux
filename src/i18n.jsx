import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import backend from 'i18next-http-backend'
import translationEN_GB from './locales/en/translations.json'
import translationPT_BR from './locales/pt/translations.json'

const resources = {
    en: {
        translation: translationEN_GB,
    },
    pt: {
        translation: translationPT_BR,
    },
};

i18n
    .use(initReactI18next)
    .use(backend)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n