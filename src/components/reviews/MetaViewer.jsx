import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'
import Link from '@mui/material/Link'
import superagent from 'superagent'

const MetaViewer = () => {
    const [rating, setRating] = useState(0)
    const [reviewsBy, setReviewsBy] = useState(0)
    const [reviewsOf, setReviewsOf] = useState(0)
    const [reviewsURL, setReviewsURL] = useState('')

    useEffect(() => {
        console.log('Initialising MetaViewer')
        const url = `/reviews/user/${Cookies.get('public_id')}`
        setReviewsURL(`/user/${Cookies.get('username')}/reviews`)

        superagent
            .get(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((res) => {
                setRating(res.body.calculated_score)
                setReviewsOf(res.body.total_reviews_of)
                setReviewsBy(res.body.total_reviews_by)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <Box sx={{p: 2}}>
                <Typography variant="h4">
                    {rating}% <span style={{ fontSize: '0.6em' }}> rating</span>
                </Typography>
                <br />
                <Typography variant="subtitle1">
                    {reviewsOf} reviews of you. <br />
                    {reviewsBy} reviews by you. <br />
                    <Box sx={{ mt: 1 }}>
                        <Link
                            component={RouterLink}
                            to={reviewsURL}
                        >
                            Go to reviews &gt;&gt;
                        </Link>
                    </Box>
                </Typography>
        </Box>
    )
}

export default MetaViewer