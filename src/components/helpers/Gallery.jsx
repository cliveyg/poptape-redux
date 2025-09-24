import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import nophoto from '../../assets/images/no-photo-icon-faded.png'

const StyledCard = styled(Card)({
    margin: 5,
    minWidth: 275,
    minHeight: 200
})

const Gallery = ({ item }) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        let meImages = []
        if (item.fotos && item.fotos.length > 0) {
            meImages = item.fotos.map(foto => ({
                original: foto.metadata.s3_url,
                thumbnail: foto.metadata.s3_url
            }))
        } else {
            meImages = [{ original: nophoto, thumbnail: nophoto }]
        }
        setImages(meImages)
        console.log("Images are ["+"]")
    }, [item])

    return (
        <StyledCard>
            <CardContent sx={{ marginBottom: 0, paddingBottom: 1 }}>
                <Box>
                    <ImageGallery
                        autoPlay={false}
                        items={images}
                        slideInterval={5000}
                    />
                </Box>
            </CardContent>
        </StyledCard>
    )
}

export default Gallery