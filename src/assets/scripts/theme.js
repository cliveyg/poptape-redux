import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import { green, blue } from '@mui/material/colors'
import '@fontsource-variable/inter'
import '@fontsource/varela-round'
import '@fontsource/kanit'
import '@fontsource-variable/baloo-2'
import '@fontsource/pacifico'
import '@fontsource-variable/dosis'
import '@fontsource/noto-serif-grantha'
import '@fontsource/zen-kaku-gothic-new/500.css'
import '@fontsource-variable/comfortaa'
import '@fontsource-variable/literata'
import '@fontsource/kulim-park'
import '@fontsource/port-lligat-slab'
import '@fontsource/lateef'
import '@fontsource/cutive-mono'
import '@fontsource/fauna-one'
import '@fontsource/alata'
import '@fontsource-variable/gabarito'
import '@fontsource-variable/baloo-bhai-2'
import '@fontsource/goldman'
import '@fontsource/special-elite'
import '@fontsource/share-tech-mono'
import '@fontsource/courier-prime'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/work-sans'
import '@fontsource-variable/oswald'
import '@fontsource/vollkorn-sc'
import '@fontsource/concert-one'
import '@fontsource/gugi'
import '@fontsource/koulen'
import '@fontsource/lekton'
import '@fontsource/anonymous-pro'
import '@fontsource/narnoor'
import '@fontsource-variable/alumni-sans'
import '@fontsource-variable/kode-mono'

// list of themes
const ta = ["default", "blue", "pink", "funky", "royal", "sweet", "wine", "grey", "mulberry", "green", "dark 1", "dark 2", "dark 3", "xanthous", "tomato", "peagreen"]

//=============================================================================

