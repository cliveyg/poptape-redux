import React from 'react'
import { useParams } from 'react-router'
import '../css/poptape.css'
import ItemPageController from '../components/items/ItemPageController'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { selectTheme } from '../assets/scripts/theme'
import { isValidUUID } from '../assets/scripts/general'
import CustomSnackbar from '../components/information/CustomSnackbar'
import superagent from 'superagent'
import TopNavBar from '../components/navigation/TopNavBar'

export default function ItemPage({inItem}) {
    console.log('In ItemPage')

    const [item, setItem] = React.useState(inItem || null)
    const [gotItem, setGotItem] = React.useState(false)
    let params = useParams()
    const [variant, setVariant] = React.useState('error')
    const [message, setMessage] = React.useState('Something went bang!')
    const [showSnack, setshowSnack] = React.useState(false)
    const duration = 2000
    const date = new Date().getTime()

    const Gotty = () => {
        setGotItem(true)
    }

    function getItemData(ip) {

        if (item === null) {

            superagent.get('/items/'+ip.item_id)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .then(res => {
                    let rItem = res.body
                    rItem['item_id'] = ip.item_id
                    superagent.get('/fotos/item/'+rItem.item_id)
                        .set('Accept', 'application/json')
                        .set('Content-Type', 'application/json')
                        .then(res => {
                            rItem['fotos'] = res.body.fotos
                            setItem(rItem)
                            setGotItem(true)
                        })
                        .catch(err => {
                            if (err.status === 404) {
                                rItem['fotos'] = []
                                setItem(rItem)
                                setGotItem(true)
                            } else {
                                console.log(err)
                                setMessage('Unable to retrieve photos for item')
                                setVariant('error')
                                setshowSnack(true)
                                setTimeout(function() {
                                    setshowSnack(false)
                                }, duration)
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                    setMessage('Unable to retrieve item')
                    setVariant('error')
                    setshowSnack(true)
                    setTimeout(function() {
                        setshowSnack(false)
                    }, duration)
                })
        }

    }

    const CheckItem = () => {
        if (!gotItem) {
            console.log('not got the item...')
            if (params.item_id !== null && params.item_id !== undefined ) {
                if (isValidUUID(params.item_id)) {
                    console.log('valid uuid')
                    //getItemData(params)
                    //setMessage('Valid uuid')
                    //setVariant('success')
                    //setshowSnack(true)
                    //setTimeout(function() {
                    //    setshowSnack(false)
                    //}, duration)
                } else {
                    //TODO: snackbar?
                    console.log('invalid item uuid in url')
                    setMessage('Invalid item id')
                    setVariant('error')
                    setshowSnack(true)
                    setTimeout(function() {
                        setshowSnack(false)
                    }, duration)
                }
            } else {
                console.log('item_id does not exist')
            }
        }
    }

    const theme = selectTheme()

    return (
        <>
            <CheckItem />
            <header>
                <TopNavBar />
            </header>
            <ThemeProvider theme={theme}>
                <Box sx={{ml: 1}}>
                    <Paper sx={{
                        margin: theme.spacing(1),
                        padding: 1,
                        variant: 'outlined',
                        backgroundColor: 'offwhite.main',
                    }}
                    >
                        In item page<br/>
                        <ItemPageController item={'meep'} />

                        {showSnack ?
                            <CustomSnackbar
                                duration={duration}
                                key_date={date}
                                variant={variant}
                                message={message}
                            />
                            :
                            null
                        }
                    </Paper>
                </Box>
            </ThemeProvider>
        </>
    )
}
