import { useState } from 'react'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import CloseIcon from '@mui/icons-material/Close'
//import { amber, green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import { setupTheme } from '../../assets/scripts/theme.js'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContentWrapper(props) {
    const { className, message, onClose, variant, key_date, duration, ...other } = props;
    const Icon = variantIcon[variant];
    const theme = setupTheme()

    return (

        <SnackbarContent
            sx={{ color: variant }}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar">
                    <Icon sx={{ fontSize: 20, opacity: 0.9, marginRight: theme.spacing(1), }} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon sx={{ fontSize: 20 }} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    key_date: PropTypes.number,
    duration: PropTypes.number,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

export default function CustomizedSnackbars(props) {
    const {message, variant, key_date, duration} = props;
    const [open, setOpen] = useState(true);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <>
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
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={variant}
                    key_date={key_date}
                    message={message}
                />
            </Snackbar>
        </>
    );
}