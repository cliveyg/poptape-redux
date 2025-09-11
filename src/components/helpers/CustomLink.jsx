import React from 'react'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router'

export default function CustomLink({
                                    url,
                                    text,
                                    replace = false,
                                    colour
                                    }) {

    const navigate = useNavigate()

    let sx = {textDecoration: 'none', cursor: 'pointer'}
    if (colour) {
        sx = {color: colour, textDecoration: 'none', cursor: 'pointer'}
    }

    const handleClick = (event) => {
        // allow ctrl/cmd/shift/alt+click to open in new tab/window
        if (
            event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            event.shiftKey ||
            event.button !== 0 // not left click
        ) {
            return
        }
        event.preventDefault()
        if (replace) {
            navigate(url, {replace: true})
        } else {
            navigate(url)
        }
    }

    return (
        <Link
            href={url}
            onClick={handleClick}
            sx={sx}
        >
            {text}
        </Link>
    )
}