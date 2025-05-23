import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import './i18n'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </BrowserRouter>
)
