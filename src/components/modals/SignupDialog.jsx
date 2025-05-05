import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'

export default function SignupDialog({ isDialogOpened, handleCloseDialog }) {

    const [showLoader, setshowLoader] = React.useState(false)
    //setshowLoader(false)
    //console.log('At start and showLoader is ['+showLoader+']')

    React.useEffect(() => {
        handleClickOpen();
    }, []);

    const handleClickOpen = () => {
        // nowt
    };

    const handleClose = () => {
        handleCloseDialog(false);
    };

    const handleSubmit = (data) =>{
        console.log(data)
        setshowLoader(true)

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
                <DialogTitle>Signup</DialogTitle>
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
                        label='Email'
                        name='email'
                        type='email'
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
                    <TextField
                        required
                        margin='dense'
                        label='Confirm password'
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
                    <Button variant='outlined'  sx={{textTransform: 'none',}} onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' sx={{textTransform: 'none',}} type='submit'>Signup</Button>
                </DialogActions>
            </Dialog>
            </form>
        </React.Fragment>

    );
}
