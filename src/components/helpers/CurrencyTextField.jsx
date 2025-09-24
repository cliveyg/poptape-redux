import React, { useRef, useEffect } from 'react'
import AutoNumeric from 'autonumeric'
import TextField from '@mui/material/TextField'

const CurrencyTextField = ({
                               value,
                               outputFormat = 'number',
                               preDefined,
                               currencySymbol,
                               onChange,
                               onBlur,
                               onFocus,
                               //digitGroupSeparator,
                               ...others
                           }) => {
    const inputRef = useRef(null)
    const autoNumericRef = useRef(null)
    const lastValueRef = useRef(value)

    // initialize AutoNumeric once
    useEffect(() => {
        if (!inputRef.current) return;
        const autoNumericOptions = {
            ...preDefined,
            ...others,
            currencySymbol,
            watchExternalChanges: false,
        };
        autoNumericRef.current = new AutoNumeric(inputRef.current, value ?? '', autoNumericOptions);

        return () => {
            if (autoNumericRef.current) {
                autoNumericRef.current.remove()
            }
        }
    }, [])

    // update value if changed from outside
    useEffect(() => {
        if (
            autoNumericRef.current &&
            value !== undefined &&
            value !== lastValueRef.current
        ) {
            autoNumericRef.current.set(value)
            lastValueRef.current = value
        }
    }, [value])

    // helper for parsed value
    const getValue = () => {
        if (!autoNumericRef.current) return undefined
        if (outputFormat === 'string') return autoNumericRef.current.getNumericString()
        return autoNumericRef.current.getNumber()
    }

    // handlers
    const handleChange = (event) => {
        if (onChange) {
            onChange(event, getValue())
        }
        lastValueRef.current = getValue()
    }
    const handleBlur = (event) => onBlur && onBlur(event, getValue())
    const handleFocus = (event) => onFocus && onFocus(event, getValue())

    return (
        <TextField
            {...others}
            inputRef={inputRef}
            // Do not set value (uncontrolled)
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
        />
    )
}

export default CurrencyTextField;