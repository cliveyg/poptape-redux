import * as React from 'react'
import { Routes, Route } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import DisplayPage from './pages/DisplayPage'
import ItemPage from './pages/ItemPage'
import CreateItemPage from './pages/CreateItemPage'
import TestPage from './pages/TestPage'
import { GlobalProvider } from './components/helpers/GlobalSettings'
import UserSettingsPage from './pages/UserSettingsPage'

function App() {

    return (
        <>
            <CssBaseline />
            <GlobalProvider>
                <Container maxWidth={false} disableGutters>
                    <Routes>
                        <Route path='/' element={ <HomePage/> } />
                        <Route exact path='/user/:username' element={<DisplayPage page='profile'/>} />
                        <Route exact path='/user/dashboard' element={<DisplayPage page='dashboard'/>} />
                        <Route exact path='/user/:username/notifications' element={<DisplayPage page='notifications'/>} />
                        <Route exact path='/user/:username/messages' element={<DisplayPage page='messages'/>} />
                        <Route exact path="/user/:username/reviews" element={<DisplayPage page='reviews'/>} />
                        <Route exact path='/user/:username/account' element={<DisplayPage page='account'/>} />
                        <Route exact path='/user/:username/items' element={<DisplayPage page='myitems'/>} />
                        <Route exact path='/user/:username/auctions' element={<DisplayPage page='auctions'/>} />
                        <Route exact path='/user/:username/settings' element={<UserSettingsPage/>} />
                        <Route exact path='/item/create' element={<CreateItemPage/>} />
                        <Route path='/test/woop/:daddy' element={<TestPage/>} />
                        {/*<Route exact path='/item' element={<ItemPage inItem={null}/>}/>*/}
                        <Route exact path='/item/:item_id' element={<ItemPage />} />
                        <Route path='*' element={ <NotFoundPage/> } />
                    </Routes>
                </Container>
            </GlobalProvider>
        </>
    )
}

export default App
