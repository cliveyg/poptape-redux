import { createTheme } from '@mui/material/styles'
import { green, grey, blue, amber } from '@mui/material/colors'
import '@fontsource-variable/inter'
import '@fontsource/varela-round'

export function setupTheme() {

    const palette = {
        meep: green[200],
        success: {
            main: '#1e9d24', // another green
        },
        error: {
            main: '#ce0909',
        },
        info: {
            main: blue[300],
        },
        warning: {
            main: '#f3740e',
        },
        offwhite: {
          main: '#efefef'
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
          main: '#c4399f',
        },
        secondary: {
            main: '#2486F2',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#c2185b',
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
        sideMenuButtons: {
            marginTop: 15,
            textTransform: 'none',
            marginRight: 15,
            width: 200,
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