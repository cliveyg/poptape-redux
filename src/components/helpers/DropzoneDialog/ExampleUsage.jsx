import React, { useState } from 'react'
import Button from '@mui/material/Button'
import DropzoneDialog from './DropzoneDialog'
import {useTranslation} from 'react-i18next'

function ExampleUsage() {
    const [open, setOpen] = useState(false)
    const [files, setFiles] = useState([])

    // Memoize initialFiles so it doesn't change reference unless files change
    // This prevents unnecessary re-renders or infinite loops in DropzoneDialog
    const initialFiles = React.useMemo(() => files, [files])
    const { t } = useTranslation()

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Add Files
            </Button>
            <DropzoneDialog
                open={open}
                onClose={() => setOpen(false)}
                onSave={(selectedFiles) => {
                    console.log("in onSave")
                    setFiles(selectedFiles)
                    setOpen(false)
                }}
                onChange={(selectedFiles) => setFiles(selectedFiles)}
                dialogTitle={t('helpers:dzd_title')}
                maxFileSize={5000000}
                showPreviews={true}
                showFileNamesInPreview={true}
                acceptedFiles={['image/jpeg', 'image/jpg', 'image/tiff', 'image/png']}
                accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                filesLimit={5}
                cancelButtonText={t('helpers:dzd_cancel')}
                submitButtonText={t('helpers:dzd_upload')}
                initialFiles={initialFiles}
            />
            <div>
                <h3>Selected Files</h3>
                <ul>
                    {files.map(file => (
                        <li key={file.name}>{file.name} ({file.type})</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ExampleUsage