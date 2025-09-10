import * as React from 'react'
import '../css/poptape.css'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import superagent from 'superagent'
import AccountPageLoginForm from '../components/account/AccountPageLoginForm'
import AccountPageController from '../components/account/AccountPageController'
import { useLocation } from 'react-router'
import {useTranslation} from 'react-i18next'
import {getErrorMessage} from '../assets/scripts/general'
import CustomSnackbar from '../components/information/CustomSnackbar'

export default function UserAccountPage() {

    const username = Cookies.get('username') || null
    const { t } = useTranslation()
    const [showSnack, setshowSnack] = React.useState(false)
    const [variant, setVariant] = React.useState('error')
    const [message, setMessage] = React.useState(t('modals:ld_error_message_default'))
    const duration = 2000
    const date = new Date().getTime()

    React.useEffect(() => {
        document.title = 'POPTAPE | ' + username + ' | '+ t('account:ap_title')
    }, []);

    const [accountAuthed, setAccountAuthed] = React.useState(
        Cookies.get('account-access-token') || null)

    const getFieldFromToken = (token, field) => {
        const tokenArray = token.split(".")
        const base64decoded = JSON.parse(atob(tokenArray[1]))
        return base64decoded[field]
    }

    const onSubmit = (data) => {

        const utf8Bytes = new TextEncoder().encode(data['password'])
        const base64Encoded = btoa(String.fromCharCode(...utf8Bytes))
        data['password'] = base64Encoded

        superagent.post('/api/login')
            .send(JSON.stringify(data))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(res => {
                if (getFieldFromToken(res.body.token, 'public_id') ===
                    getFieldFromToken(Cookies.get('access-token'), 'public_id')) {
                    let inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
                    Cookies.set('account-access-token',
                                res.body.token,
                                { expires: inTenMinutes, secure: true })
                    setAccountAuthed(true)
                }
            })
            .catch(err => {
                setVariant('error')
                const mess = getErrorMessage(err.response.body, err.status, 'login')
                if (mess.translate) {
                    setMessage(t(mess.message))
                } else {
                    setMessage(mess.message)
                }

                setshowSnack(true)
                setTimeout(function () {
                    setshowSnack(false)
                }, duration)
            });

    }

    const urlArray = useLocation().pathname.split("/")
    const urlUsername = urlArray[2]
    if (urlUsername !== Cookies.get('username')) {
        if (accountAuthed) {
            setAccountAuthed(false)
        }
    }

    return (
        <>
            {accountAuthed ?
                <AccountPageController username={username} />
            :
                <Box sx={{textAlign: 'center'}}>
                    <AccountPageLoginForm onSubmit={onSubmit} />
                </Box>
            }
            {showSnack ?
                <CustomSnackbar
                    duration={duration}
                    key_date={date}
                    variant={variant}
                    message={message}
                />
                : null
            }
        </>
    )
}
