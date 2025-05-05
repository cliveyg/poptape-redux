import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import request from 'superagent'
import CircularProgress from '@mui/material/CircularProgress'
import Cookies from 'js-cookie'
import CustomizedSnackbars from '../information/CustomSnackbars'

export default function LoginDialog({ isDialogOpened, handleCloseDialog }) {

    const [showLoader, setshowLoader] = React.useState(false)
    const [showSnack, setshowSnack] = React.useState(false)
    const [variant, setVariant] = React.useState('error')
    const [message, setMessage] = React.useState('Something went bang!')
    const duration = 2000
    const date = new Date().getTime()

    React.useEffect(() => {
        handleClickOpen();
    }, [])

    const handleClickOpen = () => {
        // nowt
        setshowLoader(false)
    }

    const handleClose = () => {
        handleCloseDialog(false);
    }

    function getFieldFromToken(token, field) {
        const tokenArray = token.split(".")
        const base64decoded = JSON.parse(atob(tokenArray[1]))
        return base64decoded[field]
    }

    const handleSubmit = (data) =>{

        setshowLoader(true)
        const req = request
        req.post('/authy/login')
        .send(JSON.stringify(data))
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .then(res => {
            setshowLoader(false)
            console.log(res.body)
            Cookies.set('access-token', res.body.token)
            Cookies.set('username', getFieldFromToken(res.body.token, 'username'))
            Cookies.set('public_id', getFieldFromToken(res.body.token, 'public_id'))
            //setshowSnack(true)
            handleClose()
            window.location.reload()
        })
        .catch(error => {
            setshowLoader(false)
            setVariant(data.username)
            if (error.response.body['message'] !== null) {
                setMessage(error.response.body['message'])
            } else {
                setMessage('Something went pop!')
            }
            setshowSnack(true)
            setTimeout(function() {
                handleClose()
                setshowSnack(false)
            }, duration)

        })
    }

    return (
        <React.Fragment>
            <form>
            <Dialog
                open={isDialogOpened}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault()
                            const formData = new FormData(event.currentTarget)
                            const formJson = Object.fromEntries(formData.entries())
                            handleSubmit(formJson)
                        },
                    },
                }}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        label='Username'
                        name='username'
                        type='text'
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        required
                        margin='dense'
                        label='Password'
                        name='password'
                        type='password'
                        sx={{ mr: 1 }}
                    />
                    {showLoader ?
                        <div className="poptape-loader">
                            <CircularProgress />
                        </div>
                        : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined'  sx={{textTransform: 'none',}} onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' sx={{textTransform: 'none',}} type='submit'>Login</Button>
                </DialogActions>
            </Dialog>
            </form>
            {showSnack ?
                <CustomizedSnackbars
                    duration={duration}
                    key_date={date}
                    variant={variant}
                    message={message}
                />
                : null
            }
        </React.Fragment>

    );
}
