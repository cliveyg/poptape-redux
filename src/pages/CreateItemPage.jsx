import * as React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../assets/scripts/theme'
import '../css/poptape.css'
import MainNavBar from '../components/navigation/TopNavBar'
import Paper from '@mui/material/Paper'

import CreateItemForm from '../components/items/CreateItemForm'
import Box from "@mui/material/Box";

export default function CreateItemPage() {
    const theme = setupTheme()
    return (
        <Box sx={{ width: '100%' }}>
            <ThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <Box>
                <Paper sx={{ margin: 20 }}>
                    <CreateItemForm />
                </Paper>
            </Box>
            </ThemeProvider>
        </Box>
    )
}
