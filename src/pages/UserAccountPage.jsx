import * as React from 'react'
import '../css/poptape.css'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import request from 'superagent'
import AccountPageLoginForm from '../components/account/AccountPageLoginForm'
import AccountPageController from '../components/account/AccountPageController'
import { useLocation } from 'react-router'

function UserAccountPage() {

    const username = Cookies.get('username') || null
    document.title = 'POPTAPE | '+username+' | account'
    const [accountAuthed, setAccountAuthed] = React.useState(
        Cookies.get('account-access-token') || null)

    const getFieldFromToken = (token, field) => {
        const tokenArray = token.split(".")
        const base64decoded = JSON.parse(atob(tokenArray[1]))
        return base64decoded[field]
    }

    const onSubmit = (data) => {
        const req = request
        req.post('/authy/login')
            .send(JSON.stringify(data))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(res => {
                if (getFieldFromToken(res.body.token, 'public_id') ===
                    getFieldFromToken(Cookies.get('access-token'), 'public_id')) {
                    let inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
                    Cookies.set('account-access-token',
                                res.body.token,
                                { expires: inTenMinutes })
                    setAccountAuthed(true)
                }
            })
            .catch(err => {
                console.log(err)
            });

    }
    const location = useLocation()

    const urlPath = location.pathname
    const urlArray = urlPath.split("/")
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
        </>
    )
}

export default UserAccountPage
