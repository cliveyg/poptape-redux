import React, { createContext, useContext, useState } from 'react'
import FaceIcon from '@mui/icons-material/Face'
import {SvgIcon} from '@mui/material'
import {getIcon, getImageString} from '../../assets/scripts/profile_helpers.jsx'

// for some reason we have to load these twice - once with ?react and once without
// as mui icon needs the ?react and avatar doesn't work with it
import avatar_01 from '../../assets/images/avatars/svg-avatars/avatar-1-svgrepo-com.svg?react'
import avatar_02 from '../../assets/images/avatars/svg-avatars/avatar-2-svgrepo-com.svg?react'
import avatar_03 from '../../assets/images/avatars/svg-avatars/avatar-3-svgrepo-com.svg?react'
import avatar_04 from '../../assets/images/avatars/svg-avatars/avatar-4-svgrepo-com.svg?react'
import avatar_05 from '../../assets/images/avatars/svg-avatars/avatar-5-svgrepo-com.svg?react'
import avatar_06 from '../../assets/images/avatars/svg-avatars/avatar-6-svgrepo-com.svg?react'
import avatar_07 from '../../assets/images/avatars/svg-avatars/avatar-7-svgrepo-com.svg?react'
import avatar_08 from '../../assets/images/avatars/svg-avatars/avatar-8-svgrepo-com.svg?react'
import avatar_09 from '../../assets/images/avatars/svg-avatars/avatar-9-svgrepo-com.svg?react'
import avatar_10 from '../../assets/images/avatars/svg-avatars/avatar-10-svgrepo-com.svg?react'
import avatar_11 from '../../assets/images/avatars/svg-avatars/avatar-11-svgrepo-com.svg?react'
import avatar_12 from '../../assets/images/avatars/svg-avatars/avatar-12-svgrepo-com.svg?react'
import avatar_13 from '../../assets/images/avatars/svg-avatars/avatar-13-svgrepo-com.svg?react'
import avatar_14 from '../../assets/images/avatars/svg-avatars/avatar-14-svgrepo-com.svg?react'
import avatar_15 from '../../assets/images/avatars/svg-avatars/avatar-15-svgrepo-com.svg?react'
import avatar_16 from '../../assets/images/avatars/svg-avatars/avatar-16-svgrepo-com.svg?react'
import avatar_17 from '../../assets/images/avatars/svg-avatars/avatar-17-svgrepo-com.svg?react'
import avatar_18 from '../../assets/images/avatars/svg-avatars/avatar-18-svgrepo-com.svg?react'
import avatar_19 from '../../assets/images/avatars/svg-avatars/avatar-19-svgrepo-com.svg?react'
import avatar_20 from '../../assets/images/avatars/svg-avatars/avatar-20-svgrepo-com.svg?react'
import avatar_21 from '../../assets/images/avatars/svg-avatars/avatar-21-svgrepo-com.svg?react'
import avatar_22 from '../../assets/images/avatars/svg-avatars/avatar-22-svgrepo-com.svg?react'

import avatar_01i from '../../assets/images/avatars/svg-avatars/avatar-1-svgrepo-com.svg'
import avatar_02i from '../../assets/images/avatars/svg-avatars/avatar-2-svgrepo-com.svg'
import avatar_03i from '../../assets/images/avatars/svg-avatars/avatar-3-svgrepo-com.svg'
import avatar_04i from '../../assets/images/avatars/svg-avatars/avatar-4-svgrepo-com.svg'
import avatar_05i from '../../assets/images/avatars/svg-avatars/avatar-5-svgrepo-com.svg'
import avatar_06i from '../../assets/images/avatars/svg-avatars/avatar-6-svgrepo-com.svg'
import avatar_07i from '../../assets/images/avatars/svg-avatars/avatar-7-svgrepo-com.svg'
import avatar_08i from '../../assets/images/avatars/svg-avatars/avatar-8-svgrepo-com.svg'
import avatar_09i from '../../assets/images/avatars/svg-avatars/avatar-9-svgrepo-com.svg'
import avatar_10i from '../../assets/images/avatars/svg-avatars/avatar-10-svgrepo-com.svg'
import avatar_11i from '../../assets/images/avatars/svg-avatars/avatar-11-svgrepo-com.svg'
import avatar_12i from '../../assets/images/avatars/svg-avatars/avatar-12-svgrepo-com.svg'
import avatar_13i from '../../assets/images/avatars/svg-avatars/avatar-13-svgrepo-com.svg'
import avatar_14i from '../../assets/images/avatars/svg-avatars/avatar-14-svgrepo-com.svg'
import avatar_15i from '../../assets/images/avatars/svg-avatars/avatar-15-svgrepo-com.svg'
import avatar_16i from '../../assets/images/avatars/svg-avatars/avatar-16-svgrepo-com.svg'
import avatar_17i from '../../assets/images/avatars/svg-avatars/avatar-17-svgrepo-com.svg'
import avatar_18i from '../../assets/images/avatars/svg-avatars/avatar-18-svgrepo-com.svg'
import avatar_19i from '../../assets/images/avatars/svg-avatars/avatar-19-svgrepo-com.svg'
import avatar_20i from '../../assets/images/avatars/svg-avatars/avatar-20-svgrepo-com.svg'
import avatar_21i from '../../assets/images/avatars/svg-avatars/avatar-21-svgrepo-com.svg'
import avatar_22i from '../../assets/images/avatars/svg-avatars/avatar-22-svgrepo-com.svg'
import request from 'superagent'
import Cookies from 'js-cookie'
// Create the context
const GlobalContext = createContext()

