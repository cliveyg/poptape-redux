import React, { useEffect, useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Cookies from 'js-cookie'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AvatarChooser from '../helpers/AvatarChooser'
import AvatarGrid from '../helpers/AvatarGrid'
//import { DropzoneDialog } from "material-ui-dropzone"
import CustomizedSnackbars from '../information/CustomSnackbars'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid'
import MaxTextField from '../helpers/MaxTextField'
//import MetaViewer from '../reviews/MetaViewer'
import { useNavigate } from 'react-router'
import request from 'superagent'
import {selectTheme} from '../../assets/scripts/theme'
import {ThemeProvider} from '@mui/material/styles'
import {useGlobalSettings} from '../helpers/GlobalSettings'
import {SvgIcon} from '@mui/material'
import avatar_01 from '../../assets/images/avatars/svg-avatars/avatar-1-svgrepo-com.svg?react'
import avatar_02 from '../../assets/images/avatars/svg-avatars/avatar-2-svgrepo-com.svg?react'
import avatar_03 from '../../assets/images/avatars/svg-avatars/avatar-3-svgrepo-com.svg?react'
import avatar_04 from '../../assets/images/avatars/svg-avatars/avatar-4-svgrepo-com.svg?react'
import avatar_05 from '../../assets/images/avatars/svg-avatars/avatar-5-svgrepo-com.svg?react'
import avatar_06 from '../../assets/images/avatars/svg-avatars/avatar-6-svgrepo-com.svg?react'
import avatar_07 from '../../assets/images/avatars/svg-avatars/avatar-7-svgrepo-com.svg?react'
import avatar_08 from '../../assets/images/avatars/svg-avatars/avatar-8-svgrepo-com.svg?react'
import avatar_09 from '../../assets/images/avatars/svg-avatars/avatar-9-svgrepo-com.svg?react'
import avatar_10 from '../../assets/images/avatars/svg-avatars/avatar-10-svgrepo-com.svg?react'
import avatar_11 from '../../assets/images/avatars/svg-avatars/avatar-11-svgrepo-com.svg?react'
import avatar_12 from '../../assets/images/avatars/svg-avatars/avatar-12-svgrepo-com.svg?react'
import avatar_13 from '../../assets/images/avatars/svg-avatars/avatar-13-svgrepo-com.svg?react'
import avatar_14 from '../../assets/images/avatars/svg-avatars/avatar-14-svgrepo-com.svg?react'
import avatar_15 from '../../assets/images/avatars/svg-avatars/avatar-15-svgrepo-com.svg?react'
import avatar_16 from '../../assets/images/avatars/svg-avatars/avatar-16-svgrepo-com.svg?react'
import avatar_17 from '../../assets/images/avatars/svg-avatars/avatar-17-svgrepo-com.svg?react'
import avatar_18 from '../../assets/images/avatars/svg-avatars/avatar-18-svgrepo-com.svg?react'
import avatar_19 from '../../assets/images/avatars/svg-avatars/avatar-19-svgrepo-com.svg?react'
import avatar_20 from '../../assets/images/avatars/svg-avatars/avatar-20-svgrepo-com.svg?react'
import avatar_21 from '../../assets/images/avatars/svg-avatars/avatar-21-svgrepo-com.svg?react'
import avatar_22 from '../../assets/images/avatars/svg-avatars/avatar-22-svgrepo-com.svg?react'
import Avatar from "@mui/material/Avatar";

const initialPeckish = {
    variant: "success",
    message: "Profile updated",
};

function getIcon(iconName) {

    if (iconName === 'avatar_01') {
        return <SvgIcon component={avatar_01} inheritViewBox/>
    }
    if (iconName === 'avatar_02') {
        return <SvgIcon component={avatar_02} inheritViewBox/>
    }
    if (iconName === 'avatar_03') {
        return <SvgIcon component={avatar_03} inheritViewBox/>
    }
    if (iconName === 'avatar_04') {
        return <SvgIcon component={avatar_04} inheritViewBox/>
    }
    if (iconName === 'avatar_05') {
        return <SvgIcon component={avatar_05} inheritViewBox/>
    }
    if (iconName === 'avatar_06') {
        return <SvgIcon component={avatar_06} inheritViewBox/>
    }
    if (iconName === 'avatar_07') {
        return <SvgIcon component={avatar_07} inheritViewBox/>
    }
    if (iconName === 'avatar_08') {
        return <SvgIcon component={avatar_08} inheritViewBox/>
    }
    if (iconName === 'avatar_09') {
        return <SvgIcon component={avatar_09} inheritViewBox/>
    }
    if (iconName === 'avatar_10') {
        return <SvgIcon component={avatar_10} inheritViewBox/>
    }
    if (iconName === 'avatar_11') {
        return <SvgIcon component={avatar_11} inheritViewBox/>
    }
    if (iconName === 'avatar_12') {
        return <SvgIcon component={avatar_12} inheritViewBox/>
    }
    if (iconName === 'avatar_13') {
        return <SvgIcon component={avatar_13} inheritViewBox/>
    }
    if (iconName === 'avatar_14') {
        return <SvgIcon component={avatar_14} inheritViewBox/>
    }
    if (iconName === 'avatar_15') {
        return <SvgIcon component={avatar_15} inheritViewBox/>
    }
    if (iconName === 'avatar_16') {
        return <SvgIcon component={avatar_16} inheritViewBox/>
    }
    if (iconName === 'avatar_17') {
        return <SvgIcon component={avatar_17} inheritViewBox/>
    }
    if (iconName === 'avatar_18') {
        return <SvgIcon component={avatar_18} inheritViewBox/>
    }
    if (iconName === 'avatar_19') {
        return <SvgIcon component={avatar_19} inheritViewBox/>
    }
    if (iconName === 'avatar_20') {
        return <SvgIcon component={avatar_20} inheritViewBox/>
    }
    if (iconName === 'avatar_21') {
        return <SvgIcon component={avatar_21} inheritViewBox/>
    }
    if (iconName === 'avatar_22') {
        return <SvgIcon component={avatar_22} inheritViewBox/>
    }
}

function Profile() {
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
    const { profileIcon, setProfileIcon } = useGlobalSettings()

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
        setAvatarName(tile.name)
        setAvatarObj(tile.img)
        setProfileIcon(getIcon(tile.name))
        localStorage.setItem('avatar',tile.name)

        /*
        const req = request
        req.post("/profile/avatar")
            .send(JSON.stringify({ standard_avatar: tile.name }))
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                console.log(res.message)
                setAvatarName(tile.name)
                setAvatarObj(tile.img)
                setProfileIcon(getIcon(tile.name))
                localStorage.setItem('avatar',tile.name)
            })
            .catch((err) => {
                console.log(err)
            });

         */

    };

    /*
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

     */

    const handleStandard = () => setOpenDialog(true)

    const updateAvatar = (file) => {
        setAvatarObj(file)
        setOpenUpload(false)
    };

    const handleSave = (files) => {
        const reader = new FileReader()
        let formData = {}

        /*
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

         */
    }

    const handleAboutMeChange = (e) => setAboutMe(e.target.value)

    useEffect(() => {
        document.title = `poptape auctions | ${Cookies.get("username")} | profile`

        const req = request
        console.log("***********************************")
        console.log("In ProfileOwner useEffect")

        /*
        req.get("/profile")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                if (res.body.about_me !== null && res.body.about_me !== "") {
                    setAboutMe(res.body.about_me)
                }
                if (res.body.standard_avatar !== null && res.body.standard_avatar !== "") {
                    setAvatarName(res.body.standard_avatar)
                    setProfileIcon(getIcon(res.body.standard_avatar))
                    localStorage.setItem('avatar',res.body.standard_avatar)
                    setAvatarObj(getIcon(res.body.standard_avatar))
                }
            })
            .catch((err) => {
                console.log(err)
            })

         */

    }, [])

    const theme = selectTheme()
    const avObj = <SvgIcon component={avatar_22} inheritViewBox/>

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
                                alt="clah"
                                src="../../assets/images/avatars/svg-avatars/avatar-1-svgrepo-com.svg?react"
                                sx="xl"
                            />
                            {/*<AvatarChooser avatarSize="xl" avatarObj={avatarObj} />*/}
                        </Box>
                    </Grid>
                    <Grid sx={{backgroundColor: '#939f22'}} size={{ xs: 12, md: 9 }}>
                            <Button
                                color="secondary"
                                variant="outlined"
                                size="small"
                                onClick={handleStandard}
                            >
                                Select from existing
                            </Button>
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

export default Profile