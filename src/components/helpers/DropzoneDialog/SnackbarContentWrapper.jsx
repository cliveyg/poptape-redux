import React from 'react'
import IconButton from '@mui/material/IconButton'
import SnackbarContent from '@mui/material/SnackbarContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

function SnackbarContentWrapper({ className = '', message, onClose, variant = 'info', ...other }) {
  const Icon = variantIcon[variant] || InfoIcon
  return (
    <SnackbarContent
      className={className}
      aria-describedby="client-snackbar"
      message={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ fontSize: 20, opacity: 0.9, marginRight: 8 }} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ]}
      {...other}
    />
  )
}

export default SnackbarContentWrapper