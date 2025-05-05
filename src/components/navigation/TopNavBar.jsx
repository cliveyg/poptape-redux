import * as React from 'react'
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
import FaceIcon from '@mui/icons-material/Face'
import TodayIcon from '@mui/icons-material/Today'
import Launch from '@mui/icons-material/Launch'
import Input from '@mui/icons-material/Input'
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew'
import SearchBox from '../../helpers/SearchBox'
import {ThemeProvider} from '@mui/material/styles'
import { setupTheme } from '../../assets/scripts/theme'
import Cookies from 'js-cookie'

import LoginDialog from '../modals/LoginDialog'
import SignupDialog from '../modals/SignupDialog'

import Link from '@mui/material/Link'
import '../../css/poptape.css'
import request from 'superagent'

export default function TopNavBar() {
    const theme = setupTheme()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const [loggedIn, setLoggedIn] = React.useState(!!Cookies.get('access-token'))
    const [notifs, setNotifs] = React.useState(0)
    const [mails, setMails] = React.useState(0)
    const [messagesSet, setMessages] = React.useState(false)

    const [isLoginOpen, setIsLoginOpen] = React.useState(false)
    const handleLoginOpen = () => {
        setIsLoginOpen(!isLoginOpen)
    }

    const [isSignupOpen, setIsSignupOpen] = React.useState(false)
    const handleSignupOpen = () => {
        setIsSignupOpen(!isSignupOpen)
    }

    /*
    if (loggedIn) {
        console.log('Should be getting message data here')
        //getMessageData()
        setNotifs(3)
        setMails(4)
    } else {
        // set notifications and messages to zero
        if (!messagesSet) {
            setNotifs(0)
            setMails(0)
            setMessages(true)
        }
    }

     */

    function getMessageData() {

        const req = request
        req.get('/messages/info')
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

    const menuId = 'primary-search-menu'
    const renderMenu = (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <Link color='inherit' href={'/user/'+Cookies.get('username')}>
                    <MenuItem sx={{color: 'inherit'}} onClick={handleMenuClose}>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            sx={{color: 'inherit'}}
                        >
                            <FaceIcon />
                        </IconButton>
                        <Box>Profile</Box>
                    </MenuItem>
                </Link>
                <Link color='inherit' href={'/user/'+Cookies.get('username')+'/account'}>                    <MenuItem sx={{color: 'inherit'}} onClick={handleMenuClose}>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            sx={{color: 'inherit'}}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Box>Account</Box>
                    </MenuItem>
                </Link>
                <MenuItem sx={{color: 'inherit'}} onClick={() => alert('Logout')}>
                    <IconButton
                        aria-label='account of current user'
                        aria-controls='primary-search-account-menu'
                        aria-haspopup='true'
                        sx={{color: 'inherit'}}
                    >
                        <PowerSettingsNew />
                    </IconButton>
                    <Box>Logout</Box>
                </MenuItem>
            </Menu>
        </>
    );

    const mobileMenuId = 'primary-search-menu-mobile'
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
                <Box>
                    <MenuItem onClick={() => handleSignupOpen()}>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <Launch />
                        </IconButton>
                        <Box>Signup</Box>
                    </MenuItem>
                    <MenuItem onClick={() => handleLoginOpen()}>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <Input />
                        </IconButton>
                        <Box>Login</Box>
                    </MenuItem>
                </Box>
                :
                <span>
                  <MenuItem>
                    <IconButton aria-label='show 4 new mails' color='inherit'>
                      <Badge
                          badgeContent={getMails()}
                          sx={{
                              '& .MuiBadge-badge':
                                  (theme) => ({
                                      ...theme.palette.noom,
                                  })
                          }}
                      >
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <Box>Messages</Box>
                  </MenuItem>
                  <MenuItem>
                    <IconButton aria-label='show 11 new notifications' color='inherit'>
                      <Badge
                          badgeContent={getNotifs()}
                          sx={{
                                  '& .MuiBadge-badge':
                                      (theme) => ({
                                          ...theme.palette.noom,
                                      })
                              }}
                      >
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <Box>Notifications</Box>
                  </MenuItem>
                  <Link color='inherit' href={'/user/'+Cookies.get('username')}>
                    <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                          <FaceIcon />
                        </IconButton>
                        <Box>Profile</Box>
                    </MenuItem>
                  </Link>
                  <Link color='inherit' href={'/user/'+Cookies.get('username')+'/account'}>
                      <MenuItem onClick={handleProfileMenuOpen}>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                          <AccountCircle />
                        </IconButton>
                        <Box>Account</Box>
                      </MenuItem>
                  </Link>
                  <MenuItem onClick={() => alert('Logout')}>
                    <IconButton
                        aria-label='account of current user'
                        aria-controls='primary-search-account-menu'
                        aria-haspopup='true'
                        color='inherit'
                    >
                      <PowerSettingsNew />
                    </IconButton>
                    <Box>Logout</Box>
                  </MenuItem>
                </span>
            }
        </Menu>
    );

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        sx={{ mr: 2 }}
                    >
                        <Link sx={{color: 'white'}} href='/'><HiveIcon /></Link>
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link sx={{color: 'white'}} href='/'>poptape</Link>
                    </Typography>
                    <SearchBox />
                    <Box sx={{ flexGrow: 1 }} />
                    {!loggedIn ?
                        <>
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    handleLoginOpen()
                                }}
                                sx={{mr: 1,
                                    display: { xs: 'none', sm: 'block' },
                                    borderColor: 'white',
                                    textTransform: 'none',
                                    alignSelf: 'center',
                                    color: 'white'}}>
                                Login
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    handleSignupOpen()
                                }}
                                sx={{mr: 1,
                                    display: { xs: 'none', sm: 'block' },
                                    borderColor: 'white',
                                    textTransform: 'none',
                                    alignSelf: 'center',
                                    color: 'white'}}>                                Signup
                            </Button>
                            <LoginDialog isDialogOpened={isLoginOpen}
                                         handleCloseDialog={() => setIsLoginOpen(false)}
                            />
                            <SignupDialog isDialogOpened={isSignupOpen}
                                         handleCloseDialog={() => setIsSignupOpen(false)}
                            />
                        </>
                    :
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
                                <Badge badgeContent={4} color='success'>
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                size='large'
                                aria-label='show 37 new notifications'
                                color='inherit'
                            >
                                <Badge badgeContent={37}
                                       sx={{'& .MuiBadge-badge': {color: 'black', backgroundColor: 'meep'}}}>
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                size='large'
                                aria-label='show 3 new calendar events'
                                color='inherit'
                            >
                                { /* the only way i found to get theme objects in the css */}
                                <Badge badgeContent={3} sx={{
                                    '& .MuiBadge-badge':
                                        (theme) => ({
                                            ...theme.palette.noom,
                                        })
                                }}>
                                    <TodayIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                size='large'
                                edge='end'
                                aria-label='account of current user'
                                aria-controls={menuId}
                                aria-haspopup='true'
                                onClick={handleProfileMenuOpen}
                                color='inherit'
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Box>
                    }

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size='large'
                        aria-label='show more'
                        aria-controls={mobileMenuId}
                        aria-haspopup='true'
                        onClick={handleMobileMenuOpen}
                        color='inherit'
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
