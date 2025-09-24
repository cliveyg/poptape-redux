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
import { useTranslation } from 'react-i18next'

export default function ItemPage({inItem}) {
    console.log('In ItemPage and inItem is ['+inItem+']')

    const [item, setItem] = React.useState(inItem || null)
    const [gotItem, setGotItem] = React.useState(false)
    let params = useParams()
    const [variant, setVariant] = React.useState('error')
    const [message, setMessage] = React.useState('Something went bang!')
    const [showSnack, setshowSnack] = React.useState(false)
    const duration = 2000
    const date = new Date().getTime()
    const { t } = useTranslation()

    //console.log("Params are ["+JSON.stringify(params)+"]")
    console.log('In ItemPage and item is ['+JSON.stringify(item)+']')

    const Gotty = () => {
        setGotItem(true)
    }

    function getItemData(ip) {

        if (item === null) {

            console.log("Calling api server with url [/api/item/"+ip.item_id+"/fotos]")

            superagent.get('/api/item/'+ip.item_id+'/fotos')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .then(res => {
                    let rItem = res.body
                    rItem['item_id'] = ip.item_id
                    setItem(rItem)
                    setGotItem(true)
                    // superagent.get('/fotos/item/'+rItem.item_id)
                    //     .set('Accept', 'application/json')
                    //     .set('Content-Type', 'application/json')
                    //     .then(res => {
                    //         rItem['fotos'] = res.body.fotos
                    //         setItem(rItem)
                    //         setGotItem(true)
                    //     })
                    //     .catch(err => {
                    //         if (err.status === 404) {
                    //             rItem['fotos'] = []
                    //             setItem(rItem)
                    //             setGotItem(true)
                    //         } else {
                    //             console.log(err)
                    //             setMessage('Unable to retrieve photos for item')
                    //             setVariant('error')
                    //             setshowSnack(true)
                    //             setTimeout(function() {
                    //                 setshowSnack(false)
                    //             }, duration)
                    //         }
                    //     })
                })
                .catch(err => {
                    console.log(err)
                    setMessage(t('items:ip_error_mess_1'))
                    setVariant('error')
                    setshowSnack(true)
                    setTimeout(function() {
                        setshowSnack(false)
                    }, duration)
                })
        }

    }


    React.useEffect(() => {
        //Runs only on the first render
        CheckItem()
    }, []);

    const CheckItem = () => {
        if (!gotItem) {
            console.log('CheckItem() not got the item...')
            if (params.item_id !== null && params.item_id !== undefined ) {
                if (isValidUUID(params.item_id)) {
                    console.log('valid uuid')
                    getItemData(params)
                    // setMessage('Valid uuid')
                    // setVariant('success')
                    // setshowSnack(true)
                    // setTimeout(function() {
                    //     setshowSnack(false)
                    // }, duration)
                } else {
                    //TODO: snackbar?
                    console.log('invalid item uuid in url')
                    setMessage(t('items:ip_error_mess_2'))
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
                        {gotItem ?
                            <ItemPageController item={item}/>
                            :
                            null
                        }
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
