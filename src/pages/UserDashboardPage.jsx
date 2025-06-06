import React from 'react'
import '../css/poptape.css'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import {setupTheme} from '../assets/scripts/theme.js'
import {ThemeProvider} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import {useTranslation} from 'react-i18next'

export default function UserDashboardPage() {

    const { t } = useTranslation()
    const username = Cookies.get('username') || null
    const theme = setupTheme()

    React.useEffect(() => {
        document.title = 'POPTAPE | ' + username + ' | '+ t('dashboard:dp_title')
    }, []);

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