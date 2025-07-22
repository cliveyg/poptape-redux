import * as React from 'react'
import {ThemeProvider} from '@mui/material/styles'
import { selectTheme } from '../assets/scripts/theme'
import '../css/poptape.css'
import MainNavBar from '../components/navigation/TopNavBar'
import Paper from '@mui/material/Paper'

import CreateItemForm from '../components/items/CreateItemForm'

export default function CreateItemPage() {
    const theme = selectTheme()
    return (
        <ThemeProvider theme={theme}>
        <header>
            <MainNavBar />
        </header>
        <Paper sx={{
            margin: theme.spacing(1),
            padding: 1,
            variant: 'outlined',
            backgroundColor: 'offwhite.main',
        }}
        >
            <CreateItemForm />
        </Paper>
        </ThemeProvider>
    )
}
