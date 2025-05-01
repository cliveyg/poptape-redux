import { Routes, Route } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import UserAccountPage from './pages/UserAccountPage'

function App() {

  return (
    <>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
            <Routes>
                <Route index element={ <HomePage/> } />
                <Route exact path='/user/:username/account' element={ <UserAccountPage/> } />
                <Route path='*' element={ <NotFoundPage/> } />
            </Routes>
        </Container>
    </>
  )
}

export default App
