import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import request from 'superagent'

// avatar images
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

const avatarList = [
    { 'avatar_01': avatar_01 },
    { 'avatar_02': avatar_02 },
    { 'avatar_03': avatar_03 },
    { 'avatar_04': avatar_04 },
    { 'avatar_05': avatar_05 },
    { 'avatar_06': avatar_06 },
    { 'avatar_07': avatar_07 },
    { 'avatar_08': avatar_08 },
    { 'avatar_09': avatar_09 },
    { 'avatar_10': avatar_10 },
    { 'avatar_11': avatar_11 },
    { 'avatar_12': avatar_12 },
    { 'avatar_13': avatar_13 },
    { 'avatar_14': avatar_14 },
    { 'avatar_15': avatar_15 },
    { 'avatar_16': avatar_16 },
    { 'avatar_17': avatar_17 },
    { 'avatar_18': avatar_18 },
    { 'avatar_19': avatar_19 },
    { 'avatar_20': avatar_20 },
    { 'avatar_21': avatar_21 },
    { 'avatar_22': avatar_22 },
];

function AvatarChooser({ avatarSize = null, avatarObj = null }) {
    const [currentAvatarName, setCurrentAvatarName] = useState(avatarName)
    const [currentAvatarSize, setCurrentAvatarSize] = useState(avatarSize)
    const [currentAvatarObj, setCurrentAvatarObj] = useState(avatarObj)

    // Fetch profile/avatar if not provided
    useEffect(() => {
        if (!profile && !avatarObj) {
            console.log("No profile and no avatarobj")
            const req = request
            let profileURL = "/profile"
            if (publicId) {
                profileURL = `/profile/${publicId}`
            }
        }
    }, [profile, avatarObj, publicId])

    // Set avatar object from avatarName or fallback
    useEffect(() => {

        if (!currentAvatarObj && currentAvatarName) {
            console.log("no currentAvatarObj and have currentAvatarName")
            let avatar = avatarList.find((o) => o[currentAvatarName]);
            if (!avatar) {
                avatar = avatarList[Math.floor(Math.random() * avatarList.length)];
            }
            const keys = Object.keys(avatar)
            setCurrentAvatarObj(avatar[keys[0]])
        } else if (!currentAvatarObj && !currentAvatarName) {
            console.log("no currentAvatarObj and no currentAvatarName")

            setCurrentAvatarObj(avatar_01)
        }
    }, [currentAvatarObj, currentAvatarName])

    return (
        <Avatar
            alt={currentAvatarName}
            src={currentAvatarObj}
            sx={avatarStyle || 'large'}
        />
    )
}

export default AvatarChooser