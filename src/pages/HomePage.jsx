import React from 'react'
import "@fontsource/varela-round"
import '../css/poptape.css'
import TopNavBar from '../components/navigation/TopNavBar'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

function HomePage() {
    document.title = 'POPTAPE | home'
    return (
        <>
            <header>
                <TopNavBar />
            </header>
            <Box className='testy'>homepage wibble<br />This is some text and a <Link href="/item/create" underline='none' sx={{ textDecoration: 'none'}}>create item</Link></Box>
        </>
    )
}

export default HomePage
