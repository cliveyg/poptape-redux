import React, { useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarChooser from "../helpers/AvatarChooser";
import AvatarGrid from "../helpers/AvatarGrid";
import { DropzoneDialog } from "material-ui-dropzone";
import CustomizedSnackbars from "../information/CustomSnackbars";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MaxTextField from "../helpers/MaxTextField";
import MetaViewer from "../reviews/MetaViewer";
import SideMenu from "../navigation/SideMenu";
import { useNavigate } from "react-router-dom";

const PREFIX = "NewProfileOwner";
const classes = {
    paper: `${PREFIX}-paper`,
    dropbuttons: `${PREFIX}-dropbuttons`,
    menubuttons: `${PREFIX}-menubuttons`,
    menuBox: `${PREFIX}-menuBox`,
    buttons: `${PREFIX}-buttons`,
    buttonBox: `${PREFIX}-buttonBox`,
    avatarBox: `${PREFIX}-avatarBox`,
    title: `${PREFIX}-title`,
    about_me: `${PREFIX}-about_me`,
};

const StyledBox = styled(Box)(({ theme }) => ({
    [`& .${classes.paper}`]: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    [`& .${classes.dropbuttons}`]: {
        marginTop: 15,
        textTransform: "none",
        marginRight: 15,
    },
    [`& .${classes.menubuttons}`]: {
        marginTop: 15,
        textTransform: "none",
        marginRight: 15,
        width: 200,
    },
    [`& .${classes.menuBox}`]: {
        paddingRight: 20,
    },
    [`& .${classes.buttons}`]: {
        textTransform: "none",
    },
    [`& .${classes.buttonBox}`]: {},
    [`& .${classes.avatarBox}`]: {
        marginRight: 15,
    },
    [`& .${classes.title}`]: {
        fontSize: "1.4em",
    },
    [`& .${classes.about_me}`]: {
        marginTop: 10,
    },
}));

const initialPeckish = {
    variant: "success",
    message: "Profile updated",
};

function NewProfileOwner() {
    const [showSnack, setShowSnack] = useState(false);
    const [duration] = useState(1500);
    const [peckish, setPeckish] = useState(initialPeckish);
    const [date, setDate] = useState(new Date().getTime());
    const [openUpload, setOpenUpload] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [avatarObj, setAvatarObj] = useState(null);
    const [avatarName, setAvatarName] = useState(null);
    const [username] = useState(Cookies.get("username"));
    const [aboutMe, setAboutMe] = useState("");

    const navigate = useNavigate();

    const handleOpen = () => setOpenUpload(true);

    const openSnack = useCallback(() => {
        setShowSnack(false);
        setTimeout(() => setShowSnack(true), 0);
        setDate(new Date().getTime());
    }, []);

    const handleClose = () => {
        setOpenUpload(false);
        setOpenDialog(false);
    };

    const selectTile = (tile) => {
        handleClose();
        const request = require("superagent");
        request
            .post("/profile/avatar")
            .send(JSON.stringify({ standard_avatar: tile.name }))
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                setAvatarName(tile.name);
                setAvatarObj(tile.img);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const submitAboutMe = () => {
        const request = require("superagent");
        request
            .post("/profile")
            .send(JSON.stringify({ about_me: aboutMe }))
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                setPeckish({ variant: "success", message: "Profile updated" });
                openSnack();
            })
            .catch((err) => {
                console.log(err);
                setPeckish({ variant: "error", message: "Computer says no" });
                openSnack();
            });
    };

    const handleStandard = () => setOpenDialog(true);

    const updateAvatar = (file) => {
        setAvatarObj(file);
        setOpenUpload(false);
    };

    const handleSave = (files) => {
        const reader = new FileReader();
        let formData = {};

        reader.onload = (event) => {
            formData["bespoke_avatar"] = event.target.result;
            const request = require("superagent");
            request
                .post("/profile/avatar")
                .send(JSON.stringify(formData))
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .set("x-access-token", Cookies.get("access-token"))
                .then((res) => {
                    updateAvatar(formData["bespoke_avatar"]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        reader.readAsDataURL(files[0]);
    };

    const handleAboutMeChange = (e) => setAboutMe(e.target.value);

    useEffect(() => {
        document.title = `poptape auctions | ${Cookies.get("username")} | profile`;

        const request = require("superagent");
        request
            .get("/profile")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("x-access-token", Cookies.get("access-token"))
            .then((res) => {
                if (res.body.about_me !== null && res.body.about_me !== "") {
                    setAboutMe(res.body.about_me);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <StyledBox>
            <Paper className={classes.paper}>
                <Typography className={classes.title}>Your profile</Typography>
                <Box display="flex" flexDirection="row">
                    <Box className={classes.menuBox}>
                        <SideMenu selected="profile" />
                    </Box>
                    <Box flexGrow={1}>
                        <Card>
                            <CardContent>
                                <Box display="flex" flexDirection="row">
                                    <Box flex={1} className={classes.avatarBox}>
                                        <AvatarChooser avatarSize="xl" avatarObj={avatarObj} />
                                    </Box>
                                    <Box flex={2}>
                                        <Box display="flex" flexDirection="column">
                                            <Box>
                                                <Button
                                                    className={classes.dropbuttons}
                                                    color="secondary"
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={handleOpen}
                                                >
                                                    Upload avatar
                                                </Button>
                                            </Box>
                                            <Box>
                                                <Button
                                                    className={classes.dropbuttons}
                                                    color="secondary"
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={handleStandard}
                                                >
                                                    Select from existing
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box flex={2}>
                                        <MetaViewer />
                                    </Box>
                                    <Box flexGrow={4}></Box>
                                </Box>
                            </CardContent>
                        </Card>
                        <Box className={classes.about_me}>
                            <MaxTextField
                                multiline
                                rows={5}
                                margin="dense"
                                label="About you"
                                name="about_me"
                                type="text"
                                inputProps={{
                                    maxLength: 500,
                                }}
                                characterLimit={500}
                                helperText="Number of characters:&nbsp;&nbsp;&nbsp;"
                                fullWidth
                                value={aboutMe}
                                onChange={handleAboutMeChange}
                            />
                            <br />
                            <Button
                                className={classes.dropbuttons}
                                color="secondary"
                                variant="outlined"
                                size="small"
                                onClick={submitAboutMe}
                            >
                                Update about you
                            </Button>
                            <br />
                            <br />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <DropzoneDialog
                        open={openUpload}
                        onSave={handleSave}
                        acceptedFiles={["image/jpeg", "image/png"]}
                        showPreviews={false}
                        showAlerts={false}
                        showPreviewsInDropzone={true}
                        dropzoneText="&nbsp;&nbsp;Drag and drop an image file here or click&nbsp;&nbsp;"
                        dropzoneParagraphClass={{ fontSize: 12, padding: 10 }}
                        maxFileSize={60000}
                        filesLimit={1}
                        onClose={handleClose}
                    />
                </Box>
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
            </Paper>
            {showSnack ? (
                <CustomizedSnackbars
                    duration={duration}
                    key_date={date}
                    variant={peckish.variant}
                    message={peckish.message}
                />
            ) : null}
        </StyledBox>
    );
}

export default NewProfileOwner;