import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export default function CustomSnackbar(props) {
    const {message, variant, key_date, duration, nohide} = props
    const [open, setOpen] = useState(true)

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <>
            {!nohide ?
                <Snackbar
                    key={key_date}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={duration}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={variant}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            :
                <Snackbar
                    key={key_date}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={variant}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            }
        </>
    )
}