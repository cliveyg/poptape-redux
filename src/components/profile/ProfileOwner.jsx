import React, { useEffect, useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Cookies from 'js-cookie'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AvatarGrid from '../helpers/AvatarGrid'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
//import MetaViewer from '../reviews/MetaViewer'
import { useNavigate } from 'react-router'
import request from 'superagent'
import {selectTheme} from '../../assets/scripts/theme'
import {getIcon} from '../../assets/scripts/profile_helpers.jsx'
import {ThemeProvider} from '@mui/material/styles'
import {useGlobalSettings} from '../helpers/GlobalSettings'
import Avatar from '@mui/material/Avatar'

const initialPeckish = {
    variant: "success",
    message: "Profile updated",
}

function ProfileOwner() {
    const [showSnack, setShowSnack] = useState(false)
    const [duration] = useState(1500)
    const [peckish, setPeckish] = useState(initialPeckish)
    const [date, setDate] = useState(new Date().getTime())
    const [openUpload, setOpenUpload] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [avatarObj, setAvatarObj] = useState(null)
    const [avatarName, setAvatarName] = useState(null)
    const [username] = useState(Cookies.get("username"))
    const [aboutMe, setAboutMe] = useState("")
    const { profileIcon, setProfileIcon, profileImageString, setProfileImageString } = useGlobalSettings()

    const navigate = useNavigate()

    const handleOpen = () => setOpenUpload(true)

    const openSnack = useCallback(() => {
        setShowSnack(false)
        setTimeout(() => setShowSnack(true), 0);
        setDate(new Date().getTime())
    }, [])

    const handleClose = () => {
        setOpenUpload(false)
        setOpenDialog(false)
    };

    const selectTile = (tile) => {
        handleClose()

        const req = request
        req.post("/profile/avatar")
            .send(JSON.stringify({ standard_avatar: tile.name }))
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                //console.log(res.message)
                //setAvatarName(tile.name)
                //setAvatarObj(tile.img)
                setProfileIcon(getIcon(tile.name))

                localStorage.setItem('avatar',tile.name)
                setProfileImageString(tile.img)
            })
            .catch((err) => {
                console.log(err)
            });

    };

    const submitAboutMe = () => {
        const req = request
        req.post("/profile")
            .send(JSON.stringify({ about_me: aboutMe }))
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                console.log(res)
                setPeckish({ variant: "success", message: "Profile updated" })
                openSnack()
            })
            .catch((err) => {
                console.log(err)
                setPeckish({ variant: "error", message: "Computer says no" })
                openSnack()
            })
    }

    const handleStandard = () => setOpenDialog(true)

    const updateAvatar = (file) => {
        setAvatarObj(file)
        setOpenUpload(false)
    }

    const handleSave = (files) => {
        const reader = new FileReader()
        let formData = {}

        reader.onload = (event) => {
            formData["bespoke_avatar"] = event.target.result
            const req = request
            req.post("/profile/avatar")
                .send(JSON.stringify(formData))
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .set("x-access-token", Cookies.get("access-token"))
                .then((res) => {
                    updateAvatar(formData["bespoke_avatar"]);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        reader.readAsDataURL(files[0])
    }

    const handleAboutMeChange = (e) => setAboutMe(e.target.value)

    useEffect(() => {
        document.title = `poptape auctions | ${Cookies.get("username")} | profile`
    }, [])

    const theme = selectTheme()

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{maxWidth: 'lg'}}>
                <Grid container spacing={0}>
                    <Grid sx={{backgroundColor: '#49898f'}} size={{ xs: 12, md: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '120px'
                            }}
                        >
                            <Avatar
                                alt='my avatar'
                                src={profileImageString}
                                sx='large'
                            />
                        </Box>
                    </Grid>
                    <Grid sx={{backgroundColor: '#939f22'}} size={{ xs: 12, md: 9 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '120px'
                            }}
                        >
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="small"
                                onClick={handleStandard}
                            >
                                Select from existing
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{maxWidth: 'lg'}}>
                <Grid container spacing={0}>
                    <Grid sx={{backgroundColor: '#583f5d'}} size={{ xs: 12, md: 6 }}>
                        <h2>Column 3</h2>
                        <p>Content of column 3.</p>
                    </Grid>
                    <Grid sx={{backgroundColor: '#9f224e', p: 1}} size={{ xs: 12, md: 6 }}>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{flexGrow: 1, backgroundColor: '#6b498f'}}>
                                <h2>Column 4a</h2>
                                <p>Content of column 4a.</p>
                            </Box>
                            <Box sx={{width: 1, backgroundColor: '#d2d52b'}}>
                                <h2>Column 4b</h2>
                                <p>Content of column 4b.</p>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{maxWidth: 'lg'}}>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{width: 1, backgroundColor: '#608f49'}}>
                        <h2>Column 5</h2>
                        <p>Content of column 5.</p>
                    </Box>
                    <Box sx={{flexGrow: 1, backgroundColor: '#9f5a22'}}>
                        <h2>Column 6</h2>
                        <p>Content of column 6.</p>
                    </Box>
                    <Box sx={{flexShrink: 1, backgroundColor: '#295def'}}>
                        <h2>Column 7</h2>
                        <p>Content of column 7.</p>
                    </Box>
                </Box>
            </Container>


                <Box>
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={openDialog}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Select avatar
                        </DialogTitle>
                        <DialogContent dividers>
                            <AvatarGrid selectTile={selectTile} />
                        </DialogContent>
                    </Dialog>
                </Box>
                {showSnack ? (
                    <CustomizedSnackbars
                        duration={duration}
                        key_date={date}
                        variant={peckish.variant}
                        message={peckish.message}
                    />
                ) : null}
        </ThemeProvider>
    );
}

export default ProfileOwner