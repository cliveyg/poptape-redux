import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../assets/scripts/theme'
import TopNavBar from '../components/navigation/TopNavBar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SideMenu from '../components/navigation/SideMenu'
import UserAccountPage from '../pages/UserAccountPage'
import UserProfilePage from '../pages/UserProfilePage'

export default function DisplayPage({page}) {

    const theme = setupTheme()

    return (
        <Box sx={{ width: '100%'}}>
            <header>
                <TopNavBar />
            </header>
            <ThemeProvider theme={theme}>
                <Box sx={{width: '100%'}}>
                    <Box sx={{ textAlign: 'justify'  }}>
                        <Paper sx={{
                            margin: theme.spacing(1),
                            padding: 1,
                            variant: 'outlined',
                        }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <SideMenu selected={page} />
                                <Box sx={{flexGrow: 1}}>
                                    {page === 'profile' ?
                                        <UserProfilePage />
                                    :
                                        null
                                    }
                                    {page === 'account' ?
                                        <UserAccountPage />
                                        :
                                        null
                                    }
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </ThemeProvider>
        </Box>
    )
}
