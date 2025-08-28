import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'
import Link from '@mui/material/Link'
import superagent from 'superagent'
import {useTranslation} from 'react-i18next'

const MetaViewer = () => {

    const { t } = useTranslation()
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
                console.log(res.body)
                setRating(res.body.scores.meta_average)
                setReviewsOf(res.body.total_reviews_of_user)
                setReviewsBy(res.body.total_reviews_by_user)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (
        <Box sx={{p: 2}}>
                <Typography variant="h4">
                    {rating > 0 ?
                        <>{rating}% <span style={{ fontSize: '0.6em' }}> {t('reviews:rating')}</span></>
                    :
                        <span style={{ fontSize: '0.6em' }}>{t('reviews:no_rating')}</span>
                    }
                </Typography>
                <br />
                <Typography variant="subtitle1">
                    {reviewsOf} {t('reviews:reviews_of_you')}<br />
                    {reviewsBy} {t('reviews:reviews_by_you')}<br />
                    <Box sx={{ mt: 1 }}>
                        <Link
                            component={RouterLink}
                            to={reviewsURL}
                        >
                            {t('reviews:go_to_reviews')} &gt;&gt;
                        </Link>
                    </Box>
                </Typography>
        </Box>
    )
}

export default MetaViewer