import React, { useState, useEffect } from 'react'
import { Card, CardContent, Button, Typography, Box } from '@mui/material'
import CurrencyTextField from '../helpers/CurrencyTextField'
//import CurrencyInput from 'react-currency-input-field'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CustomSnackbar from '../information/CustomSnackbar'
import Cookies from 'js-cookie'
import request from 'superagent'
import { styled } from '@mui/system'
import {numberWithCommas} from '../../assets/scripts/general'

const StyledCard = styled(Card)(({ theme }) => ({
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    minWidth: 275,
    height: 220,
}));

const FieldSurround = styled('div')(({ theme }) => ({
    borderRadius: '5px',
    //backgroundColor: theme.palette.primary.main,
    backgroundColor: '#fff',
    padding: '15px 35px',
    fontSize: '1.2em',
    textAlign: 'center',
}));

const BidButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginTop: 10,
    backgroundColor: theme.palette.error.main,
    marginBottom: 5,
    color: 'white',
    '&:hover': {
        backgroundColor: theme.palette.error.light,
    },
}));

const AuctionCard = (props) => {

    const [bidValue, setBidValue] = useState(0.00)
    const [showSnack, setShowSnack] = useState(false)
    const [watching, setWatching] = useState(false)
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || "GBP")
    const [locale, setLocale] = useState(localStorage.getItem('locale') || "en-GB")
    const minBid = props.minBid
    //const formattedMinBid = numberWithCommas(props.minBid);
    const formattedMinBid = numberWithCommas(8000)



    const peckish = {
        variant: 'warning',
        duration: 1900,
        message: 'Ooopsy!',
    }

    useEffect(() => {
        const accessToken = Cookies.get('access-token');
        if (accessToken) {
            console.log("In AuctionCard get watchlist")
            /*
            request
                .get('/list/watchlist')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('x-access-token', accessToken)
                .then((res) => {
                    const favArray = res.body.watchlist;
                    if (favArray.includes(props.itemId)) {
                        setWatching(true);
                    }
                })
                .catch((err) => console.log(err));

             */
        }
    }, [props.itemId]);

    const sendToWatchlist = (putOnList) => {
        const uuidData = { uuid: props.itemId }
        const method = putOnList ? 'post' : 'delete'
        console.log("In sendToWatchlist")
        /*
        request[method]('/list/watchlist')
            .send(JSON.stringify(uuidData))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', Cookies.get('access-token'))
            .then(() => {
                setWatching(putOnList)
            })
            .catch((err) => console.log(err))

         */
    }

    const onChange = (value) => {
        setBidValue(value)
        console.log("Value is ["+value+"]")
    };

    //const handleOnValueChange = (event, name) => {
    //    console.log(event)
    //    console.log(name)
    //}

    const openSnack = () => {
        setShowSnack((prev) => !prev);
        setTimeout(() => {
            setShowSnack(true);
        }, 500);
    };

    const onSubmit = () => {
        if (!Cookies.get('username')) {
            peckish.message = 'You must be logged in to bid';
            openSnack();
        } else if (bidValue < minBid) {
            peckish.message = "You can't bid less than the minimum";
            openSnack();
        } else {
            if (props.gotBid) props.gotBid(bidValue);
            setBidValue(0.00);
        }
    };

    return (
        <>
            <StyledCard>
                <CardContent>
                    <FieldSurround>
                        {/*
                        <CurrencyInput
                            name="input-name"
                            //defaultValue={bidValue}
                            value={bidValue}
                            decimalsLimit={2}
                            onValueChange={handleOnValueChange}
                            placeholder="Enter amount"
                            intlConfig={{ locale: locale, currency: currency }}
                            step={1}
                        />
                        */}
                        CurrTxtField
                        {/*
                        <CurrencyTextField
                            variant="outlined"
                            value={bidValue}
                            currencySymbol="£"
                            outputFormat="number"
                            //decimalCharacter="."
                            fullWidth
                            //digitGroupSeparator=","
                            //sx={{ fontSize: 25, borderRadius: 4, padding: 7, backgroundColor: "#ffffff" }}
                            onChange={(event, value) => onChange(value)}
                        />
                        */}

                    </FieldSurround>
                    <div>
                        <BidButton
                            variant="contained"
                            startIcon={<SentimentSatisfiedAltIcon />}
                            onClick={onSubmit}
                        >
                            Bid Now
                        </BidButton>
                    </div>
                    <Box style={{ marginTop: 5 }} display="flex" flexDirection="row">
                        <Box flex={2} style={{ paddingTop: 5 }}>
                            <Typography variant="body2" component="p">
                                Minimum bid is £{formattedMinBid}
                            </Typography>
                        </Box>
                        <Box flex={1} align="right">
                            {watching ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => sendToWatchlist(false)}
                                    sx={{
                                        color: 'primary.main',
                                        borderColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            color: 'white',
                                        },
                                    }}
                                    startIcon={<VisibilityIcon />}
                                >
                                    Watching
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => sendToWatchlist(true)}
                                    sx={{
                                        color: 'primary.main',
                                        borderColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            color: 'white',
                                        },
                                    }}
                                    startIcon={<VisibilityIcon />}
                                >
                                    Watch
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </StyledCard>
            {showSnack && (
                <CustomSnackbar
                    duration={peckish.duration}
                    key_date={new Date().getTime()}
                    variant={peckish.variant}
                    message={peckish.message}
                />
            )}
        </>
    );
};

export default AuctionCard;

