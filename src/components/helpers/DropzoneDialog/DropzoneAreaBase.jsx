import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Dropzone from 'react-dropzone'
import PreviewList from './PreviewList'
import CustomSnackbar from '../../information/CustomSnackbar'
import {useTranslation} from 'react-i18next'
import {readFile} from '../../../assets/scripts/general'
import {selectTheme} from '../../../assets/scripts/theme'

const Root = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: 250,
    backgroundColor: theme.palette.background.paper,
    border: 'dashed',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'border-box',
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}))

const Active = styled(Root)(({ theme }) => ({
    animation: 'progress 2s linear infinite !important',
    backgroundImage: `repeating-linear-gradient(-45deg, ${theme.palette.background.paper}, ${theme.palette.background.paper} 25px, ${theme.palette.divider} 25px, ${theme.palette.divider} 50px)`,
    backgroundSize: '150% 100%',
    border: 'solid',
    borderColor: theme.palette.primary.light
}))

const Invalid = styled(Root)(({ theme }) => ({
    backgroundImage: `repeating-linear-gradient(-45deg, ${theme.palette.error.light}, ${theme.palette.error.light} 25px, ${theme.palette.error.dark} 25px, ${theme.palette.error.dark} 50px)`,
    borderColor: theme.palette.error.main
}))

function DropzoneAreaBase({
                              fileObjects = [],
                              onAdd,
                              onDelete,
                              onAlert,
                              dropzoneText,
                              showPreviews = true,
                              showPreviewsInDropzone = false,
                              showFileNamesInPreview = true,
                              getPreviewIcon,
                              Icon = CloudUploadIcon,
                              reset,
                              ...props
                          }) {

    const { t } = useTranslation()
    const theme = selectTheme()
    const [active, setActive] = React.useState(false)
    const [invalid, setInvalid] = React.useState(false)
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', variant: 'success', key_date: Date.now() })

    const handleDropAccepted = async (acceptedFiles, evt) => {
        setInvalid(false)
        const newObjs = await Promise.all(
            acceptedFiles.map(async (file) => ({
                file,
                data: await readFile(file)
            }))
        )
        if (onAdd) onAdd(newObjs)
        setSnackbar({
            open: true,
            message: t('helpers:dzd_file_added'),
            variant: 'success',
            key_date: Date.now(),
            duration: 4000
        })
    }
    const handleDropRejected = (rejectedFiles, evt) => {
        setSnackbar({
            open: true,
            message: t('helpers:dzd_file_invalid'),
            variant: 'error',
            key_date: Date.now(),
            duration: 4000
        })
        setInvalid(true)
    }
    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false })

    const handleRemove = idx => () => {
        if (onDelete) onDelete(fileObjects[idx], idx)
    }

    const handleDragEnter = () => {
        setActive(true)
        setInvalid(false)
    }
    const handleDragLeave = () => {
        setActive(false)
        setInvalid(false)
    }

    let Container = Root
    if (invalid) {
        Container = Invalid
    } else if (active) {
        Container = Active
    }

    const getIcon = getPreviewIcon ??
        ((fileObj) => {
            if (fileObj.file.type.startsWith('image/')) {
                return <img src={fileObj.data} alt={fileObj.file.name} style={{ height: 100, borderRadius: 4 }} />
            }
            return <AttachFileIcon style={{ height: 100 }} />
        })

    return (
        <>
            <Dropzone
                onDropAccepted={handleDropAccepted}
                onDropRejected={handleDropRejected}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                {...props}
            >
                {({ getRootProps, getInputProps, isDragActive }) => {
                    return (
                        <Container {...getRootProps()} tabIndex={0}>
                            <input {...getInputProps()} />
                            <div style={{ textAlign: 'center' }}>
                                <Icon style={{ width: 51, height: 51, color: theme.palette.primary.main }} />
                                <Typography variant="subtitle1" style={{ margin: 24 }}>
                                    {dropzoneText}
                                </Typography>
                                {reset &&
                                    (typeof reset === 'object'
                                        ? reset
                                        : <Button variant="outlined" onClick={reset.onClick}>Reset</Button>)
                                }
                            </div>
                            {showPreviewsInDropzone && fileObjects.length > 0 && (
                                <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                                    <PreviewList
                                        fileObjects={fileObjects}
                                        handleRemove={handleRemove}
                                        showFileNames={showFileNamesInPreview}
                                        getPreviewIcon={getIcon}
                                    />
                                </div>
                            )}
                        </Container>
                    )
                }}
            </Dropzone>
            {showPreviews && !showPreviewsInDropzone && fileObjects.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <PreviewList
                        fileObjects={fileObjects}
                        handleRemove={handleRemove}
                        showFileNames={showFileNamesInPreview}
                        getPreviewIcon={getIcon}
                    />
                </div>
            )}
            {snackbar.open && (
                <CustomSnackbar
                    message={snackbar.message}
                    variant={snackbar.variant}
                    key_date={snackbar.key_date}
                    duration={snackbar.duration}
                    nohide={false}
                />
            )}
        </>
    )
}

export default DropzoneAreaBase
