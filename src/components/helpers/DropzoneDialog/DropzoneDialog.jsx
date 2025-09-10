import React, { useState, useEffect, useCallback, useRef } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DropzoneAreaBase from './DropzoneAreaBase'

// Helper to compare two arrays of files by name/size/type
function filesAreEqual(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (
        a[i].name !== b[i].name ||
        a[i].size !== b[i].size ||
        a[i].type !== b[i].type
    ) {
      return false
    }
  }
  return true
}

function DropzoneDialog({
                          open = false,
                          dialogTitle = 'Upload file',
                          dialogProps = {},
                          fullWidth = true,
                          maxWidth = 'sm',
                          cancelButtonText = 'Cancel',
                          submitButtonText = 'Submit',
                          showPreviews = true,
                          showPreviewsInDropzone = false,
                          showFileNamesInPreview = true,
                          initialFiles = [],
                          clearOnUnmount = false,
                          onSave,
                          onClose,
                          onChange,
                          onDelete,
                          ...dropzoneAreaProps
                        }) {
  const [fileObjects, setFileObjects] = useState([])
  const prevFilesRef = useRef([])

  // Only initialize fileObjects when dialog opens
  useEffect(() => {
    let canceled = false
    if (open) {
      async function loadFiles() {
        const fileObjs = await Promise.all(
            (initialFiles || []).map(async (initialFile) => {
              let file = typeof initialFile === 'string'
                  ? await createFileFromUrl(initialFile)
                  : initialFile
              const data = await readFile(file)
              return { file, data }
            })
        )
        if (!canceled) setFileObjects(fileObjs)
      }
      loadFiles()
    }
    // Optionally clear files when dialog closes and clearOnUnmount is true
    if (!open && clearOnUnmount) {
      setFileObjects([])
    }
    return () => { canceled = true }
    // Depend only on open and initialFiles reference
    // eslint-disable-next-line
  }, [open, initialFiles, clearOnUnmount])

  // Prevent parent infinite update: Only call onChange if files actually change
  useEffect(() => {
    const files = fileObjects.map((fileObj) => fileObj.file)
    if (!filesAreEqual(prevFilesRef.current, files)) {
      prevFilesRef.current = files
      if (onChange) {
        onChange(files)
      }
    }
    // eslint-disable-next-line
  }, [fileObjects])

  const handleAdd = useCallback(
      (newFileObjects) => {
        setFileObjects((prev) => {
          if ((dropzoneAreaProps.filesLimit || 3) <= 1) {
            return [newFileObjects[0]]
          }
          return [...prev, ...newFileObjects]
        })
      },
      [dropzoneAreaProps.filesLimit]
  )

  const handleDelete = useCallback(
      (removedFileObj, idx) => {
        setFileObjects((prev) => prev.filter((_, i) => i !== idx))
        if (onDelete) onDelete(removedFileObj.file, idx)
      },
      [onDelete]
  )

  const handleSave = (evt) => {
    if (onSave) onSave(fileObjects.map((fileObject) => fileObject.file), evt)
    if (clearOnUnmount) setFileObjects([])
  }

  const handleDialogClose = (evt) => {
    if (onClose) onClose(evt)
    if (clearOnUnmount) setFileObjects([])
  }

  return (
      <Dialog
          {...dialogProps}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          onClose={handleDialogClose}
          open={open}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent sx={{ pb: 0, mb: 0 }}>
          <DropzoneAreaBase
              {...dropzoneAreaProps}
              fileObjects={fileObjects}
              onAdd={handleAdd}
              onDelete={handleDelete}
              showPreviews={showPreviews}
              showPreviewsInDropzone={showPreviewsInDropzone}
              showFileNamesInPreview={showFileNamesInPreview}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDialogClose}>
            {cancelButtonText}
          </Button>
          <Button color="primary" disabled={fileObjects.length === 0} onClick={handleSave}>
            {submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DropzoneDialog

// Helpers
async function createFileFromUrl(url) {
  const response = await fetch(url)
  const blob = await response.blob()
  const name = url.split('/').pop()
  return new File([blob], name || 'file', { type: blob.type })
}
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}