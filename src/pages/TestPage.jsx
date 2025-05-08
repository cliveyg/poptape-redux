import * as React from 'react'
import { useParams } from 'react-router'
import '../css/poptape.css'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { setupTheme } from '../assets/scripts/theme'
import CustomizedSnackbars from '../components/information/CustomSnackbars'
import TopNavBar from "../components/navigation/TopNavBar.jsx";
import Button from "@mui/material/Button";

export default function TestPage() {

    let params = useParams()
    const [variant, setVariant] = React.useState('warning')
    const [message, setMessage] = React.useState('Something went bang!')
    const [showSnack, setshowSnack] = React.useState(false)
    const duration = 2000
    const date = new Date().getTime()

    console.log('In TestPage')
    console.log('Pass me in daddy ['+params.daddy+']')

    const theme = setupTheme()

    const showSnackFn = () => {
        setshowSnack(true)
        setTimeout(function() {
            setshowSnack(false)
        }, duration)
    }

    return (
        <>
            <header>
                <TopNavBar />
            </header>
            <ThemeProvider theme={theme}>
                <Box sx={{ml: 1}}>
                    In test page<br/>
                    <Button onClick={showSnackFn}>press me</Button>
                    {showSnack ?
                        <CustomizedSnackbars
                            duration={duration}
                            key_date={date}
                            variant={variant}
                            message={message}
                        />
                        :
                        null
                    }
                </Box>
            </ThemeProvider>
        </>
    )
}
