import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useTranslation} from 'react-i18next'

export default function AccountPageLoginForm({ onSubmit }) {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { t } = useTranslation()

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = {
            "username": username,
            "password": password
        }
        onSubmit(data)
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'password') {
            setPassword(value)
        }
        if (name === 'username') {
            setUsername(value)
        }

    }

    return (
        <Box>
            <form>
                <Typography sx={{fontSize: '1em', margin: 3}}>
                    {t('account:ap_login_title')}
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label={t('account:ap_username')}
                    name="username"
                    type="text"
                    value={username}
                    onChange = {(event) => handleChange(event)}
                />
                <br />
                <TextField
                    margin="dense"
                    label={t('account:ap_password')}
                    name="password"
                    type="password"
                    value={password}
                    onChange = {(event) => handleChange(event)}
                />
                <br /><br />
                <Button type="submit" sx={{textTransform: 'none'}} variant="outlined"  onClick={(event) => handleSubmit(event)} color="primary">
                    {t('account:ap_login')}
                </Button>
            </form>
        </Box>
    )
}
