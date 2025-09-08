import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Select from '@mui/material/Select'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import {getCategoriesAndFields} from '../../assets/scripts/general'
import FormBuilder from '../helpers/FormBuilder'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import superagent from 'superagent'
import { styled } from '@mui/material/styles'

// Styles
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3, 2)
}));

const ItemName = styled('span')(({ theme }) => ({
    fontStyle: 'italic'
}));

const CompTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.2em'
}));

const Dropbuttons = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    marginRight: 20
}));

const ImageWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: 10,
    flexWrap: 'wrap',
    marginBottom: 15
}));

const S3Image = styled('img')(({ theme }) => ({
    display: 'block',
    maxWidth: 300,
    maxHeight: 200,
    width: 'auto',
    height: 'auto',
    margin: 10
}));

const loadCategory = (cat) =>
    cat.map((c, k) => (
        <MenuItem value={c.value} key={k}>
            {c.name}
        </MenuItem>
    ));

//TODO: refactor all of this to make it more general and i18.
// In it's current form it's more proof of concept

export default function CreateItemForm() {

    const { t } = useTranslation()
    const categoriesAndFields = getCategoriesAndFields()
    //console.log(categoriesAndFields)

    const peckishDefault = {
        variant: 'info',
        message: t('items:cif_default_message')
    };

    const navigate = useNavigate()
    const [showSnack, setShowSnack] = useState(false)
    const [duration] = useState(1900)
    const [openUpload, setOpenUpload] = useState(false)
    const [showCats, setShowCats] = useState(true)
    const [chosenCat, setChosenCat] = useState('')
    const [topLevelCat, setTopLevelCat] = useState('')
    const [topLevelCatArray, setTopLevelCatArray] = useState(loadCategory(categoriesAndFields['topLevelCats']))
    const [secondLevelCatArray, setSecondLevelCatArray] = useState('')
    const [secondLevelCat, setSecondLevelCat] = useState()
    const [showSecondLevelCat, setShowSecondLevelCat] = useState(false)
    const [formBuilderTitle, setFormBuilderTitle] = useState(t('items:cif_form_builder_title'))
    const [formBuilderBlurb, setFormBuilderBlurb] = useState(t('items:cif_form_builder_blurb'))
    const [formFields, setFormFields] = useState(categoriesAndFields['standardFields'])
    const [noOfFiles, setNoOfFiles] = useState(0)
    const [urls, setUrls] = useState([])
    const [itemId, setItemId] = useState('')
    const [progress, setProgress] = useState(0)
    const [results, setResults] = useState([])
    const [bucketURL, setBucketURL] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [showDropzone, setShowDropzone] = useState(false)
    const [date] = useState(new Date().getTime())
    const [peckish, setPeckish] = useState(peckishDefault)
    const [model, setModel] = useState({})

    const handleChange = useCallback((e, key) => {
        const value = e.target.value
        if (key === 'topLevelCat') {
            setTopLevelCat(value)
            setShowForm(false)
            if (value === 'vehicles:20001') {
                setSecondLevelCatArray(loadCategory(categoriesAndFields['vehicleCats']))
                setShowSecondLevelCat(true)
            } else {
                setSecondLevelCatArray(loadCategory(categoriesAndFields['otherCats']))
                setShowSecondLevelCat(true)
            }
        } else if (key === 'secondLevelCat') {
            setSecondLevelCat(value)
            setChosenCat(value)
            if (value === 'cars:21000') {
                setFormFields(categoriesAndFields['carFields'])
                setFormBuilderTitle('Car Information')
                setFormBuilderBlurb("Enter your cars' details")
                setShowForm(true)
            } else {
                setFormFields(categoriesAndFields['standardFields'])
                setShowForm(true)
            }
        }
    }, [])

    const openSnack = useCallback(() => {
        setShowSnack(false)
        setTimeout(() => setShowSnack(true), 0)
    }, [])

    const handleOpen = () => setOpenUpload(true)
    const handleClose = () => setOpenUpload(false)

    const onFail = (err) => {
        let variant = "warning"
        let message = t('errors:something_went_bang')
        if (err.status === 400) {
            variant = "warning"
            message = t('errors:fields_incorrect')
        } else if (err.status === 401) {
            variant = "error"
            message = t('errors:unauthorized')
        } else if (err.status === 502) {
            variant = "error"
            message = t('errors:bad_gqteway')
        }
        setPeckish({ variant, message })
        openSnack()
    };

    const onSubmit = (formModel) => {
        formModel['category'] = chosenCat
        setModel(formModel);

        superagent.post('/items')
            .send(JSON.stringify(formModel))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', Cookies.get('access-token'))
            .then((res) => {
                let s3urls = res.body.s3_urls
                setUrls([s3urls])
                setItemId(res.body.item_id)
                setBucketURL(res.body.bucket_url)
                setPeckish({ variant: 'success', message: t('items:cif_default_message') })
                openSnack()
                setShowForm(false)
                setShowCats(false)
                setShowDropzone(true)
            })
            .catch(onFail)
    }

    const handleSave = (selectedFiles) => {
        let urlsArray = urls[0]?.slice() || []
        let uploadResults = []
        const bucket = bucketURL
        const id = itemId
        const interval = 100 / selectedFiles.length
        setNoOfFiles(selectedFiles.length)

        const createThumbnail = (image, imType) => {
            const thumbnailMaxWidth = 150
            const thumbnailMaxHeight = 100
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let thumbnailScale =
                image.width / image.height > thumbnailMaxWidth / thumbnailMaxHeight
                    ? thumbnailMaxWidth / image.width
                    : thumbnailMaxHeight / image.height
            let thumbnailWidth = image.width * thumbnailScale
            let thumbnailHeight = image.height * thumbnailScale
            canvas.width = thumbnailWidth
            canvas.height = thumbnailHeight
            ctx.drawImage(image, 0, 0, thumbnailWidth, thumbnailHeight)
            return [canvas.toDataURL(imType, 70), image.width, image.height, thumbnailWidth, thumbnailHeight]
        };

        const updateResults = (resultsArr) => {
            setResults(resultsArr)
            setShowDropzone(false)
            setShowResults(true)
            setTimeout(() => setShowResults(true), 0)
        };

        async function postImages() {
            const promises = selectedFiles.map(async (currentFile, idx) => {
                let currentS3URL = urlsArray.shift()
                let formData = new FormData()
                let fotoData = {}

                formData.append('key', currentS3URL.fields.key)
                formData.append('policy', currentS3URL.fields.policy)
                formData.append('x-amz-algorithm', currentS3URL.fields['x-amz-algorithm'])
                formData.append('x-amz-credential', currentS3URL.fields['x-amz-credential'])
                formData.append('x-amz-date', currentS3URL.fields['x-amz-date'])
                formData.append('x-amz-signature', currentS3URL.fields['x-amz-signature'])
                formData.append('file', currentFile)

                const reader = new FileReader()
                reader.onload = function (event) {
                    const originalImage = new window.Image()
                    originalImage.src = event.target.result
                    const [base64, oWidth, oHeight, tWidth, tHeight] = createThumbnail(originalImage, currentFile.type)
                    fotoData['thumbnail'] = base64
                    fotoData['orig_width'] = oWidth
                    fotoData['orig_height'] = oHeight
                    fotoData['thumb_width'] = tWidth
                    fotoData['thumb_height'] = tHeight
                };
                reader.readAsDataURL(currentFile)

                fotoData['item_id'] = id
                fotoData['foto_id'] = currentS3URL.fields.key
                fotoData['s3_url'] = bucket + currentS3URL.fields.key
                fotoData['size'] = currentFile.size
                fotoData['type'] = currentFile.type
                fotoData['lastModified'] = currentFile.lastModified
                fotoData['idx'] = idx

                return superagent
                    .post(bucket)
                    .set('Accept', 'application/json')
                    .send(formData)
                    .then((res) => {
                        uploadResults.push({
                            url: fotoData.s3_url,
                            originalFilename: currentFile.name,
                            status: res.status
                        });
                        setProgress((p) => p + interval)
                        if (res.status === 204) {
                            return req
                                .post('/fotos')
                                .send(JSON.stringify(fotoData))
                                .set('Accept', 'application/json')
                                .set('Content-Type', 'application/json')
                                .set('x-access-token', Cookies.get('access-token'))
                                .then(() => updateResults([...uploadResults]))
                                .catch((fotosErr) => {
                                    console.log('Error posting to fotos microservice')
                                    console.log(fotosErr)
                                });
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        uploadResults.push({
                            url: bucket + '/' + currentS3URL.fields.key,
                            originalFilename: currentFile.name,
                            status: err.status
                        })
                    })
            })

            await Promise.all(promises)
            updateResults([...uploadResults])
        }

        postImages()
        handleClose()
    };

    useEffect(() => {
        let tlca = categoriesAndFields['topLevelCats']

        for (var i = 0; i < tlca.length; i++) {
            let trans = t(tlca[i].name)
            tlca[i].name = trans
        }
        setTopLevelCatArray(loadCategory(tlca))

    }, []);

    useEffect(() => {

        let slca = []
        if (topLevelCat === "vehicles:20001") {
            slca = categoriesAndFields['vehicleCats']
        } else {
            slca = categoriesAndFields['otherCats']
        }

        for (var i = 0; i < slca.length; i++) {
            let trans = t(slca[i].name)
            slca[i].name = trans
        }
        setSecondLevelCatArray(loadCategory(slca))

    }, [topLevelCat]);


    //console.log(categoriesAndFields['topLevelCats'])
    return(
        <Box>
            <StyledPaper>
                {showCats && (
                    <>
                        <CompTitle variant="h4" component="h4">
                            {t('items:cif_create_item_title')}
                        </CompTitle>
                        <Typography component="p">
                            <br />
                            {t('items:cif_create_item_blurb')}
                        </Typography>
                        <br />
                        <FormLabel>
                            {t('items:cif_create_cat_dropdown')}
                            <span className="MuiFormLabel-asterisk MuiInputLabel-asterisk"> *</span>
                        </FormLabel>
                        <br />
                        <Select
                            required
                            displayEmpty
                            value={topLevelCat || ''}
                            sx={{ minWidth: 200, marginRight: 2, marginBottom: 2 }}
                            onChange={e => handleChange(e, 'topLevelCat')}
                            inputProps={{
                                name: 'topLevelCat',
                                id: 'topLevelCat'
                            }}
                        >
                            {topLevelCatArray}
                        </Select>
                        {showSecondLevelCat && (
                            <Select
                                required
                                displayEmpty
                                value={secondLevelCat || ''}
                                sx={{ minWidth: 200, marginRight: 2 }}
                                onChange={e => handleChange(e, 'secondLevelCat')}
                                inputProps={{
                                    name: 'secondLevelCat',
                                    id: 'secondLevelCat'
                                }}
                            >
                                {secondLevelCatArray}
                            </Select>
                        )}
                    </>
                )}
            </StyledPaper>
            {showForm && (
                <FormBuilder
                    title={formBuilderTitle}
                    blurb={formBuilderBlurb}
                    model={formFields}
                    submitLabel="Create"
                    onSubmit={onSubmit}
                />
            )}
        </Box>
    )
}