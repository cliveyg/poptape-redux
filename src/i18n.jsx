import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import backend from 'i18next-http-backend'

import accountEN_GB from './locales/en/account.json'
import dashboardEN_GB from './locales/en/dashboard.json'
import errorsEN_GB from './locales/en/errors.json'
import homepageEN_GB from './locales/en/homepage.json'
import itemsEN_GB from './locales/en/items.json'
import menusEN_GB from './locales/en/menus.json'
import modalsEN_GB from './locales/en/modals.json'
import profileEN_GB from './locales/en/profile.json'
import validationEN_GB from './locales/en/validation.json'

import accountPT_BR from './locales/pt/account.json'
import dashboardPT_BR from './locales/pt/dashboard.json'
import errorsPT_BR from './locales/pt/errors.json'
import homepagePT_BR from './locales/pt/homepage.json'
import itemsPT_BR from './locales/pt/items.json'
import menusPT_BR from './locales/pt/menus.json'
import modalsPT_BR from './locales/pt/modals.json'
import profilePT_BR from './locales/pt/profile.json'
import validationPT_BR from './locales/pt/validation.json'

const resources = {
    en: {
        account: accountEN_GB,
        dashboard: dashboardEN_GB,
        errors: errorsEN_GB,
        homepage: homepageEN_GB,
        items: itemsEN_GB,
        menus: menusEN_GB,
        modals: modalsEN_GB,
        profile: profileEN_GB,
        validation: validationEN_GB
    },
    pt: {
        account: accountPT_BR,
        dashboard: dashboardPT_BR,
        errors: errorsPT_BR,
        homepage: homepagePT_BR,
        items: itemsPT_BR,
        menus: menusPT_BR,
        modals: modalsPT_BR,
        profile: profilePT_BR,
        validation: validationPT_BR
    },
};

let default_language = 'en'
if (localStorage.getItem('i18nextLng') !== null) {
    default_language = localStorage.getItem('i18nextLng')
}

i18n
    .use(initReactI18next)
    .use(backend)
    .init({
        resources,
        lng: default_language,
        defaultNS: 'menus',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n