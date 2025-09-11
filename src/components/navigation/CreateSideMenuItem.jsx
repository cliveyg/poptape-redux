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
import InventoryIcon from '@mui/icons-material/Inventory'
import GavelIcon from '@mui/icons-material/Gavel'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import { selectTheme } from '../../assets/scripts/theme.js'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { styled } from '@mui/material/styles'
import {useTranslation} from 'react-i18next'

export default function CreateSideMenuItem({menuItem, username, selected}) {

    const { t } = useTranslation()

    const navigate = useNavigate()
    const menuIcon = {
        dashboard: DashboardIcon,
        notifications: NotificationsIcon,
        profile: FaceIcon,
        account: AccountCircle,
        messages: MailIcon,
        myitems: InventoryIcon,
        auctions: GavelIcon,
        watchlist: VisibilityIcon,
        favourites: FavoriteBorderIcon,
        viewed: PageviewIcon,
        purchased: PaymentsIcon,
        reviews: RateReviewIcon,
        settings: SettingsIcon,
    }
    const menuText = {
        dashboard: t('sm_dashboard'),
        notifications: t('sm_notifications'),
        profile: t('sm_profile'),
        account: t('sm_account'),
        messages: t('sm_messages'),
        myitems: t('sm_items'),
        auctions: t('sm_auctions'),
        watchlist: t('sm_watchlist'),
        favourites: t('sm_favourites'),
        viewed: t('sm_viewed'),
        purchased: t('sm_purchased'),
        reviews: t('sm_reviews'),
        settings: t('sm_settings')
    }
    const menuLink = {
        dashboard: '/user/dashboard',
        notifications: '/user/'+username+'/notifications',
        profile: '/user/'+username,
        account: '/user/'+username+'/account',
        messages: '/user/'+username+'/messages',
        myitems: '/user/'+username+'/items',
        auctions: '/user/'+username+'/auctions',
        watchlist: '/user/'+username+'/watchlist',
        favourites: '/user/'+username+'/favourites',
        viewed: '/user/'+username+'/viewed',
        purchased: '/user/'+username+'/purchased',
        reviews: '/user/'+username+'/reviews',
        settings: '/user/'+username+'/settings',
    }
    const theme = selectTheme()

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

    const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.secondary.light,
            color: 'white',
            boxShadow: theme.shadows[1],
            fontSize: '0.7em',
        },
    }));

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
                <CustomTooltip
                    title={texty()}
                >
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
                </CustomTooltip>
            </ThemeProvider>
        </>
    )
}