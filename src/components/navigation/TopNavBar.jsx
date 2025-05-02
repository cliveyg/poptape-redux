import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import HiveIcon from '@mui/icons-material/Hive'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import TodayIcon from '@mui/icons-material/Today'
import Launch from '@mui/icons-material/Launch'
import Input from '@mui/icons-material/Input'
import SearchBox from '../../helpers/SearchBox'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../../assets/scripts/theme'
import Cookies from 'js-cookie'
//import { Link } from 'react-router'
import Link from '@mui/material/Link'
import '../../css/poptape.css'

export default function TopNavBar() {
    const theme = setupTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const [loggedIn, setLoggedIn] = useState(!!Cookies.get('access-token'))
    const [username, setUsername] = useState(Cookies.get('username'))
    const [showLoginPopup, setLoginPopup] = useState(false)
    const [showSignupPopup, setSignupPopup] = useState(false)
    const [userLink, setUserLink] = useState('/user/')
    const [notifs, setNotifs] = useState(0)
    const [mails, setMails] = useState(0)
    const [messagesSet, setMessages] = useState(false)

    if (loggedIn) {
        getMessageData()
    } else {
        // set notifications and messages to zero
        if (!messagesSet) {
            setNotifs(0)
            setMails(0)
            setMessages(true)
        }
    }

    function getMessageData() {

        const request = require('superagent')
        request.get('/messages/info')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', Cookies.get('access-token'))
            .then(res => {
                const messageInfo = res.body
                setNotifs(messageInfo.unread_notifications)
                setMails(messageInfo.unread_mails)
            })
            .catch(err => {
                console.log(err)
                setNotifs(0)
                setMails(0)
            })
    }

    function getMails() {
        return mails
    }

    function getNotifs() {
        return notifs
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    function togglePopup(box) {
        if (box === "login") {
            setLoginPopup(!showLoginPopup)
            setSignupPopup(false)
        } else if (box === "signup") {
            setSignupPopup(!showSignupPopup)
            setLoginPopup(false)
        }
    }

    const menuId = 'primary-search-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link href={userLink}>Profile</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link href={userLink+'/account'}>My account</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link href="#">Noney</Link>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {!loggedIn ?
                <MenuItem onClick={() => togglePopup("signup")}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Launch />
                    </IconButton>
                    <p>Signup</p>
                </MenuItem>
                :
                <span>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge
              badgeContent={getMails()}
              classes={{ badge: classes.customBadgeGreen }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge
              badgeContent={getNotifs()}
              classes={{ badge: classes.customBadgeRed }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Link className={classes.mlinky} to={userLink}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
        >
          <FaceIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      </Link>
      <Link className={classes.mlinky} to={userLink+'/account'}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
      </Link>
      <MenuItem onClick={() => togglePopup("login")}>
        <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
        >
          <PowerSettingsNew />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      </span>
            }
            {!loggedIn ?
                <MenuItem onClick={() => togglePopup("login")}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Input />
                    </IconButton>
                    <p>Login</p>
                </MenuItem>
                : null
            }
        </Menu>
    );

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <HiveIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                    >
                        poptape
                    </Typography>
                    <SearchBox />
                    <Box sx={{ flexGrow: 1 }} />
                    {!loggedIn ?
                        <Button
                            variant='outlined'
                            onClick={() => togglePopup('signup')}
                            sx={{ textTransform: 'none', alignSelf: 'center', color: 'white' }}>
                            Signup
                        </Button>
                        :
                        <Box>logged in</Box>
                    }
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color='success'>
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 37 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={37} sx={{ '& .MuiBadge-badge': { color: 'black', backgroundColor: 'meep' } }}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 3 new calendar events"
                            color="inherit"
                        >
                            { /* the only way i found to get theme objects in the css */ }
                            <Badge badgeContent={3}  sx={{ '& .MuiBadge-badge':
                                (theme) => ({
                                    ...theme.palette.noom,
                                })}}>
                                <TodayIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
        </ThemeProvider>
    );
}