/*
function getIcon(iconName) {

    if (iconName === 'avatar_01') {
        return <SvgIcon component={avatar_01} inheritViewBox/>
    }
    if (iconName === 'avatar_02') {
        return <SvgIcon component={avatar_02} inheritViewBox/>
    }
    if (iconName === 'avatar_03') {
        return <SvgIcon component={avatar_03} inheritViewBox/>
    }
    if (iconName === 'avatar_04') {
        return <SvgIcon component={avatar_04} inheritViewBox/>
    }
    if (iconName === 'avatar_05') {
        return <SvgIcon component={avatar_05} inheritViewBox/>
    }
    if (iconName === 'avatar_06') {
        return <SvgIcon component={avatar_06} inheritViewBox/>
    }
    if (iconName === 'avatar_07') {
        return <SvgIcon component={avatar_07} inheritViewBox/>
    }
    if (iconName === 'avatar_08') {
        return <SvgIcon component={avatar_08} inheritViewBox/>
    }
    if (iconName === 'avatar_09') {
        return <SvgIcon component={avatar_09} inheritViewBox/>
    }
    if (iconName === 'avatar_10') {
        return <SvgIcon component={avatar_10} inheritViewBox/>
    }
    if (iconName === 'avatar_11') {
        return <SvgIcon component={avatar_11} inheritViewBox/>
    }
    if (iconName === 'avatar_12') {
        return <SvgIcon component={avatar_12} inheritViewBox/>
    }
    if (iconName === 'avatar_13') {
        return <SvgIcon component={avatar_13} inheritViewBox/>
    }
    if (iconName === 'avatar_14') {
        return <SvgIcon component={avatar_14} inheritViewBox/>
    }
    if (iconName === 'avatar_15') {
        return <SvgIcon component={avatar_15} inheritViewBox/>
    }
    if (iconName === 'avatar_16') {
        return <SvgIcon component={avatar_16} inheritViewBox/>
    }
    if (iconName === 'avatar_17') {
        return <SvgIcon component={avatar_17} inheritViewBox/>
    }
    if (iconName === 'avatar_18') {
        return <SvgIcon component={avatar_18} inheritViewBox/>
    }
    if (iconName === 'avatar_19') {
        return <SvgIcon component={avatar_19} inheritViewBox/>
    }
    if (iconName === 'avatar_20') {
        return <SvgIcon component={avatar_20} inheritViewBox/>
    }
    if (iconName === 'avatar_21') {
        return <SvgIcon component={avatar_21} inheritViewBox/>
    }
    if (iconName === 'avatar_22') {
        return <SvgIcon component={avatar_22} inheritViewBox/>
    }
}

function getImageString(iconName) {

    if (iconName === 'avatar_01') {
        return avatar_01i
    }
    if (iconName === 'avatar_02') {
        return avatar_02i
    }
    if (iconName === 'avatar_03') {
        return avatar_03i
    }
    if (iconName === 'avatar_04') {
        return avatar_04i
    }
    if (iconName === 'avatar_05') {
        return avatar_05i
    }
    if (iconName === 'avatar_06') {
        return avatar_06i
    }
    if (iconName === 'avatar_07') {
        return avatar_07i
    }
    if (iconName === 'avatar_08') {
        return avatar_08i
    }
    if (iconName === 'avatar_09') {
        return avatar_09i
    }
    if (iconName === 'avatar_10') {
        return avatar_10i
    }
    if (iconName === 'avatar_11') {
        return avatar_11i
    }
    if (iconName === 'avatar_12') {
        return avatar_12i
    }
    if (iconName === 'avatar_13') {
        return avatar_13i
    }
    if (iconName === 'avatar_14') {
        return avatar_14i
    }
    if (iconName === 'avatar_15') {
        return avatar_15i
    }
    if (iconName === 'avatar_16') {
        return avatar_16i
    }
    if (iconName === 'avatar_17') {
        return avatar_17i
    }
    if (iconName === 'avatar_18') {
        return avatar_18i
    }
    if (iconName === 'avatar_19') {
        return avatar_19i
    }
    if (iconName === 'avatar_20') {
        return avatar_20i
    }
    if (iconName === 'avatar_21') {
        return avatar_21i
    }
    if (iconName === 'avatar_22') {
        return avatar_22i
    }

}

*/

// context provider component
export function GlobalProvider({ children }) {
    let ic = <SvgIcon component={avatar_01} inheritViewBox/>
    let im = avatar_01i
    const [profile, setProfile] = useState()
    if (localStorage.getItem('avatar') !== null) {
        ic = getIcon(localStorage.getItem('avatar'))
        im = getImageString(localStorage.getItem('avatar'))
    } else {
        // call profile microservice
        const req = request
        req.get("/profile")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
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
                console.log(err)
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