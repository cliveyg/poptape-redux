import * as React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Cookies from 'js-cookie'
import { setupTheme } from '../../assets/scripts/theme'
import { ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import FaceIcon from '@mui/icons-material/Face'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PageviewIcon from '@mui/icons-material/Pageview'
import PaymentsIcon from '@mui/icons-material/Payments'
import RateReviewIcon from '@mui/icons-material/RateReview'

export default function SideMenu({selected}) {

    const [username, setUsername] = React.useState(Cookies.get('username') || null)

    document.title = 'POPTAPE | ' + selected
    const theme = setupTheme()
    const navigate = useNavigate()

    return(
        <Box sx={{width: { xs: '40px', sm: '40px', md: '170px', lg: '170px', xl: '170px'}}}>
            <ThemeProvider theme={theme}>
                <Stack direction='column' spacing={0}>
                    {selected === 'profile' ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        mb: 1,
                                        height: theme.spacing(4),
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    onClick={() => navigate('/user/'+username)}
                                    startIcon={<FaceIcon />}
                                >
                                    <Box>profile</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to profile'
                                onClick={() => navigate('/user/'+username)}
                                size='small'
                            >
                                <FaceIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        mb: 1,
                                        height: theme.spacing(4),
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    onClick={() => navigate('/user/'+username)}
                                    startIcon={<FaceIcon />}
                                >
                                    <Box>profile</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to profile'
                                onClick={() => navigate('/user/'+username)}
                                size='small'
                            >
                                <FaceIcon />
                            </IconButton>
                        </>
                    }
                    {selected === 'account' ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        mb: 1,
                                        height: theme.spacing(4),
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/account')}
                                    startIcon={<AccountCircle />}
                                >
                                    <Box>account</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                variant='contained'
                                color='primary'
                                aria-label='go to account'
                                onClick={() => navigate('/user/'+username+'/account')}
                                size='small'
                            >
                                <AccountCircle />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        mb: 1,
                                        height: theme.spacing(4),
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/account')}
                                    startIcon={<AccountCircle />}
                                >
                                    <Box>account</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to account'
                                size='small'
                                onClick={() => navigate('/user/'+username+'/account')}
                            >
                                <AccountCircle />
                            </IconButton>
                        </>
                    }
                    {selected === 'messages' ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/messages')}
                                    startIcon={<MailIcon />}
                                >
                                    <Box>messages</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to messages'
                                size='small'
                                href={'/user/'+username+'/messages'}
                            >
                                <MailIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/messages')}
                                    startIcon={<MailIcon />}
                                >
                                    <Box>messages</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to messages'
                                href={'/user/'+username+'/messages'}
                                size='small'
                            >
                                <MailIcon />
                            </IconButton>
                        </>
                    }
                    {selected === 'watchlist' ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/watchlist')}
                                    startIcon={<VisibilityIcon />}
                                >
                                    <Box>watchlist</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to watchlist'
                                href={'/user/'+username+'/watchlist'}
                                size='small'
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/watchlist')}
                                    startIcon={<VisibilityIcon />}
                                >
                                    <Box>watchlist</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to watchlist'
                                href={'/user/'+username+'/watchlist'}
                                size='small'
                            >
                                <VisibilityIcon />
                            </IconButton>
                        </>
                    }
                    {selected === 'favourites' ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/favourites')}
                                    startIcon={<FavoriteBorderIcon />}
                                >
                                    <Box>favourites</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to favourites'
                                href={'/user/'+username+'/favourites'}
                                size='small'
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/favourites')}
                                    startIcon={<FavoriteBorderIcon />}
                                >
                                    <Box>favourites</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to favourites'
                                href={'/user/'+username+'/favourites'}
                                size='small'
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </>
                    }
                    {selected === "viewed" ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/viewed')}
                                    startIcon={<PageviewIcon />}
                                >
                                    <Box>recently viewed</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to recently viewed'
                                href={'/user/'+username+'/viewed'}
                                size='small'
                            >
                                <PageviewIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/viewed')}
                                    startIcon={<PageviewIcon />}
                                >
                                    <Box>recently viewed</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to recently viewed'
                                href={'/user/'+username+'/viewed'}
                                size='small'
                            >
                                <PageviewIcon />
                            </IconButton>
                        </>
                    }
                    {selected === "purchased" ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/purchased')}
                                    startIcon={<PaymentsIcon />}
                                >
                                    <Box>purchase history</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to purchase history'
                                href={'/user/'+username+'/purchased'}
                                size='small'
                            >
                                <PaymentsIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/purchased')}
                                    startIcon={<PaymentsIcon />}
                                >
                                    <Box>purchase history</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to purchase history'
                                href={'/user/'+username+'/purchased'}
                                size='small'
                            >
                                <PaymentsIcon />
                            </IconButton>
                        </>
                    }
                    {selected === 'reviews' ?
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='contained'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/reviews')}
                                    startIcon={<RateReviewIcon />}
                                >
                                    <Box>reviews</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    color: 'secondary.main',
                                    border: 1,
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to reviews'
                                href={'/user/'+username+'/reviews'}
                                size='small'
                            >
                                <RateReviewIcon />
                            </IconButton>
                        </>
                        :
                        <>
                            <Box sx={{ width: 170, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }, }}>
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        marginRight: '15px',
                                        width: 170,
                                        height: theme.spacing(4),
                                        mb: 1,
                                        //display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                                    }}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    onClick={() => navigate('/user/'+username+'/reviews')}
                                    startIcon={<RateReviewIcon />}
                                >
                                    <Box>reviews</Box>
                                </Button>
                            </Box>
                            <IconButton
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 1,
                                    height: '40px',
                                    width: '40px',
                                    display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none', },
                                }}
                                color='primary'
                                aria-label='go to reviews'
                                href={'/user/'+username+'/reviews'}
                                size='small'
                            >
                                <RateReviewIcon />
                            </IconButton>
                        </>
                    }
                </Stack>
            </ThemeProvider>
        </Box>
    )

}
