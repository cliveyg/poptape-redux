import React, { useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import InfoIcon from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Icon from '@mui/material/Icon'
import Tooltip from '@mui/material/Tooltip'
import { Link } from 'react-router'
import { styled } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import Timer from './Timer'
import {numberWithCommas} from '../../assets/scripts/general'

// ------------------------------------------
// Styled components
// ------------------------------------------

const Purp = styled("span")({
    color: "#9c27b0",
});

const Orange = styled("span")({
    color: "#ff8f00",
});

const Red = styled("span")({
    color: "#c9171f",
});

const Green = styled("span")({
    color: "#349433",
});

const StyledCard = styled(Card)({
    marginBottom: 5,
    marginRight: 5,
    marginTop: 10,
    marginLeft: 10,
    minWidth: 200,
    height: 220,
});

const InfoIconButton = styled(IconButton)({
    color: "#9cd0ee",
    fontSize: "0.8em",
});

const IconLink = styled(Link)({
    color: "#9cd0ee",
    textDecoration: "none",
    "&:visited": {
        color: "#9cd0ee",
    },
});

const DisplayPrice = styled(Typography)({
    marginTop: "9px",
});

const AuctionType = styled("span")({
    fontSize: "1.2em",
});

const Watching = styled("div")({
    display: "inline-flex",
    verticalAlign: "middle",
    lineHeight: "1.6em",
    color: "#1976d2",
    fontSize: "0.8em",
});

const WatchingBlurb = styled("span")({
    marginLeft: 5,
});

const Linky = styled(Link)({
    color: blue[700],
    textDecoration: "none",
    "&:visited": {
        color: blue[700],
    },
});

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    "& .MuiTooltip-tooltip": {
        fontSize: "0.7em",
        backgroundColor: "#9cd0ee",
        color: "black",
    },
});

// ------------------------------------------
// Main functional component
// ------------------------------------------
const InformationBox = ({
                            item = null,
                            auction = null,
                            currentLot = null,
                            currentBestBid = null,
                            peopleWatching = 0,
                        }) => {
    // Auction type & text
    const { auctionType, auctionTypeText } = useMemo(() => {
        let auctionType = null;
        let auctionTypeText = null;
        if (!auction) return { auctionType, auctionTypeText };
        switch (auction.type) {
            case "EN":
                auctionType = "English auction";
                auctionTypeText =
                    "An English auction is an open, transparent ascending dynamic auction. Click on the icon to go to our help page for more information.";
                break;
            case "DU":
                auctionType = "Dutch auction";
                auctionTypeText = "Pass the duchy";
                break;
            case "BN":
                auctionType = "Buy now";
                auctionTypeText = "Buy, buy, buy, buy!";
                break;
            default:
                auctionType = null;
                auctionTypeText = null;
        }
        return { auctionType, auctionTypeText };
    }, [auction]);

    // Timer
    const timerComponent = useMemo(() => {
        if (!currentLot?.end_time) return null;
        return <Timer endTime={currentLot.end_time} />;
    }, [currentLot]);

    // Display price
    let displayPrice = null;
    if (currentBestBid) {
        //displayPrice = numberWithCommas(currentBestBid.bid_amount);
        displayPrice = numberWithCommas(1000)
    } else if (currentLot?.start_price) {
        //displayPrice = numberWithCommas(currentLot.start_price);
        displayPrice = numberWithCommas(2300);
    }

    // Reserve message
    let reserveMessage = null;
    if (currentLot?.reserve_price && currentBestBid) {
        reserveMessage = currentBestBid.reserve_message;
    }

    return (
        <div>
            <StyledCard>
                <CardContent>
                    <Typography variant="h5">
                        <AuctionType>{auctionType}</AuctionType>
                        {auctionTypeText && (
                            <InfoIconButton aria-label="Info about auction type">
                                <IconLink to="/auction/help">
                                    <CustomTooltip title={auctionTypeText}>
                                        <InfoIcon fontSize="inherit" />
                                    </CustomTooltip>
                                </IconLink>
                            </InfoIconButton>
                        )}
                        <br />
                    </Typography>
                    {timerComponent}
                    {displayPrice ? (
                        <DisplayPrice variant="h3">£{displayPrice}</DisplayPrice>
                    ) : (
                        <DisplayPrice variant="h5">
                            <Orange>No starting price!</Orange>
                            <br />
                        </DisplayPrice>
                    )}
                    {!reserveMessage ? (
                        <Typography variant="h5">
                            <Red>No reserve!</Red>
                            <br />
                        </Typography>
                    ) : null}
                    {reserveMessage === "Reserve met" ? (
                        <Typography variant="h5">
                            <Green>{reserveMessage}</Green>
                            <br />
                        </Typography>
                    ) : null}
                    {reserveMessage === "Reserve not met" ? (
                        <Typography variant="h5">
                            <Orange>{reserveMessage}</Orange>
                            <br />
                        </Typography>
                    ) : null}
                    {reserveMessage === "Reee" ? (
                        <Typography variant="subtitle1">
                            <Purp>{reserveMessage}</Purp>
                            <br />
                        </Typography>
                    ) : null}
                    <Watching color="primary">
                        <Icon>
                            <VisibilityIcon />
                        </Icon>
                        <WatchingBlurb>
                            {" "}
                            {peopleWatching} people watching
                            <br />
                        </WatchingBlurb>
                    </Watching>
                </CardContent>
            </StyledCard>
        </div>
    );
};

export default InformationBox;