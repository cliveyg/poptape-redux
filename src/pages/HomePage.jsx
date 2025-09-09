import React, {useState} from 'react'
import '../css/poptape.css'
import TopNavBar from '../components/navigation/TopNavBar'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {ThemeProvider} from '@mui/material/styles'
import {selectTheme} from '../assets/scripts/theme'
import {useTranslation} from 'react-i18next'
import {useGlobalSettings} from '../components/helpers/GlobalSettings'
import CountDownTimer from '../components/helpers/CountDownTimer'
import { purple } from '@mui/material/colors'
//import Avatar from '@mui/material/Avatar'

function HomePage() {
    const { t } = useTranslation()
    const { profileIcon, setProfileIcon, profileImageString, setProfileImageString } = useGlobalSettings()

    const [duration, setDuration] = useState(5)
    React.useEffect(() => {
        document.title = 'POPTAPE | ' + t('homepage:hp_title')
    }, [])

    const handleOnComplete = () => {
        console.log("Timer finished")
    }

    const [theme, _] = React.useState(selectTheme())
    const [key, setKey] = useState(0)

    const setCTFont = () => {
        const f = localStorage.getItem('font') || 'Courier'
        const monoFonts = ["Kode Mono Variable", "Cutive Mono", "Courier New", "Anonymous Pro", "Share Tech Mono"]
        if (monoFonts.includes(f)) {
            return f
        }
        return 'Courier'
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
                <Box><Typography>homepage wibble</Typography><br />This is some text and a <Link href="/item/create" underline='none' sx={{ textDecoration: 'none'}}>create item</Link></Box>
                <Box>This is a <Link href="/item/f7884d63-7507-43ed-8196-8ee0b6455ed6" underline='none'>linky</Link> to a non existent item</Box>
                <Box>Link to <Link href="/test/woop">test page</Link></Box>
                <Box>{t('homepage:hp_test')}</Box>
                <Box>
                    profileIcon:<br/>
                    {profileIcon}
                    <br/>
                </Box>
                <div key={key}>
                <CountDownTimer
                    duration={duration}
                    infont={setCTFont}
                    onComplete={handleOnComplete}
                />
                </div>
                <Button
                    onClick={() => setKey((k) => k + 1)}
                    variant='outlined'
                    sx={[
                        {
                            textTransform: 'none'
                        },
                        {
                            color: theme.palette.getContrastText(theme.palette.secondary.light),
                            backgroundColor: theme.palette.secondary.light
                        },
                        {
                            '&:hover': {
                                color: theme.palette.error.main,
                                backgroundColor: theme.palette.getContrastText(theme.palette.error.main)
                            }
                        }
                    ]}
                >
                restart
                </Button>

                {/*
                <Box>
                    Avatar using icon:<br/>
                    <Avatar sx={{ height: '40px', width: '40px'}}>
                        {profileIcon}
                    </Avatar>
                </Box>
                <Box>
                    Avatar profileImageString:<br/>
                    <Avatar
                        alt="my avatar"
                        src={profileImageString}
                        sx="xl"
                    />
                </Box>
                <Box>
                    An image from profileImageString:<br/>
                    <img
                        src={profileImageString}
                        alt="my image"
                        style={{
                            width: 42,
                            height: 42,
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "2px solid #eee",
                        }}
                    />
                </Box>
                */}
            </Paper>
        </ThemeProvider>
    )
}

export default HomePage
