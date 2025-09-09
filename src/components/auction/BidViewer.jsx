import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { blue } from '@mui/material/colors'
//import AvatarChooser from '../helpers/AvatarChooser'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
//import superagent from 'superagent'
import {useGlobalSettings} from '../helpers/GlobalSettings'

const StyledCard = styled(Card)(({ theme }) => ({
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    minWidth: 275,
    minHeight: 260,
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: '1.0em',
}));

const ProgressContainer = styled('div')({
    verticalAlign: 'middle',
    textAlign: 'center',
});

const UsernameContainer = styled('div')({
    display: 'flex',
    flexFlow: 'row',
});

const Avatar = styled('div')({
    order: 1,
    flex: 1,
    maxWidth: 30,
    verticalAlign: 'middle',
    height: '100%',
});

const UserDetails = styled('div')({
    order: 2,
    flex: 1,
    align: 'left',
    verticalAlign: 'middle',
    height: '100%',
});

const Amount = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
}));

const TableHeadCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
}));

const BidViewer = ({ viewerSize = 'small', currentBestBid = null, allBids = [] }) => {
    const [showCard, setShowCard] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setDataLoaded(true);
        setShowCard(true);
    }, []);

    const numberForDisplay = (n) => {
        return '£' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const { profileIcon, setProfileIcon, profileImageString, setProfileImageString } = useGlobalSettings()

    const showCurrentBest = () => {
        if (currentBestBid?.bid_status === 'none') {
            return 'No-one has bid successfully on this item yet';
        } else {
            return (
                currentBestBid.username +
                ' is currently winning with a bid of ' +
                numberForDisplay(currentBestBid.bid_amount)
            );
        }
    };

    const buildRows = () => {
        return allBids.map((bid) => {
            const bidIdA = bid.bid_id.split('-');
            const bidId = bidIdA[4];

            return (
                <TableRow key={bid.bid_id}>
                    <TableCell align="left">
                        <UsernameContainer>
                            AvatarGoesHere
                            <UserDetails>{bid.username}</UserDetails>
                        </UsernameContainer>
                    </TableCell>
                    <Amount align="left">{numberForDisplay(bid.bid_amount)}</Amount>
                    <TableCell align="left" component="th" scope="row">
                        {bid.message}
                    </TableCell>
                    <TableCell align="left">{bidId}</TableCell>
                    <TableCell align="left">{bid.bid_status}</TableCell>
                </TableRow>
            );
        });
    };

    return (
        <StyledCard>
            {showCard ? (
                <>
                    <CardContent>
                        {currentBestBid ? (
                            <Title color="textSecondary" gutterBottom>
                                Bidding information<br />
                                <span style={{ color: blue[700], fontWeight: 'bold' }}>{showCurrentBest()}</span>
                            </Title>
                        ) : (
                            <Title color="textSecondary" gutterBottom>
                                Bidding information<br />
                                <span style={{ color: '#b0bec5', fontWeight: 'bold' }}>No-one is currently winning this lot</span>
                            </Title>
                        )}
                        <div>
                            {viewerSize === 'large' ? (
                                <div style={{ overflow: 'auto', height: '300px' }}>
                                    <Table stickyHeader size="small" aria-label="bid table">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeadCell>Bidder</TableHeadCell>
                                                <TableHeadCell align="left">Bid</TableHeadCell>
                                                <TableHeadCell align="left">Message</TableHeadCell>
                                                <TableHeadCell align="left">ID</TableHeadCell>
                                                <TableHeadCell align="left">Status</TableHeadCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{buildRows()}</TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div style={{ overflow: 'auto', height: '165px' }}>
                                    <Table stickyHeader size="small" aria-label="bid table">
                                        <TableHead>
                                            <TableRow>
                                                <TableHeadCell>Bidder</TableHeadCell>
                                                <TableHeadCell align="left">Bid</TableHeadCell>
                                                <TableHeadCell align="left">Message</TableHeadCell>
                                                <TableHeadCell align="left">ID</TableHeadCell>
                                                <TableHeadCell align="left">Status</TableHeadCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{buildRows()}</TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </>
            ) : (
                <>
                    <CardContent>
                        <Title color="textSecondary" gutterBottom>
                            Bidding information
                        </Title>
                        <ProgressContainer>
                            <br />
                            <CircularProgress />
                        </ProgressContainer>
                    </CardContent>
                </>
            )}
        </StyledCard>
    );
};

export default BidViewer;
