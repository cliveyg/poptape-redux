import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../assets/scripts/theme'
import Cookies from 'js-cookie'
import ProfileViewer from '../components/profile/ProfileViewer'
import ProfileOwner from '../components/profile/ProfileOwner'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useLocation } from 'react-router'
import SideMenu from '../components/navigation/SideMenu'
//import Typography from "@mui/material/Typography";

export default function UserProfilePage(props) {

    const username = Cookies.get('username')
    const [owner, setOwner] = React.useState(null)

    const urlArray = useLocation().pathname.split("/")
    const urlUsername = urlArray[2]
    //TODO: Check this is not a security issue
    if (urlUsername === username) {
        if (!owner) {
            setOwner(true)
        }
    }
    const theme = setupTheme()

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ml: 1}}>
                    {owner ?
                        <ProfileOwner />
                        :
                        <ProfileViewer username={urlUsername} />
                    }
                </Box>
            </ThemeProvider>
        </>
    )
}
