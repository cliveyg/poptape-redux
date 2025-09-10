import React from 'react'
import { styled } from '@mui/material/styles'

const PreviewListContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center"
})

const Thumb = styled("div")({
    width: 120,
    height: 120,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative"
})

function PreviewList({ fileObjects }) {
    // Use the actual file objects, not a hardcoded test image
    return (
        <PreviewListContainer>
            {fileObjects.map((fileObject, i) => (
                <Thumb key={fileObject.file.name + fileObject.file.size + i}>
                    <img
                        src={fileObject.data}
                        alt={fileObject.file.name}
                        draggable={false}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                            background: "#fff",
                            display: "block"
                        }}
                    />
                </Thumb>
            ))}
        </PreviewListContainer>
    )
}

export default PreviewList