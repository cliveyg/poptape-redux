import * as React from 'react'
import { Routes, Route } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import DisplayPage from './pages/DisplayPage'
import CreateItemPage from './pages/CreateItemPage'

function App() {

    return (
        <>
            <CssBaseline />
            <Container maxWidth={false} disableGutters>
                <Routes>
                    <Route path='/' element={ <HomePage/> } />
                    <Route exact path='/user/:username' element={<DisplayPage page='profile'/>} />
                    <Route exact path="/user/:username/reviews" element={<DisplayPage page='review'/>} />
                    <Route exact path='/user/:username/account' element={<DisplayPage page='account'/>} />
                    <Route exact path='/item/create' element={<CreateItemPage/>} />
                    <Route path='*' element={ <NotFoundPage/> } />
                </Routes>
            </Container>
        </>
    )
}

export default App
