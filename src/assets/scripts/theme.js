import { createTheme } from '@mui/material/styles'
import {green, grey, blue} from '@mui/material/colors'
import '@fontsource-variable/inter'
import '@fontsource/varela-round'

export function setupTheme() {

    const palette = {
        meep: green[200],
        vdark: grey[900],
        vblue: blue[300],
        success: {
            //main: '#009688', // green
            main: '#66bb6a', // another green
            //main: '#FFA500',   // orangey
            //testy: '#ffab00',
        },
        error: {
            main: '#c2185b',
        },
        testy: '#ffab00',
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
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