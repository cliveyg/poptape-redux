import React, { useState, useEffect } from "react"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

function formatCurrency(value, decimalSeparator, thousandSeparator, precision) {
    if (value === "" || value === null || value === undefined) return ""
    let strValue = String(value)
        .replace(new RegExp(`[^\\d${decimalSeparator}]`, "g"), "")
        .replace(decimalSeparator, ".")
    let num = parseFloat(strValue)

    if (isNaN(num)) return ""

    let parts = num
        .toFixed(precision)
        .split(".")

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

    return parts.join(decimalSeparator)
}

function clampDecimalPlaces(str, precision) {
    // Accepts a string like "123.4567" and returns "123.45" (precision=2)
    const parts = str.split(".")
    if (parts.length === 2) {
        return parts[0] + "." + parts[1].slice(0, precision)
    }
    return str
}

export default function CurrencyField({
                                          value,
                                          onChange,
                                          name,
                                          label,
                                          required,
                                          currencySymbol = "£",
                                          decimalSeparator = ".",
                                          thousandSeparator = ",",
                                          precision = 2,
                                          ...rest
                                      }) {
    const [internalValue, setInternalValue] = useState(value !== undefined ? String(value) : "")

    useEffect(() => {
        if (value !== undefined && value !== internalValue) {
            setInternalValue(String(value))
        }
    }, [value])

    const handleChange = (e) => {
        const raw = e.target.value
        setInternalValue(raw)
        let parsed = raw
            .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
            .replace(decimalSeparator, ".")
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1")
        // Clamp to desired decimal places
        parsed = clampDecimalPlaces(parsed, precision)
        if (onChange) {
            onChange(name, parsed)
        }
    }

    const handleBlur = (e) => {
        let raw = e.target.value
        let parsed = raw
            .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
            .replace(decimalSeparator, ".")
            .replace(/[^0-9.]/g, "")
        // Clamp to desired decimal places
        parsed = clampDecimalPlaces(parsed, precision)
        let num = parseFloat(parsed)
        let formatted =
            !isNaN(num)
                ? formatCurrency(num, decimalSeparator, thousandSeparator, precision)
                : ""
        setInternalValue(formatted)
        // Optionally: pass the clamped value up again
        if (onChange && !isNaN(num)) {
            onChange(name, num.toFixed(precision))
        }
    }

    return (
        <TextField
            {...rest}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            name={name}
            label={label}
            InputProps={{
                startAdornment: currencySymbol ? (
                    <InputAdornment position="start">{currencySymbol}</InputAdornment>
                ) : undefined,
                ...rest.InputProps,
            }}
        />
    )
}