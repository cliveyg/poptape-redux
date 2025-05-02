import React from 'react'
import "@fontsource/varela-round"
import '../css/poptape.css'
import TopNavBar from "../components/navigation/TopNavBar"
import Link from '@mui/material/Link'

function HomePage() {
    document.title = 'POPTAPE | home'
    return (
        <>
            <header>
                <TopNavBar />
            </header>
            <div className='testy'>homepage wibble<br />This is some text and a <Link href="#" underline='none' sx={{ textDecoration: 'none'}}>link</Link></div>
        </>
    )
}

export default HomePage
