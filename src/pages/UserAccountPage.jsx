import React from 'react'
import "@fontsource/varela-round"
import '../css/poptape.css'
import TopNavBar from "../components/navigation/TopNavBar"


export default function UserAccountPage(props) {

    const username = Cookies.get('username')
    const [accountAuthed, setAccountAuthed] = React.useState(
        Cookies.get('account-access-token') || null);

    const getPublicId = (token) => {
        const tokenArray = token.split(".")
        const base64decoded = JSON.parse(atob(tokenArray[1]))
        return base64decoded.public_id
    }

    const onSubmit = (event, data) => {
        const request = require('superagent')
        request.post('/authy/login')
            .send(JSON.stringify(data))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(res => {
                if (getPublicId(res.body.token) ===
                    getPublicId(Cookies.get('access-token'))) {
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
