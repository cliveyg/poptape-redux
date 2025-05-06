import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { setupTheme } from '../../assets/scripts/theme'
import { ThemeProvider } from '@mui/material/styles'

function AccountPageController({username}) {
    const theme = setupTheme()

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ml: 1}}>
                    <Typography sx={{ mb: '2', fontSize: '1.2em'}}>
                        Account details for {username}
                    </Typography>
                    Accounty stuff
                </Box>
            </ThemeProvider>
        </>
    )
}

export default AccountPageController