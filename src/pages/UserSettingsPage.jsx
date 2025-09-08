import React from 'react'
import '../css/poptape.css'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import {selectTheme, setFontFam} from '../assets/scripts/theme'
import {ThemeProvider} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import {useTranslation} from 'react-i18next'
import LanguageSwitcher from '../components/helpers/LanguageSwitcher'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TopNavBar from '../components/navigation/TopNavBar'
import SideMenu from '../components/navigation/SideMenu'

export default function UserSettingsPage() {

    const { t } = useTranslation()
    const username = Cookies.get('username') || null

    React.useEffect(() => {
        document.title = 'POPTAPE | ' + username + ' | '+ t('settings:st_title')
    }, []);

    const [theme, setTheme] = React.useState(selectTheme())
    const [displayValue, setDisplayValue] = React.useState(localStorage.getItem('theme'))
    const [font, setFont] = React.useState(localStorage.getItem('font'))

    const handleFontChange = (event, newFont) => {
        setFont(newFont)
    }
    const handleThemeChange = (event, newDisplayValue) => {
        setDisplayValue(newDisplayValue)
    }

    return (
        <ThemeProvider theme={theme}>
            <header>
                <TopNavBar />
            </header>
            <Paper sx={{
                margin: theme.spacing(1),
                padding: 1,
                variant: 'outlined',
                backgroundColor: 'offwhite.main',
                fontFamily: {...theme.typography.body1},
            }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <SideMenu selected='settings' />
                    <Box sx={{flexGrow: 1}}>
                        <Box sx={{ml: 1}}>
                            <Typography sx={{mb: '2', fontSize: '1.2em'}}>
                                {t('settings:st_header')}
                            </Typography>
                        </Box>
                        <Box sx={{pt: 1}}>
                            <LanguageSwitcher />
                        </Box>
                        <Box sx={{ml: 1, mt: 2}}>
                            <FormControl>
                                <FormLabel
                                    id='font'>
                                    {t('settings:st_theme')}
                                </FormLabel>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={displayValue}
                                    exclusive
                                    onChange={handleThemeChange}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                        '& .MuiToggleButtonGroup-firstButton': {
                                            width: '70px',
                                            height: '70px',
                                            textTransform: 'none',
                                        },
                                        '& .MuiToggleButtonGroup-middleButton': {
                                            borderLeft: '1px solid #0000001f',
                                            width: '70px',
                                            height: '70px',
                                            textTransform: 'none',
                                        },
                                        '& .MuiToggleButtonGroup-lastButton': {
                                            borderLeft: '1px solid #0000001f',
                                            width: '70px',
                                            height: '70px',
                                            textTransform: 'none',
                                        }
                                    }}
                                >
                                    <ToggleButton
                                        value="default"
                                        onClick={() => {
                                            let tm = selectTheme('default')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_default')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="pink"
                                        onClick={() => {
                                            let tm = selectTheme('pink')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_pink')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="blue"
                                        onClick={() => {
                                            let tm = selectTheme('blue')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_blue')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="funky"
                                        onClick={() => {
                                            let tm = selectTheme('funky')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_funky')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="royal"
                                        onClick={() => {
                                            let tm = selectTheme('royal')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_royal')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="sweet"
                                        onClick={() => {
                                            let tm = selectTheme('sweet')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_sweet')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="wine"
                                        onClick={() => {
                                            let tm = selectTheme('wine')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_wine')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="grey"
                                        onClick={() => {
                                            let tm = selectTheme('grey')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_grey')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="mulberry"
                                        onClick={() => {
                                            let tm = selectTheme('mulberry')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_mulberry')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="green"
                                        onClick={() => {
                                            let tm = selectTheme('green')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_green')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="dark 1"
                                        onClick={() => {
                                            let tm = selectTheme('dark 1')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_dark1')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="dark 2"
                                        onClick={() => {
                                            let tm = selectTheme('dark 2')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_dark2')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="xanthous"
                                        onClick={() => {
                                            let tm = selectTheme('xanthous')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_xanthous')}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="tomato"
                                        onClick={() => {
                                            let tm = selectTheme('tomato')
                                            setTheme(tm)
                                        }}
                                    >
                                        {t('settings:st_theme_tomato')}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ml:1, pt:2}}>
                            <FormControl>
                                <FormLabel
                                    id='font'>
                                    {t('settings:st_font')}
                                </FormLabel>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={font}
                                    exclusive
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                        '& .MuiToggleButtonGroup-firstButton': {
                                            width: '150px',
                                            height: '50px',
                                            textTransform: 'none',
                                        },
                                        '& .MuiToggleButtonGroup-middleButton': {
                                            borderLeft: '1px solid #0000001f',
                                            width: '150px',
                                            height: '50px',
                                            textTransform: 'none',
                                        },
                                        '& .MuiToggleButtonGroup-lastButton': {
                                            borderLeft: '1px solid #0000001f',
                                            width: '150px',
                                            height: '50px',
                                            textTransform: 'none',
                                        }
                                    }}
                                    onChange={handleFontChange}

                                >
                                    <ToggleButton
                                        value="Inter Variable"
                                        sx={{ fontFamily: 'Inter Variable' }}
                                        onClick={() => {
                                            setFontFam('Inter Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Inter Variable
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Special Elite"
                                        sx={{ fontFamily: 'Special Elite' }}
                                        onClick={() => {
                                            setFontFam('Special Elite')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Special Elite
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Noto Serif Grantha"
                                        sx={{ fontFamily: 'Noto Serif Grantha' }}
                                        onClick={() => {
                                            setFontFam('Noto Serif Grantha')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Noto Grantha
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Dosis Variable"
                                        sx={{ fontFamily: 'Dosis Variable' }}
                                        onClick={() => {
                                            setFontFam('Dosis Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Dosis
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Goldman"
                                        sx={{ fontFamily: 'Goldman' }}
                                        onClick={() => {
                                            setFontFam('Goldman')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Goldman
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Cutive Mono"
                                        sx={{ fontFamily: 'Cutive Mono' }}
                                        onClick={() => {
                                            setFontFam('Cutive Mono')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Cutive Mono
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Fauna One"
                                        sx={{ fontFamily: 'Fauna One' }}
                                        onClick={() => {
                                            setFontFam('Fauna One')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Fauna One
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Gabarito Variable"
                                        sx={{ fontFamily: 'Gabarito Variable' }}
                                        onClick={() => {
                                            setFontFam('Gabarito Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Gabarito
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Zen Kaku Gothic New"
                                        sx={{ fontFamily: 'Zen Kaku Gothic New' }}
                                        onClick={() => {
                                            setFontFam('Zen Kaku Gothic New')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Zen Kaku Gothic
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Varela Round"
                                        sx={{ fontFamily: 'Varela Round' }}
                                        onClick={() => {
                                            setFontFam('Varela Round')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Varela Round
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Port Lligat Slab"
                                        sx={{ fontFamily: 'Port Lligat Slab' }}
                                        onClick={() => {
                                            setFontFam('Port Lligat Slab')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Port Lligat
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Arial"
                                        sx={{ fontFamily: 'Arial' }}
                                        onClick={() => {
                                            setFontFam('Arial')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Arial
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Share Tech Mono"
                                        sx={{ fontFamily: 'Share Tech Mono' }}
                                        onClick={() => {
                                            setFontFam('Share Tech Mono')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Share Tech Mono
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Courier New"
                                        sx={{ fontFamily: 'Courier New' }}
                                        onClick={() => {
                                            setFontFam('Courier New')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Courier New
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Courier Prime"
                                        sx={{ fontFamily: 'Courier Prime' }}
                                        onClick={() => {
                                            setFontFam('Courier Prime')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Courier Prime
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Space Grotesk Variable"
                                        sx={{ fontFamily: 'Space Grotesk Variable' }}
                                        onClick={() => {
                                            setFontFam('Space Grotesk Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Space Grotesk
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Work Sans Variable"
                                        sx={{ fontFamily: 'Work Sans Variable' }}
                                        onClick={() => {
                                            setFontFam('Work Sans Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Work Sans
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Oswald Variable"
                                        sx={{ fontFamily: 'Oswald Variable' }}
                                        onClick={() => {
                                            setFontFam('Oswald Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Oswald
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Vollkorn SC"
                                        sx={{ fontFamily: 'Vollkorn SC' }}
                                        onClick={() => {
                                            setFontFam('Vollkorn SC')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Vollkorn SC
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Kulim Park"
                                        sx={{ fontFamily: 'Kulim Park' }}
                                        onClick={() => {
                                            setFontFam('Kulim Park')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Kulim Park
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Concert One"
                                        sx={{ fontFamily: 'Concert One' }}
                                        onClick={() => {
                                            setFontFam('Concert One')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Concert One
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Pacifico"
                                        sx={{ fontFamily: 'Pacifico' }}
                                        onClick={() => {
                                            setFontFam('Pacifico')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Pacifico
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Gugi"
                                        sx={{ fontFamily: 'Gugi' }}
                                        onClick={() => {
                                            setFontFam('Gugi')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Gugi
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Latif"
                                        sx={{ fontFamily: 'Latif' }}
                                        onClick={() => {
                                            setFontFam('Latif')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Latif
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Koulen"
                                        sx={{ fontFamily: 'Koulen' }}
                                        onClick={() => {
                                            setFontFam('Koulen')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Koulen
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Lekton"
                                        sx={{ fontFamily: 'Lekton' }}
                                        onClick={() => {
                                            setFontFam('Lekton')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Lekton
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Anonymous Pro"
                                        sx={{ fontFamily: 'Anonymous Pro' }}
                                        onClick={() => {
                                            setFontFam('Anonymous Pro')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Anonymous Pro
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Narnoor"
                                        sx={{ fontFamily: 'Narnoor' }}
                                        onClick={() => {
                                            setFontFam('Narnoor')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Narnoor
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Georgia"
                                        sx={{ fontFamily: 'Georgia' }}
                                        onClick={() => {
                                            setFontFam('Georgia')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Georgia
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Helvetica"
                                        sx={{ fontFamily: 'Helvetica' }}
                                        onClick={() => {
                                            setFontFam('Helvetica')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Helvetica
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Verdana"
                                        sx={{ fontFamily: 'Verdana' }}
                                        onClick={() => {
                                            setFontFam('Verdana')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Verdana
                                    </ToggleButton>
                                    <ToggleButton
                                        value="sans-serif"
                                        sx={{ fontFamily: 'sans-serif' }}
                                        onClick={() => {
                                            setFontFam('sans-serif')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Sans-Serif
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Alumni Sans Variable"
                                        sx={{ fontFamily: 'Alumni Sans Variable' }}
                                        onClick={() => {
                                            setFontFam('Alumni Sans Variable')
                                            let tm = selectTheme()
                                            setTheme(tm)
                                        }}
                                    >
                                        Alumni Sans
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            </ThemeProvider>
    )
}