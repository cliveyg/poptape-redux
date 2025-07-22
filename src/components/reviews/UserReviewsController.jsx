import * as React from 'react'
import Cookies from 'js-cookie'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {ThemeProvider} from '@mui/material/styles'
import {selectTheme} from '../../assets/scripts/theme'

export default function UserReviewsController() {

    document.title = 'POPTAPE | '+Cookies.get('username')+' | reviews'
    const theme = selectTheme()

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', ml: 2}}>
                <Typography sx={{fontSize: '1.1em'}}>
                    User reviews
                </Typography>
                <Box flexGrow={1}>
                    Reviews stuff
                </Box>
            </Box>
        </ThemeProvider>
    )
}

