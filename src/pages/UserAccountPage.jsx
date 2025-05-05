import React from 'react'
import "@fontsource/varela-round"
import '../css/poptape.css'
import TopNavBar from "../components/navigation/TopNavBar"
import Cookies from 'js-cookie'

export default function UserAccountPage(props) {

    const username = Cookies.get('username') || 'guest'
    document.title = 'POPTAPE | '+username+' | account'
    const [accountAuthed, setAccountAuthed] = React.useState(
        Cookies.get('access-token') || null);

    const getFieldFromToken = (token, field) => {
        const tokenArray = token.split(".")
        const base64decoded = JSON.parse(atob(tokenArray[1]))
        return base64decoded[field]
    }

    /*
    const onSubmit = (event, data) => {
        const request = require('superagent')
        request.post('/authy/login')
            .send(JSON.stringify(data))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(res => {
                if (getFieldFromToken(res.body.token) ===
                    getFieldFromToken(Cookies.get('access-token'), 'public_id')) {
                    Cookies.set('account-access-token',
                        res.body.token,
                        { path: '/user/'+data.username+'/account' })

                    setAccountAuthed(true)
                }
            })
            .catch(err => {
                console.log(err)
            });

    }
    const urlPath = props.location.pathname
    const urlArray = urlPath.split("/")



    const urlUsername = urlArray[2]
    if (urlUsername !== Cookies.get('username')) {
        if (accountAuthed) {
            setAccountAuthed(false)
        }
    }
     */

    return (
        <>
            <header>
                <TopNavBar />
            </header>
            <div style={{ textAlign: "center", marginBottom: 20  }}>
                User account page
            </div>
        </>
    )
}
