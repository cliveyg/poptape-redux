import React, { useEffect, useState, useCallback } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import CircularProgress from '@mui/material/CircularProgress'
import { blue } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Cookies from 'js-cookie'
import CustomSnackbar from '../information/CustomSnackbar'
import { styled } from '@mui/material/styles'
import superagent from 'superagent'

// ------------------------------
// Styled components
// ------------------------------
const StyledCard = styled(Card)({
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    minWidth: 275,
});
const PaddingBeLess = styled(CardContent)({
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingTop: 0
});
const Title = styled(Typography)({
    fontSize: "1.0em",
});
const Linky = styled("a")({
    color: blue[700],
    textDecoration: "none",
    "&:visited": {
        color: blue[700],
    },
});
const ProgressDiv = styled("div")({
    verticalAlign: "middle",
    textAlign: "center",
});
const Username = styled(Typography)({
    fontSize: "1.2em",
});
const SmallButts = styled(Button)({
    textTransform: "none",
    marginRight: 0
});
const PayDetails = styled(Typography)({
    fontSize: "0.75em",
    textAlign: "top",
});

// ------------------------------
// Main functional component
// ------------------------------
const SellerInfoCard = ({ publicId, auction, itemLocation }) => {
    const [showCard, setShowCard] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [date, setDate] = useState(new Date().getTime());
    const [peckish] = useState({
        variant: "info",
        message: "You must be logged in to save a favourite"
    });
    const [duration] = useState(1400);
    const [reviews, setReviews] = useState(0);
    const [favChecked, setFavChecked] = useState(false);
    const [favText, setFavText] = useState("Save this seller");
    const [username, setUsername] = useState(null);
    const [loaded, setLoaded] = useState(false);

    // Load seller info and reviews
    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            try {
                const res1 = await superagent
                    .get("/authy/username/" + publicId)
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json");
                if (!isMounted) return;
                setUsername(res1.body.username);

                const res2 = await superagent
                    .get("/reviews/of/user/" + publicId + "?totalonly=true")
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json");
                if (!isMounted) return;
                setReviews(res2.body.total_reviews);

                await callFavourites(isMounted);

                setLoaded(true);
                setShowCard(true);
            } catch (err) {
                // handle errors
                console.log(err);
            }
        }
        fetchData();
        return () => { isMounted = false; };
        // eslint-disable-next-line
    }, [publicId]);

    // Check if seller is a favourite
    const callFavourites = async (isMounted = true) => {
        const accessToken = Cookies.get("access-token");
        if (accessToken) {
            try {
                const res = await superagent
                    .get("/list/favourites")
                    .set("Accept", "application/json")
                    .set("Content-Type", "application/json")
                    .set("x-access-token", accessToken);
                if (!isMounted) return;
                const favArray = res.body.favourites;
                if (favArray.some(fav => fav === publicId)) {
                    setFavChecked(true);
                    setFavText("Favourite seller!");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Change favourite
    const favChange = async () => {
        const accessToken = Cookies.get("access-token");
        const uuidData = { uuid: publicId };
        if (accessToken) {
            try {
                if (favChecked) {
                    await superagent
                        .delete("/list/favourites")
                        .send(JSON.stringify(uuidData))
                        .set("Accept", "application/json")
                        .set("Content-Type", "application/json")
                        .set("x-access-token", accessToken);
                    setFavChecked(false);
                    setFavText("Save this seller");
                } else {
                    await superagent
                        .post("/list/favourites")
                        .send(JSON.stringify(uuidData))
                        .set("Accept", "application/json")
                        .set("Content-Type", "application/json")
                        .set("x-access-token", accessToken);
                    setFavChecked(true);
                    setFavText("Favourite seller!");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            openSnack();
        }
    };

    // Snackbar logic
    const openSnack = () => {
        if (showSnack) {
            setShowSnack(false);
            setTimeout(() => setShowSnack(true), 0);
        } else {
            setShowSnack(true);
        }
        setDate(new Date().getTime());
    };

    // Delivery options calculation
    const getDeliveryOptions = useCallback(() => {
        if (!auction) return "";
        const delOpts = auction.delivery_options || {};
        if (delOpts.collection && !delOpts.delivery && !delOpts.postage) {
            return "Collection only";
        } else if (!delOpts.collection && delOpts.delivery && delOpts.postage) {
            return "Courier or post";
        } else if (!delOpts.collection && delOpts.delivery && !delOpts.postage) {
            return "Courier only";
        } else if (!delOpts.collection && !delOpts.delivery && delOpts.postage) {
            return "Post only";
        } else {
            return "Contact seller for delivery options";
        }
    }, [auction]);

    // Payment options calculation
    const getPaymentOptions = useCallback(() => {
        if (!auction) return "";
        const payArray = Object.entries(auction.payment_options || {});
        let displayString = '';
        for (const [paytype, value] of payArray) {
            if (value === true) {
                switch (paytype) {
                    case "cash":
                        displayString = "Cash, " + displayString;
                        break;
                    case "cheque":
                        displayString = "Cheque, " + displayString;
                        break;
                    case "bank_transfer":
                        displayString = "Bank transfer, " + displayString;
                        break;
                    case "paypal":
                        displayString = "Paypal, " + displayString;
                        break;
                    case "venmo":
                        displayString = "Venmo, " + displayString;
                        break;
                    case "visa":
                        displayString = "Visa, " + displayString;
                        break;
                    case "mastercard":
                        displayString = "Mastercard, " + displayString;
                        break;
                    case "amex":
                        displayString = "Amex, " + displayString;
                        break;
                    case "bitcoin":
                        displayString = "Bitcoin, " + displayString;
                        break;
                    default:
                        break;
                }
            }
        }
        // remove trailing comma and whitespace
        displayString = displayString.replace(/, $/, "");
        return displayString;
    }, [auction]);

    return (
        <StyledCard>
            {showCard ? (
                <>
                    <PaddingBeLess>
                        <Title color="textSecondary" gutterBottom>
                            Seller information
                        </Title>
                        <Box display="flex" flexDirection="row">
                            <Box flex={2} alignItems="flex-start">
                                Avatar Here
                            </Box>
                            <Box flex={6} alignItems="flex-start">
                                <Username variant="h5">
                                    {username}<br />
                                </Username>
                                <Typography variant="subtitle1" sx={{ marginBottom: 0, paddingBottom: 0 }}>
                                    {reviews === 1 ? (
                                        <>
                                            <Linky href="#ss">{reviews} review</Linky><br />
                                        </>
                                    ) : (
                                        <>
                                            <Linky href="#ss">{reviews} reviews</Linky><br />
                                        </>
                                    )}
                                    <Linky href="#de">98% rating</Linky>
                                </Typography>
                            </Box>
                            <Box flex={6} sx={{ backgroundColor: "white" }} alignItems="flex-start">
                                <Box display="flex" flexDirection="column">
                                    <Box flex={1}>
                                        <SmallButts
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        >
                                            Contact
                                        </SmallButts>
                                    </Box>
                                    <Box flex={1}>
                                        <SmallButts
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                            sx={{ marginTop: 1 }}
                                        >
                                            See other items
                                        </SmallButts>
                                    </Box>
                                    <Box flex={1}>
                                        <FormControlLabel
                                            sx={{ fontSize: "0.8em" }}
                                            control={
                                                <Checkbox
                                                    icon={<FavoriteBorder />}
                                                    checkedIcon={<Favorite />}
                                                    onChange={favChange}
                                                    checked={favChecked}
                                                    value={publicId}
                                                />
                                            }
                                            label={favText}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex={7}>
                                <PayDetails>
                                    <b>Item location:</b> {itemLocation}<br />
                                    <b>{getDeliveryOptions()}</b><br />
                                    <b>Payment options:</b><br />
                                    {getPaymentOptions()}<br />
                                </PayDetails>
                            </Box>
                        </Box>
                    </PaddingBeLess>
                </>
            ) : (
                <>
                    <CardContent>
                        <Title color="textSecondary" gutterBottom>
                            Seller information
                        </Title>
                        <ProgressDiv>
                            <br /><CircularProgress />
                        </ProgressDiv>
                    </CardContent>
                </>
            )}
            {showSnack ? (
                <CustomSnackbar
                    duration={duration}
                    key_date={date}
                    variant={peckish.variant}
                    message={peckish.message}
                />
            ) : null}
        </StyledCard>
    );
};

export default SellerInfoCard;