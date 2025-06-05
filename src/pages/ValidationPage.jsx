import React from 'react'
import "@fontsource/varela-round"
import '../css/poptape.css'
import TopNavBar from '../components/navigation/TopNavBar'
import LanguageSwitcher from '../components/helpers/LanguageSwitcher'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { setupTheme } from '../assets/scripts/theme'
import {useTranslation} from 'react-i18next'

function ValidationPage() {
    const { t } = useTranslation()
    document.title = 'POPTAPE | '+t('vp_title')
    const theme = setupTheme()
    return (
        <>
            <header>
                <TopNavBar />
            </header>
            <Paper sx={{
                margin: theme.spacing(1),
                padding: 1,
                variant: 'outlined',
                backgroundColor: 'offwhite.main',
            }}
            >
                <Box>
                    {t('validation:vp_blurb')}
                </Box>
            </Paper>
        </>
    )
}

export default ValidationPage
