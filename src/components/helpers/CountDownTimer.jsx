import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useRef, useState } from 'react'

// Responsive size/thickness logic
function useProgressSize() {
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up('sm'))
    const mdUp = useMediaQuery(theme.breakpoints.up('md'))
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'))
    if (lgUp) return { size: 300, thickness: 14 }
    if (mdUp) return { size: 120, thickness: 12 }
    return { size: 80, thickness: 10 }
}

const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: 'auto',
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}))

const ProgressWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
}))

const CountdownText = styled(Typography)(({ ctfont, theme }) => ({
    fontWeight: 'bold',
    marginTop: '1em',
    fontFamily: ctfont,
    letterSpacing: '0.05em',
    [theme.breakpoints.up("xs")]: {
        fontSize: "1.20rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.50rem",
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: "3.50rem",
    }
}))

const NoFillCircularProgress = styled(CircularProgress)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    transition: 'color 2s',
    '& .MuiCircularProgress-circle': {
        fill: 'none !important',
        transition: 'none !important',
    },
    '& .MuiCircularProgress-svg': {
        background: 'none !important',
        transition: 'none !important',
    },
}))

const NoFillStaticTrack = styled(CircularProgress)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    transition: 'none !important',
    color: theme.palette.timer.background || '#fff',
    opacity: 1,
    '& .MuiCircularProgress-circle': {
        fill: 'none !important',
        transition: 'none !important',
    },
    '& .MuiCircularProgress-svg': {
        background: 'none !important',
        transition: 'none !important',
    },
}))

function formatCountdown(remainingMs) {
    const totalSeconds = Math.floor(remainingMs / 1000)
    const tenths = Math.floor((remainingMs % 1000) / 100)
    const seconds = totalSeconds % 60
    const totalMinutes = Math.floor(totalSeconds / 60)
    const minutes = totalMinutes % 60
    const totalHours = Math.floor(totalMinutes / 60)
    const hours = totalHours % 24
    const days = Math.floor(totalHours / 24)

    const showDays = days > 0
    const showHours = showDays || totalMinutes > 60

    let text = ''

    if (showDays) {
        if (days === 1) {
            text += `${days} day, `
        } else {
            text += `${days} days, `
        }
    }

    if (showHours) {
        text += `${hours.toString().padStart(2, '0')}h:`
    }

    text += `${minutes.toString().padStart(2, '0')}m:`
    text += `${seconds.toString().padStart(2, '0')}`
    text += `.${tenths}s`

    return text
}

const CountDownTimer = (props) => {
    const { duration, colors = [], colorValues = [], infont, onComplete } = props
    const theme = useTheme()
    const { size, thickness } = useProgressSize()

    const [countdownText, setCountdownText] = useState()
    const [countdownPercentage, setCountdownPercentage] = useState(100)
    const [animatedColor, setAnimatedColor] = useState(theme.palette.success.main)
    const [timerFont, setTimerFont] = useState(infont || 'Courier')
    const completeRef = useRef(false)

    useEffect(() => {
        let startTime = Date.now()
        let endTime = startTime + duration * 1000
        let animationFrameId

        const updateCountdown = () => {
            const now = Date.now()
            const remainingMs = Math.max(0, endTime - now)
            const totalMs = duration * 1000
            const percentage = Math.max(0, (remainingMs / totalMs) * 100)
            setCountdownPercentage(percentage)

            setCountdownText(
                remainingMs > 0
                    ? formatCountdown(remainingMs)
                    : formatCountdown(0)
            )

            if (percentage > 50) {
                setAnimatedColor(theme.palette.success.main)
            } else if (percentage > 25) {
                setAnimatedColor(theme.palette.warning.main)
            } else {
                setAnimatedColor(theme.palette.error.main)
            }

            if (!completeRef.current && remainingMs <= 0) {
                completeRef.current = true
                setCountdownPercentage(0)
                setAnimatedColor(theme.palette.error.main)
                setCountdownText(formatCountdown(0))
                if (onComplete) onComplete()
                return
            }

            animationFrameId = requestAnimationFrame(updateCountdown)
        }

        completeRef.current = false
        animationFrameId = requestAnimationFrame(updateCountdown)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [duration, onComplete, theme])

    return (
        <Container>
            <ProgressWrapper
                style={{
                    width: `${size}px`,
                    height: `${size}px`
                }}
            >
                <NoFillStaticTrack
                    variant="determinate"
                    size={size}
                    thickness={thickness}
                    value={100}
                />
                <NoFillCircularProgress
                    variant="determinate"
                    size={size}
                    thickness={thickness}
                    value={countdownPercentage}
                    style={{
                        color: animatedColor
                    }}
                />
            </ProgressWrapper>
            <Box sx={{position: 'relative', bottom: {xs: '70px', sm: '70px', md: '100px', lg: '240px'}, zIndex: 100}}>
                <CountdownText ctfont={timerFont}>{countdownText}</CountdownText>
            </Box>
        </Container>
    )
}

export default CountDownTimer