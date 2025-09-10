import React, { useEffect, useState, useCallback } from 'react'
//import { styled } from '@mui/material/styles'
import Cookies from 'js-cookie'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AvatarGrid from '../helpers/AvatarGrid'
import CustomSnackbar from '../information/CustomSnackbar'
import Dialog from '@mui/material/Dialog'
//import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router'
import superagent from 'superagent'
import {selectTheme} from '../../assets/scripts/theme'
import {getIcon} from './ProfileIcon.jsx'
import {ThemeProvider} from '@mui/material/styles'
import {useGlobalSettings} from '../helpers/GlobalSettings'
import Avatar from '@mui/material/Avatar'
import MetaViewer from '../reviews/MetaViewer'
import MaxTextField from '../helpers/MaxTextField'
import {useTranslation} from 'react-i18next'

const initialPeckish = {
    variant: "success",
    message: "Profile updated",
}

function ProfileOwner() {

    const { t } = useTranslation()
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

        superagent.post("/profile/avatar")
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
        superagent.post("/profile")
            .send(JSON.stringify({ about_me: aboutMe }))
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                console.log(res)
                setPeckish({ variant: "success", message: t('profile:pr_profile_updated') })
                openSnack()
            })
            .catch((err) => {
                console.log(err)
                setPeckish({ variant: "error", message: t('profile:pr_profile_update_fail') })
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
            superagent.post("/profile/avatar")
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
        document.title = 'POPTAPE | ' + username + ' | '+ t('profile:pr_title')
    }, [])

    const theme = selectTheme()

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{maxWidth: 'lg'}}>
                <Grid container spacing={0}>
                    <Grid size={{ xs: 6, md: 1 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '120px'
                            }}
                        >
                            <Avatar
                                alt={username}
                                src={profileImageString}
                                sx='xl'
                            />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
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
                                sx={{textTransform: 'none'}}
                            >
                                {t('profile:pr_choose_avatar')}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box>
                            <MetaViewer/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{maxWidth: 'lg'}}>
                <Grid container spacing={0}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <MaxTextField
                            multiline
                            rows={5}
                            margin="dense"
                            label={t('profile:pr_about_you_label')}
                            name="about_me"
                            type="text"
                            inputProps={{
                                maxLength: 500,
                            }}
                            characterLimit={500}
                            helperText={t('profile:pr_no_of_chars')}
                            fullWidth
                            value={aboutMe}
                            onChange={handleAboutMeChange}
                        />

                    </Grid>
                    <Grid sx={{pt: 1}} size={{ xs: 12, md: 12 }}>
                        <Box sx={{display: 'flex'}}>
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="small"
                                sx={{textTransform: 'none'}}
                                onClick={submitAboutMe}
                            >
                                {t('profile:pr_update_button')}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Box>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={openDialog}
                >
                    <DialogContent onClose={handleClose} sx={{ p:0, m:0}}>
                        <AvatarGrid selectTile={selectTile} />
                    </DialogContent>
                </Dialog>
            </Box>
            {showSnack ? (
                <CustomSnackbar
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