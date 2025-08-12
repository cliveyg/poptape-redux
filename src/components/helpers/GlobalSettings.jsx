import React, { createContext, useContext, useState } from 'react'
import FaceIcon from '@mui/icons-material/Face'
import {getIcon, getImageString} from './ProfileIcon.jsx'

import superagent from 'superagent'
import Cookies from 'js-cookie'
// Create the context
const GlobalContext = createContext()

// context provider component
export function GlobalProvider({ children }) {
    let ic = <FaceIcon/>
    let im = ""
    const [profile, setProfile] = useState()
    if (localStorage.getItem('avatar') !== null) {
        ic = getIcon(localStorage.getItem('avatar'))
        im = getImageString(localStorage.getItem('avatar'))
    } else {
        // call profile microservice
        superagent.get("/profile")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                console.log(res.status)
                /*
                setProfile(res.body)
                setProfileIcon(getIcon(res.body.standard_avatar))
                if (res.body.about_me !== null && res.body.about_me !== "") {
                    setAboutMe(res.body.about_me)
                }
                if (res.body.standard_avatar !== null && res.body.standard_avatar !== "") {
                    setAvatarName(res.body.standard_avatar)
                    setProfileIcon(getIcon(res.body.standard_avatar))
                    localStorage.setItem('avatar',res.body.standard_avatar)
                    setProfileImageString(res.body.standard_avatar)
                    setAvatarObj(profileImageString)
                }

                 */
                console.log("found profile")
            })
            .catch((err) => {
                console.log(err.status)
                if (err.status === 401) {
                    Cookies.delete("token")

                }
            })
    }

    const [profileIcon, setProfileIcon] = useState(ic)
    const [profileImageString, setProfileImageString] = useState(im)

    return (
        <GlobalContext.Provider value={{ profileIcon, setProfileIcon, profileImageString, setProfileImageString }}>
            {children}
        </GlobalContext.Provider>
    );
}

// custom hook to use the context
export function useGlobalSettings() {
    return useContext(GlobalContext);
}