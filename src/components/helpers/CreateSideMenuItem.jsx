import * as React from 'react'
import { useNavigate } from 'react-router'
import FaceIcon from '@mui/icons-material/Face'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PageviewIcon from '@mui/icons-material/Pageview'
import PaymentsIcon from "@mui/icons-material/Payments"
import RateReviewIcon from '@mui/icons-material/RateReview'
import { setupTheme } from '../../assets/scripts/theme.js'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

export default function CreateSideMenuItem({menuItem, username, selected}) {

    const navigate = useNavigate()
    const menuIcon = {
        profile: FaceIcon,
        account: AccountCircle,
        messages: MailIcon,
        watchlist: VisibilityIcon,
        favourites: FavoriteBorderIcon,
        viewed: PageviewIcon,
        purchased: PaymentsIcon,
        reviews: RateReviewIcon,
    }
    const menuText = {
        profile: 'profile',
        account: 'account',
        messages: 'messages',
        watchlist: 'watchlist',
        favourites: 'favourites',
        viewed: 'recently viewed',
        purchased: 'purchase history',
        reviews: 'reviews',
    }
    const menuLink = {
        profile: '/user/'+username,
        account: '/user/'+username+'/account',
        messages: '/user/'+username+'/messages',
        watchlist: '/user/'+username+'/watchlist',
        favourites: '/user/'+username+'/favourites',
        viewed: '/user/'+username+'/viewed',
        purchased: '/user/'+username+'/purchased',
        reviews: '/user/'+username+'/reviews',
    }
    const theme = setupTheme()

    function linky() {
        return menuLink[menuItem]
    }

    function texty() {
        return menuText[menuItem]
    }

    const MenuIcon = menuIcon[menuItem]
    let variant = 'outlined'
    let ariaLabel = 'go to '+texty()

    function borderSize() {
        if (selected) {
            return 1
        }
        return 0
    }

    function highlighted() {
        if (selected) {
            return 'secondary.main'
        }
        return 'primary.main'
    }

    if (selected) {
        variant = 'contained'
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                    <Button
                        sx={{
                            textTransform: 'none',
                            marginRight: '15px',
                            width: 170,
                            mb: 1,
                            height: theme.spacing(4),
                        }}
                        color='primary'
                        variant={variant}
                        size='small'
                        aria-label={ariaLabel}
                        onClick={() => navigate(linky())}
                        startIcon={<MenuIcon />}
                    >
                        <Box>{texty()}</Box>
                    </Button>
                </Box>
                <IconButton
                    sx={{
                        textTransform: 'none',
                        color: highlighted(),
                        border: borderSize(),
                        borderRadius: 1,
                        height: '40px',
                        width: '40px',
                        display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                    }}
                    variant={variant}
                    color='primary'
                    aria-label={ariaLabel}
                    onClick={() => navigate(linky())}
                    size='small'
                >
                    <MenuIcon />
                </IconButton>
            </ThemeProvider>
        </>
    )
}