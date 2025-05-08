import * as React from 'react'
import '../css/poptape.css'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import {setupTheme} from "../assets/scripts/theme.js";
import {ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function UserDashboardPage() {

    const username = Cookies.get('username') || null
    document.title = 'POPTAPE | ' + username + ' | dashboard'

    const theme = setupTheme()

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ml: 1}}>
                    <Typography sx={{mb: '2', fontSize: '1.2em'}}>
                        User dashboard for {username}
                    </Typography>
                    Dashboardy stuff
                </Box>
            </ThemeProvider>
        </>
    )
}