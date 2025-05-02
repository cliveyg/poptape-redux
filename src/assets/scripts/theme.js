import { createTheme } from '@mui/material/styles'
import { green, grey, blue, amber } from '@mui/material/colors'
import '@fontsource-variable/inter'
import '@fontsource/varela-round'

export function setupTheme() {

    const palette = {
        meep: green[200],
        success: {
            main: '#66bb6a', // another green
        },
        error: {
            main: '#c2185b',
        },
        info: {
            main: blue[200],
        },
        warning: {
            main: amber[700],
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
    }

    return createTheme({
        palette,
        typography: {
            fontFamily: [
                'Inter Variable',
                'Varela Round',
                'Roboto',
            ].join(','),
        },
        components: {
            MuiLink: {
                defaultProps: {
                    underline: 'none',
                    color: '#c2185b',
                },
            },
        },
    })
}