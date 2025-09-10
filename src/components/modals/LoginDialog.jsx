import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import Cookies from 'js-cookie'
import CustomSnackbar from '../information/CustomSnackbar'
import superagent from 'superagent'
import {useTranslation} from 'react-i18next'
import {getErrorMessage, getFieldFromToken} from '../../assets/scripts/general'
import {useNavigate} from 'react-router'
import { useGlobalSettings } from '../helpers/GlobalSettings'

export default function LoginDialog({ isDialogOpened, handleCloseDialog }) {

    const { t } = useTranslation()
    const { setIsLoggedIn } = useGlobalSettings()
    const navigate = useNavigate()
    const [showLoader, setshowLoader] = React.useState(false)
    const [showSnack, setshowSnack] = React.useState(false)
    const [variant, setVariant] = React.useState('error')
    const [message, setMessage] = React.useState(t('modals:ld_error_message_default'))
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

    const handleSubmit = (data) => {

        setshowLoader(true)
        const utf8Bytes = new TextEncoder().encode(data['password'])
        const base64Encoded = btoa(String.fromCharCode(...utf8Bytes))
        data['password'] = base64Encoded
        //console.log(data)

        superagent.post('/api/login')
        .send(JSON.stringify(data))
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .then(res => {
            setshowLoader(false)
            Cookies.set('access-token', res.body.token)
            Cookies.set('username', getFieldFromToken(res.body.token, 'username'), { secure: true })
            Cookies.set('public_id', getFieldFromToken(res.body.token, 'public_id'), { secure: true })
            handleClose()
            setIsLoggedIn(true)
            navigate('/', {replace: true})
        })
        .catch(error => {

            setshowLoader(false)
            setVariant('error')

            const mess = getErrorMessage(error.response.body, error.status, 'login')
            if (mess.translate) {
                setMessage(t(mess.message))
            } else {
                setMessage(mess.message)
            }

            setshowSnack(true)
            setTimeout(function () {
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
                <DialogTitle>{t('modals:ld_title')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        label={t('modals:ld_username')}
                        name='username'
                        type='text'
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        required
                        margin='dense'
                        label={t('modals:ld_password')}
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
                    <Button variant='outlined' sx={{textTransform: 'none'}} onClick={handleClose}>{t('modals:ld_cancel')}</Button>
                    <Button variant='outlined' sx={{textTransform: 'none'}} type='submit'>{t('modals:ld_login')}</Button>
                </DialogActions>
            </Dialog>
            </form>
            {showSnack ?
                <CustomSnackbar
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
