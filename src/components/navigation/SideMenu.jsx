import * as React from 'react'
import Cookies from 'js-cookie'
import { setupTheme } from '../../assets/scripts/theme'
import { ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CreateSideMenuItem from '../helpers/CreateSideMenuItem'

export default function SideMenu({selected}) {

    const [username, setUsername] = React.useState(Cookies.get('username') || null)

    document.title = 'POPTAPE | ' + selected
    const theme = setupTheme()
    const navigate = useNavigate()

    return(
        <Box sx={{width: { xs: '40px', sm: '40px', md: '170px', lg: '170px', xl: '170px'}}}>
            <ThemeProvider theme={theme}>
                <Stack direction='column' spacing={0}>
                    {selected === 'dashboard' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'dashboard'} username={username} selected={false} />
                    }
                    {selected === 'notifications' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'notifications'} username={username} selected={false} />
                    }
                    {selected === 'profile' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'profile'} username={username} selected={false} />
                    }
                    {selected === 'account' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'account'} username={username} selected={false} />
                    }
                    {selected === 'myitems' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'myitems'} username={username} selected={false} />
                    }
                    {selected === 'auctions' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'auctions'} username={username} selected={false} />
                    }
                    {selected === 'messages' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'messages'} username={username} selected={false} />
                    }
                    {selected === 'watchlist' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'watchlist'} username={username} selected={false} />
                    }
                    {selected === 'favourites' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'favourites'} username={username} selected={false} />
                    }
                    {selected === 'viewed' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'viewed'} username={username} selected={false} />
                    }
                    {selected === 'purchased' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'purchased'} username={username} selected={false} />
                    }
                    {selected === 'reviews' ?
                        <CreateSideMenuItem menuItem={selected} username={username} selected={true} />
                        :
                        <CreateSideMenuItem menuItem={'reviews'} username={username} selected={false} />
                    }
                </Stack>
            </ThemeProvider>
        </Box>
    )

}
