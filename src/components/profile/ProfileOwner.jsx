import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../../assets/scripts/theme'
import Box from '@mui/material/Box'

export default function ProfileOwner(props) {

    const theme = setupTheme()

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%'}}>

                    <Box>profile owner</Box>

            </Box>
        </ThemeProvider>
    )
}