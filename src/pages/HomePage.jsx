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

function HomePage() {
    const { t } = useTranslation()

    React.useEffect(() => {
        document.title = 'POPTAPE | ' + t('homepage:hp_title')
    }, []);

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
                <Box className='testy'>homepage wibble<br />This is some text and a <Link href="/item/create" underline='none' sx={{ textDecoration: 'none'}}>create item</Link></Box>
                <Box>This is a <Link href="/item/f7884d63-7507-43ed-8196-8ee0b6455ed6" underline='none'>linky</Link> to a non existent item</Box>
                <Box>Link to <Link href="/test/woop">test page</Link></Box>
                <Box>{t('homepage:hp_test')}</Box>
                <Box>
                    <LanguageSwitcher />
                </Box>
                <Box>
                    Woop
                </Box>
            </Paper>
        </>
    )
}

export default HomePage
