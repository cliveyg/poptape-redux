import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import BidViewer from '../auction/BidViewer'
import AuctionCard from '../auction/AuctionCard'
import InformationBox from '../auction/InformationBox'
import SellerInfoCard from '../helpers/SellerInfoCard'
//import request from 'superagent'
//import {numberWithCommas} from '../../assets/scripts/general'

const BidderBox = styled('div')({
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'greenyellow'
})

const BidderView = ({ item, auction, currentLot }) => {
    const [currentBestBid, setCurrentBestBid] = useState(null)
    const [allBids, setAllBids] = useState([])
    const [websocket, setWebsocket] = useState(null)
    const [bidViewerComp, setBidViewerComp] = useState(null)

    console.log("In BidderView and item is ["+JSON.stringify(item)+"]")

    useEffect(() => {
        if (currentLot) {
            getBidDataFromAuctionHouse(currentLot.lot_id)
        }
    }, [currentLot])

    useEffect(() => {
        const accessToken = Cookies.get('access-token')
        console.log("In BidderView - useEffect [item]")
        if (accessToken && item) {
            const uuidData = { uuid: item.item_id }
            const meep = JSON.stringify(uuidData)
            console.log("in post to viewed list and uuidData is ["+meep+"]")
            /*
            request
                .post('/list/viewed')
                .send(JSON.stringify(uuidData))
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('x-access-token', accessToken)
                .then(() => {
                    console.log('Item added to recently viewed');
                })
                .catch((err) => {
                    console.log(err);
                });

             */
        }
    }, [item])

    const gotBid = (bid) => {
        if (!websocket) {
            createWebsocket(bid)
        } else if (websocket.readyState === WebSocket.CLOSED) {
            createWebsocket(bid)
        } else {
            websocket.send(
                JSON.stringify({
                    'x-access-token': Cookies.get('access-token'),
                    username: Cookies.get('username'),
                    lot_id: currentLot.lot_id,
                    bid_amount: bid.toString(),
                })
            );
        }
    };

    const createWebsocket = (bid) => {
        const wsHost = `wss://poptape.local/auction/bid/${auction.auction_id}/${currentLot.lot_id}`
        const ws = new WebSocket(wsHost, 'json')

        ws.onopen = () => {
            ws.send(
                JSON.stringify({
                    'x-access-token': Cookies.get('access-token'),
                    username: Cookies.get('username'),
                    lot_id: currentLot.lot_id,
                    bid_amount: bid.toString(),
                })
            )
            getBidDataFromAuctionHouse(currentLot.lot_id)
        }

        ws.onmessage = (evt) => {
            const message = JSON.parse(evt.data)
            updateBidsFromMessage(message)
        }

        ws.onerror = (evt) => {
            console.log('Something went wrong!', evt)
        }

        ws.onclose = () => {
            getBidDataFromAuctionHouse(currentLot.lot_id)
        }

        setWebsocket(ws)
    }

    const updateBidsFromMessage = (messageData) => {
        if (messageData.bid_id) {
            if (!allBids.some((bid) => bid.bid_id === messageData.bid_id)) {
                const updatedBids = [messageData, ...allBids]
                setAllBids(updatedBids)
                updateBidData(updatedBids)
            }
        }
    }

    const getBidDataFromAuctionHouse = (lot_id) => {
        console.log("In getBidDataFromAuctionHouse")
        const auctionhouseURL = `/auctionhouse/auction/lot/${lot_id}/`
        console.log(`auctionhouseURL is [${auctionhouseURL}]`)
        /*
        request
            .get(auctionhouseURL)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .then((res) => {
                setAllBids(res.body.bids);
                updateBidData(res.body.bids);
            })
            .catch((err) => {
                console.log(err);
            });

         */
    }

    const updateBidData = (bids) => {
        for (const bid of bids) {
            if (!currentBestBid && (bid.bid_status === 'winning' || bid.bid_status === 'none')) {
                setCurrentBestBid(bid)
                setBidViewer(bid, bids)
            } else if (
                currentBestBid &&
                bid.bid_status === 'winning' &&
                bid.bid_id !== currentBestBid.bid_id &&
                parseFloat(bid.bid_amount) > parseFloat(currentBestBid.bid_amount
                )) {
                bid.bid_amount = parseFloat(bid.bid_amount).toFixed(2)
                setCurrentBestBid(bid)
                setBidViewer(bid, bids)
            }
        }
        setBidViewer(bids)
    }

    const setBidViewer = (currentBid, bids) => {
        const bidViewer = (
            <BidViewer
                currentBestBid={currentBid}
                allBids={bids}
            />
        )
        setBidViewerComp(bidViewer)
    }

    const calculateMinimumBid = () => {
        if (currentLot) {
            let miniChange = 0
            if (currentLot.min_increment) {
                miniChange = parseFloat(currentLot.min_increment)
            } else if (currentLot.min_decrement) {
                miniChange = -parseFloat(currentLot.min_decrement)
            }
            if (currentBestBid) {
                return parseFloat(currentBestBid.bid_amount) + miniChange
            } else if (currentLot.start_price) {
                return parseFloat(currentLot.start_price) + miniChange
            } else {
                return 0
            }
        }
    }

    return (
        <BidderBox>
            <Box display="flex" flexDirection="row">
                <Box flex={1}>
                    <InformationBox
                        currentLot={currentLot}
                        auction={auction}
                        item={item}
                        currentBestBid={currentBestBid}
                    />
                </Box>
                <Box flex={1}>
                    <AuctionCard
                        gotBid={gotBid}
                        minBid={calculateMinimumBid()}
                        //itemId={item.item_id}
                    />
                </Box>
            </Box>
            <Box>
                <SellerInfoCard
                    //publicId={item.public_id}
                    auction={auction}
                    itemLocation='Derby'
                    //publicId={auction.public_id}
                    //auction={auction}
                    //itemLocation={item.location}
                />
            </Box>
            <Box>
                {bidViewerComp}
                <br />
            </Box>
        </BidderBox>
    )
}

export default BidderView
