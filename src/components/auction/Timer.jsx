import React, { useEffect, useRef, useState, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import {selectTheme} from '../../assets/scripts/theme'

// Styled component for finished auction text
const FinishedText = styled(Typography)(({ theme }) => ({
    color: theme.palette.error
}))

function secondsToTime(secs) {
    let days = Math.floor(secs / (3600 * 24));
    let hours = Math.floor((secs % (3600 * 24)) / 3600);
    let minutes = Math.floor((secs % 3600) / 60);
    let seconds = Math.floor(secs % 60);

    return {
        d: days,
        h: hours,
        m: minutes,
        s: seconds,
    };
}

const Timer = ({ endTime }) => {
    const [seconds, setSeconds] = useState(0);
    const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const timerRef = useRef(null);
    const [theme, _] = React.useState(selectTheme())

    // Set initial time left on mount or when endTime changes
    useEffect(() => {
        const setOriginalTime = () => {
            let t1 = new Date(endTime);
            let now = new Date().getTime();
            let diff = t1.getTime() - now;
            let secs = Math.max(0, Math.floor(diff / 1000));
            setSeconds(secs);
            setTime(secondsToTime(secs));
        };

        setOriginalTime();

        return () => {
            // Cleanup interval when endTime changes or unmounts
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [endTime]);

    // Start and update timer
    useEffect(() => {
        if (seconds > 0 && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setSeconds((prevSecs) => {
                    if (prevSecs <= 1) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                        return 0;
                    }
                    return prevSecs - 1;
                });
            }, 1000);
        }
        // On cleanup, clear interval
        return () => {
            if (timerRef.current && seconds === 0) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [seconds]);

    // Update time object when seconds changes
    useEffect(() => {
        setTime(secondsToTime(seconds));
    }, [seconds]);

    // Display logic as a function
    const displayTimer = useCallback(() => {
        const now = new Date().getTime();
        if (endTime && new Date(endTime).getTime() < now) {
            return (
                <FinishedText theme={theme} variant="h5">
                    <span>Auction finished!<br /></span>
                </FinishedText>
            );
        }

        if (time.d > 1) {
            return (
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{time.d}d {time.h}h<br /></span>
                </Typography>
            );
        } else if (time.d === 1) {
            return (
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{time.d}d {time.h}h {time.m}m<br /></span>
                </Typography>
            );
        } else if (time.d === 0) {
            return (
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{time.h}h {time.m}m {time.s}s<br /></span>
                </Typography>
            );
        } else if (time.d === 0 && time.h === 0) {
            return (
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{time.m}m {time.s}s<br /></span>
                </Typography>
            );
        }
        return null;
    }, [endTime, time]);

    return <>{displayTimer()}</>;
};

export default Timer;