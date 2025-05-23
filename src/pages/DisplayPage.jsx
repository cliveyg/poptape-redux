import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../assets/scripts/theme'
import TopNavBar from '../components/navigation/TopNavBar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SideMenu from '../components/navigation/SideMenu'
import UserAccountPage from './UserAccountPage'
import UserProfilePage from './UserProfilePage'
import UserReviewsPage from './UserReviewsPage'
import Cookies from 'js-cookie'
import UserDashboardPage from './UserDashboardPage'

export default function DisplayPage({loggedIn, page}) {

    const theme = setupTheme()

    if (Cookies.get('access-token') === undefined || Cookies.get('access-token') === null) {
        window.location.replace('/')
    }

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
                            backgroundColor: 'offwhite.main',
                        }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <SideMenu selected={page} />
                                <Box sx={{flexGrow: 1}}>
                                    {page === 'dashboard' ?
                                        <UserDashboardPage />
                                        :
                                        null
                                    }
                                    {page === 'notifications' ?
                                        <UserProfilePage />
                                        :
                                        null
                                    }
                                    {page === 'messages' ?
                                        <UserProfilePage />
                                        :
                                        null
                                    }
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
                                    {page === 'reviews' ?
                                        <UserReviewsPage />
                                        :
                                        null
                                    }
                                    {page === 'myitems' ?
                                        <UserReviewsPage />
                                        :
                                        null
                                    }
                                    {page === 'auctions' ?
                                        <UserReviewsPage />
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
