import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import CustomSnackbar from '../information/CustomSnackbar'
import superagent from 'superagent'
import {useTranslation} from 'react-i18next'
import Cookies from 'js-cookie'
import {getFieldFromToken, getErrorMessage} from '../../assets/scripts/general'
import { useNavigate } from 'react-router'

export default function SignupDialog({ isDialogOpened, handleCloseDialog }) {

    const { t } = useTranslation()
    const [showLoader, setshowLoader] = React.useState(false)
    const [showSnack, setshowSnack] = React.useState(false)
    const [variant, setVariant] = React.useState('error')
    const [message, setMessage] = React.useState(t('modals:sd_error_message_default'))
    const [duration, setDuration] = React.useState(7000)
    const [nohide, setNoHide] = React.useState(false)
    const date = new Date().getTime()
    const navigate = useNavigate()

    React.useEffect(() => {
        handleClickOpen();
    }, []);

    const handleClickOpen = () => {
        // nowt
        setshowLoader(false)
    };

    const handleClose = () => {
        handleCloseDialog(false);
    };

    const handleSubmit = (data) => {

        setshowLoader(true)
        let utf8Bytes = new TextEncoder().encode(data['password'])
        let base64Encoded = btoa(String.fromCharCode(...utf8Bytes))
        data['password'] = base64Encoded
        utf8Bytes = new TextEncoder().encode(data['confirm_password'])
        base64Encoded = btoa(String.fromCharCode(...utf8Bytes))
        data['confirm_password'] = base64Encoded

        superagent.post('/api/signup')
            .send(JSON.stringify(data))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(res => {
                setshowLoader(false)
                Cookies.set('access-token', res.body.token)
                Cookies.set('username', getFieldFromToken(res.body.token, 'username'), { secure: true })
                Cookies.set('public_id', getFieldFromToken(res.body.token, 'public_id'), { secure: true })

                setMessage(t('modals:sd_success_validate'))
                setVariant('success')
                setshowSnack(true)
                setNoHide(true)
                setTimeout(function() {
                    handleClose()
                    setshowSnack(false)
                    setNoHide(false)
                    //window.location.reload()
                    navigate('/', {replace: true})
                }, 7000)
            })
            .catch(error => {
                setshowLoader(false)
                setVariant('error')
                setDuration(2000)

                const mess = getErrorMessage(error.response.body, error.response.status, 'signup')
                if (mess.translate) {
                    setMessage(t(mess.message))
                } else {
                    setMessage(mess.message)
                }

                setshowSnack(true)
                setTimeout(function() {
                    handleClose()
                    setshowSnack(false)
                    setDuration(7000)
                }, 2000)

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
                <DialogTitle>{t('modals:sd_title')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        label={t('modals:sd_username')}
                        name='username'
                        type='text'
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        required
                        margin='dense'
                        label={t('modals:sd_email')}
                        name='email'
                        type='email'
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        required
                        margin='dense'
                        label={t('modals:sd_password')}
                        name='password'
                        type='password'
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        required
                        margin='dense'
                        label={t('modals:sd_confirm_password')}
                        name='confirm_password'
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
                    <Button variant='outlined'  sx={{textTransform: 'none',}} onClick={handleClose}>{t('modals:sd_cancel')}</Button>
                    <Button variant='outlined' sx={{textTransform: 'none',}} type='submit'>{t('modals:sd_signup')}</Button>
                </DialogActions>
            </Dialog>
            </form>
            {showSnack ?
                <CustomSnackbar
                    duration={duration}
                    key_date={date}
                    variant={variant}
                    message={message}
                    nohide={nohide}
                />
                : null
            }
        </React.Fragment>

    );
}
