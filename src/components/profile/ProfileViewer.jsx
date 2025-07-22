import React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { selectTheme } from '../../assets/scripts/theme'
import Box from '@mui/material/Box'

export default function ProfileViewer(props) {

    const theme = selectTheme()

    return (
        <Box sx={{ width: '100%'}}>
            <ThemeProvider theme={theme}>
                <Box>profile viewer</Box>
            </ThemeProvider>
        </Box>
    )
}