import React, { createContext, useContext, useState } from 'react'
import FaceIcon from '@mui/icons-material/Face'
import { getIcon, getImageString } from './ProfileIcon.jsx'
import superagent from 'superagent'
import Cookies from 'js-cookie'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
    let ic = <FaceIcon />
    let im = ""
    const [profile, setProfile] = useState()
    if (localStorage.getItem('avatar') !== null) {
        ic = getIcon(localStorage.getItem('avatar'))
        im = getImageString(localStorage.getItem('avatar'))
    } else {
        superagent.get("/profile")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("x-access-token", Cookies.get('access-token'))
            .then((res) => {
                // handle response
            })
            .catch((err) => {
                if (err.status === 401) {
                    Cookies.delete("token")
                }
            })
    }

    const [profileIcon, setProfileIcon] = useState(ic)
    const [profileImageString, setProfileImageString] = useState(im)
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('access-token'))

    return (
        <GlobalContext.Provider value={{
            profileIcon, setProfileIcon,
            profileImageString, setProfileImageString,
            isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalSettings() {
    return useContext(GlobalContext)
}