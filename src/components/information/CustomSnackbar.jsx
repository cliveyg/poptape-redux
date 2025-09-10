import { useState } from 'react'
//import PropTypes from 'prop-types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import { selectTheme } from '../../assets/scripts/theme.js'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const variantTheme = {
    success: 'success.dark',
    warning: 'warning.main',
    error: 'error.dark',
    info: 'info.main',
}

export default function CustomSnackbar(props) {
    const {message, variant, key_date, duration, nohide} = props;
    const [open, setOpen] = useState(true);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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
    );
}