const defaultTheme = createTheme({
    palette: {
        notifications: green[200],
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
            main: '#B47EB3',
        },
        secondary: {
            main: '#92D1C3',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            //error: '#c2185b',
            error: '#941b0c',
        },
        timer: {
            background: '#92D1C3',
        },
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

//=============================================================================

const pinkTheme = createTheme({
    palette: {
        notifications: green[200],
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
            //error: '#c2185b',
            error: '#941b0c',
        },
        timer: {
            background: '#efefef',
        },
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

//=============================================================================

const funkyTheme = createTheme({
    palette: {
        notifications: '#c6ecae',
        success: {
            main: '#94c9a9',
        },
        error: {
            main: '#941b0c',
        },
        info: {
            main: '#1b68e8',
        },
        warning: {
            main: '#c25b0b',
        },
        offwhite: {
            main: '#f5e1b7'
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
            main: '#d5573b',
        },
        secondary: {
            main: '#885053',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#941b0c',
        },
        timer: {
            background: '#e8e2c5',
        },
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

//=============================================================================

const blueTheme = createTheme({
    palette: {
        notifications: green[200],
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
            main: '#2486F2',
        },
        secondary: {
            main: '#9f4263',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#941b0c',
        },
        timer: {
            background: '#7aa9d7',
        },
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

//=============================================================================

const royalTheme = createTheme({
    palette: {
        notifications: green[200],
        success: {
            main: '#285e29', // another green
        },
        error: {
            main: '#93053e',
        },
        info: {
            main: blue[300],
        },
        warning: {
            main: '#a14f0f',
        },
        offwhite: {
            main: '#efefef'
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
            main: '#03256c',
        },
        secondary: {
            main: '#1768ac',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#93053e',
        },
        timer: {
            background: '#b9b6b6',
        },
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
                color: '#f3740e',
            },
        },
    },
})

//=============================================================================

const sweetTheme = createTheme({
    palette: {
        notifications: '#c6ecae',
        success: {
            main: '#00afb9',
        },
        error: {
            main: '#f07167',
        },
        info: {
            main: '#1b68e8',
        },
        warning: {
            main: '#fed9b7',
        },
        offwhite: {
            main: '#f6e9d1'
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
            main: '#0081a7',
        },
        secondary: {
            main: '#fed9b7',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#810202',
        },
        timer: {
            background: '#d3c2b3',
        },
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
                color: '#f07167',
            },
        },
    },
})

//=============================================================================

const wineTheme = createTheme({
    palette: {
        notifications: '#c6ecae',
        success: {
            main: '#345e2d',
        },
        error: {
            main: '#801129',
        },
        info: {
            main: '#4173cb',
        },
        warning: {
            main: '#cd8b76',
        },
        offwhite: {
            main: '#e1d89f',
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
            main: '#7d387d',
            light: '#c45baa',
        },
        secondary: {
            main: '#27474e',
            light: '#4d8896',
            dark: '#0a353d',
            smenu: '#ce6d05',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#810202',
        },
        timer: {
            background: '#e1d89f',
        },
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
                color: '#f07167',
            },
        },
    },
})

//=============================================================================

const greyTheme = createTheme({
    palette: {
        notifications: '#0081a7',
        stb_a: '#27474e',
        success: {
            main: '#00AFB9',
        },
        error: {
            main: '#f07167',
        },
        info: {
            main: '#0081a7',
        },
        warning: {
            main: '#fed9b7',
        },
        offwhite: {
            main: '#eef1ef'
        },
        noom: {
            color: 'black',
            backgroundColor: '#fed9b7',
        },
        primary: {
            main: '#7d98a1',
            dark: '#5e6572',
        },
        secondary: {
            main: '#a9b4c2',
            light: '#a5ccda',
            dark: '#1c2321',
            smenu: '#F07167',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#F07167',
        },
        timer: {
            background: '#a5ccda',
        },
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
                color: '#f07167',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

const mulberryTheme = createTheme({
    palette: {
        notifications: '#f56476',
        stb_a: '#27474e',
        success: {
            main: '#5f9f43',
        },
        error: {
            main: '#e43f6f',
        },
        info: {
            main: '#0081a7',
        },
        warning: {
            main: '#cc8d3c',
        },
        offwhite: {
            main: '#dfbbb1'
        },
        noom: {
            color: 'black',
            backgroundColor: '#fed9b7',
        },
        primary: {
            main: '#be3e82',
            dark: '#7a2857',
        },
        secondary: {
            main: '#5e4352',
            light: '#a17386',
            dark: '#3d2c37',
            smenu: '#F07167',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#e43f6f',
        },
        timer: {
            background: '#d2cfcf',
        },
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
                color: '#e43f6f',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

const greenTheme = createTheme({
    palette: {
        notifications: '#f56476',
        stb_a: '#27474e',
        success: {
            main: '#9abd97',
        },
        error: {
            main: '#e43f6f',
        },
        info: {
            main: '#3c7c91',
        },
        warning: {
            main: '#cc8d3c',
        },
        offwhite: {
            //main: '#bbc0bb'
            main: '#c8efc8'
        },
        noom: {
            color: 'black',
            backgroundColor: '#fed9b7',
        },
        primary: {
            //main: '#d0f1bf',
            //main: '#279439',
            main: '#1f792f',
            //dark: '#483d03',
            //light: '#d0f1bf',
            //contrastText: '#202520',
            contrastText: '#d0f1bf',
        },
        secondary: {
            main: '#9abd97',
            //main: '#646536',
            //light: '#d0f1bf',
            //dark: '#646536',
            smenu: '#F07167',
            contrastText: '#202520',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#e43f6f',
        },
        timer: {
            background: '#d0f1bf',
        },
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
                color: '#e43f6f',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

const dark1Theme = createTheme({
    palette: {
        notifications: '#f56476',
        stb_a: '#27474e',
        success: {
            main: '#9abd97',
        },
        error: {
            main: '#e43f6f',
        },
        info: {
            main: '#3c7c91',
        },
        warning: {
            main: '#cc8d3c',
        },
        offwhite: {
            main: '#2d2e2e'
        },
        noom: {
            color: 'black',
            backgroundColor: '#fed9b7',
        },
        mode: 'dark',
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#e43f6f',
        },
        timer: {
            background: '#777777',
        },
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
                color: '#9abd97',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

const dark2Theme = createTheme({
    palette: {
        notifications: green[200],
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
            main: '#423b3b'
        },
        mode: 'dark',
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
            main: '#7eb489',
        },
        secondary: {
            main: '#92D1C3',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            //error: '#c2185b',
            error: '#941b0c',
        },
        timer: {
            background: '#524a4a',
        },
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

//=============================================================================

const dark3Theme = createTheme({
    palette: {
        notifications: green[200],
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
            main: '#232020'
        },
        mode: 'dark',
        noom: {
            color: 'black',
            backgroundColor: '#FFA500',
        },
        primary: {
            main: '#bdbdba',
        },
        secondary: {
            main: '#92add1',
            smenu: '#ce6d05'
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            //error: '#c2185b',
            error: '#941b0c',
        },
        timer: {
            background: '#524a4a',
        },
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
                color: '#eebb41',
            },
        },
    },
})

//=============================================================================

const xanthousTheme = createTheme({
    palette: {
        notifications: '#e3170a',
        stb_a: '#27474e',
        success: {
            main: '#a9e5bb',
        },
        error: {
            main: '#e3170a',
        },
        info: {
            main: '#0081a7',
        },
        warning: {
            main: '#f3740e',
        },
        offwhite: {
            main: '#f7b32b'
        },
        noom: {
            color: 'black',
            backgroundColor: '#fed9b7',
        },
        primary: {
            main: '#2c2929',
            dark: '#7a2857',
        },
        secondary: {
            main: '#5e4352',
            light: '#a17386',
            dark: '#3d2c37',
            smenu: '#F07167',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#e3170a',
        },
        timer: {
            background: '#f3b86d',
        },
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
                color: '#e3170a',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

const tomatoTheme = createTheme({
    palette: {
        notifications: '#be0e07',
        stb_a: '#27474e',
        success: {
            main: '#0a9335',
        },
        error: {
            main: '#be0e07',
        },
        info: {
            main: '#0081a7',
        },
        warning: {
            main: '#f3740e',
        },
        offwhite: {
            main: '#e3ccaa'
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFC67B',
        },
        primary: {
            main: '#f55536',
            dark: '#7a2857',
        },
        secondary: {
            main: '#5e4352',
            light: '#a17386',
            dark: '#3d2c37',
            smenu: '#FFC67B',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#be0e07',
        },
        timer: {
            background: '#f5eef1',
        },
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
                color: '#e3170a',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

const peagreenTheme = createTheme({
    palette: {
        notifications: '#be0e07',
        stb_a: '#27474e',
        success: {
            main: '#237e3f',
        },
        error: {
            main: '#da0902',
        },
        info: {
            main: '#0081a7',
        },
        warning: {
            main: '#e86e0e',
        },
        offwhite: {
            main: '#6fa6bd'
        },
        noom: {
            color: 'black',
            backgroundColor: '#FFC67B',
        },
        primary: {
            main: '#A0CA92',
            dark: '#7a2857',
        },
        secondary: {
            main: '#ccd2d0',
            light: '#a17386',
            dark: '#3d2c37',
            smenu: '#FFC67B',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        snack: {
            error: '#be0e07',
        },
        timer: {
            background: '#7dadbe',
        },
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
                color: '#ebf8f8',
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'button_a' },
                    style: {
                        textTransform: 'none',
                        ":hover": {
                            textTransform: 'none',
                            backgroundColor: '#27474e',
                            color: '#e1d89f',
                            //border: '1px solid #1c2321',
                        },
                    },
                },
            ],
        },
    },
})

//=============================================================================

export function setFontFam(ff) {

    if (typeof ff !== 'undefined') {
        localStorage.setItem('font', ff)
    }

    if (localStorage.getItem('font') == null) {
        localStorage.setItem('font', 'Varela Round')
    }

}

//=============================================================================

export function getFontFam() {

    return createTheme({
        typography: {
            fontFamily: [
                localStorage.getItem('font'),
                'Roboto',
            ].join(','),
        }
    }).typography
}

//=============================================================================

export function selectTheme(tn) {

    if (typeof tn !== 'undefined') {
        if (ta.includes(tn)) {
            localStorage.setItem('theme', tn)
        } else {
            localStorage.setItem('theme', 'default')
        }
    }

    if (localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'default')
    }

    const theme = localStorage.getItem('theme')
    // we have to do the typography separately otherwise it doesn't
    // get picked up by many things on the page
    if (theme === 'blue') {
        return createTheme(blueTheme, {typography: getFontFam()})
    } else if (theme === 'pink') {
        return createTheme(pinkTheme, {typography: getFontFam()})
    } else if (theme === 'grey') {
        return createTheme(greyTheme, {typography: getFontFam()})
    } else if (theme === 'funky') {
        return createTheme(funkyTheme, {typography: getFontFam()})
    } else if (theme === 'royal') {
        return createTheme(royalTheme, {typography: getFontFam()})
    } else if (theme === 'mulberry') {
        return createTheme(mulberryTheme, {typography: getFontFam()})
    } else if (theme === 'green') {
        return createTheme(greenTheme, {typography: getFontFam()})
    } else if (theme === 'sweet') {
        return createTheme(sweetTheme, {typography: getFontFam()})
    } else if (theme === 'wine') {
        return createTheme(wineTheme, {typography: getFontFam()})
    } else if (theme === 'dark 1') {
        return createTheme(dark1Theme, {typography: getFontFam()})
    } else if (theme === 'dark 2') {
        return createTheme(dark2Theme, {typography: getFontFam()})
    } else if (theme === 'dark 3') {
        return createTheme(dark3Theme, {typography: getFontFam()})
    } else if (theme === 'default') {
        return createTheme(defaultTheme, {typography: getFontFam()})
    } else if (theme === 'xanthous') {
        return createTheme(xanthousTheme, {typography: getFontFam()})
    } else if (theme === 'tomato') {
        return createTheme(tomatoTheme, {typography: getFontFam()})
    } else if (theme === 'peagreen') {
        return createTheme(peagreenTheme, {typography: getFontFam()})
    } else {
        // drop into default theme
        return createTheme(defaultTheme, {typography: getFontFam()})
    }
}