import * as React from 'react'
import '../../css/poptape.css'
import superagent from 'superagent'
import OwnerView from './OwnerView'
import BidderView from './BidderView'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'
import Gallery from '../helpers/Gallery'

export default function ItemPageController({item}) {

    console.log('In ItemPageController')
    if (item !== null && item !== undefined){
         console.log('got our item')
    }

    const [showError, setShowError] = React.useState(true)
    const [ownerView, setOwnerView] = React.useState(false)
    const [ownerViewComp, setOwnerViewComp] = React.useState(null)
    const [bidderViewComp, setBidderViewComp] = React.useState(null)
    const [auction, setAuction] = React.useState(null)
    const [currentLot, setCurrentLot] = React.useState(null)
    //const [gotItem, setGotItem] = React.useState(false)

    const getAuctionHouseData = () => {
        const auctionhouseURL = '/auctionhouse/auction/item/'
            +item.item_id+'/'
        superagent.get(auctionhouseURL)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then(res => {
                setAuction(res.body.auction)
                React.useEffect(() => {
                    // need to set the current lot
                    const lots = auction.lots
                    let currLo = null
                    lots.forEach(function(lot) {
                        if (lot.item_id === item.item_id) {
                            currLo = lot
                        }
                    });
                    setCurrentLot(currLo)
                }, [auction])
            })
            .catch(err => {
                console.log(err)
            })
    }

    function setAuctionLotData() {

        console.log("ITPC setAuctionLotData")
        const ownerViewComp =
            <OwnerView
                item = {item}
                auction = {auction}
                currentLot = {currentLot}
            />

        setOwnerViewComp(ownerViewComp)

        const bidderViewComp =
            <BidderView
                item = {item}
                auction = {auction}
                currentLot = {currentLot}
            />
        setBidderViewComp(bidderViewComp)
    }

    React.useEffect(() => {
        setAuctionLotData()
    }, [currentLot])

    React.useEffect(() => {
        if (item) {

            if (item.public_id === Cookies.get('public_id')) {
                setOwnerView(true)
            }
            setShowError(false)
            document.title = 'POPTAPE | item | '+ item.name
        } else {
            document.title = 'POPTAPE | item'
        }

        //TODO: post to recently viewed for logged in users
    })

    return (
        <Box style={{width: "100%"}}>
            {showError ?
                <Box>
                    <Typography variant="h5" component="h5">
                        Item not supplied<br />
                    </Typography>
                </Box>
                :
                <>
                    <Box sx={{ backgroundColor: 'purple' }}>
                        <Typography sx={{ marginBottom: 25, fontSize: "1.6em", }} variant="h4" component="h4">
                            {item.name}
                        </Typography>
                    </Box>
                    <Box sx={{ backgroundColor: 'pink' }} display="flex" flexDirection="row">
                        blah
                        <Box flex={5}>
                            {ownerView ?
                                <>
                                    {ownerViewComp}
                                </>
                                :
                                <>
                                    {bidderViewComp}
                                </>
                            }
                        </Box>
                        <Box flex={5} sx={{backgroundColor: 'orange'}}>
                            <Gallery
                                item = {item}
                            />
                            {/*Gallery goes here*/}
                        </Box>
                    </Box>
                    <Box>
                        {/*<DisplayFields
                            item = {item}
                        />*/}
                        DisplayFields goes here
                    </Box>
                </>
            }
        </Box>
    )
}
