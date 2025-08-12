import React, { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'

const variantComponent = {
    standard: Input,
    filled: FilledInput,
    outlined: OutlinedInput
}

const StyledFormControl = styled(FormControl)({
    // Add any necessary root styles here if needed
})

const characterLimitStyle = {
    flex: 1,
    textAlign: "left",
    margin: "5px 15px 0 0"
}

const fancyCount = str => {
    str = str ? str.toString(16) : ""
    const joiner = "\u{200D}"
    const split = str.split(joiner)
    let count = 0
    for (const s of split) {
        const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length
        count += num
    }
    return count / split.length
}

const MaxTextField = React.forwardRef(function MaxTextField(props, ref) {
    const {
        characterLimit,
        autoComplete,
        autoFocus,
        children,
        className: classNameProp,
        defaultValue,
        error,
        FormHelperTextProps,
        fullWidth,
        helperText,
        id,
        InputLabelProps,
        inputProps,
        InputProps,
        inputRef,
        label,
        multiline,
        name,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        required = false,
        rows,
        rowsmax,
        select = false,
        SelectProps,
        type,
        value,
        variant = "standard",
        ...other
    } = props

    const [labelWidth, setLabelWidth] = useState(0)
    const labelRef = useRef(null)
    useEffect(() => {
        if (variant === "outlined" && labelRef.current) {
            const labelNode = labelRef.current
            setLabelWidth(labelNode.offsetWidth || 0)
        }
    }, [variant, required])

    const InputMore = {}
    if (variant === "outlined") {
        if (InputLabelProps && typeof InputLabelProps.shrink !== "undefined") {
            InputMore.notched = InputLabelProps.shrink
        }
        InputMore.labelWidth = labelWidth
    }

    const helperTextId = helperText && id ? `${id}-helper-text` : undefined
    const helperTextCounterId =
        characterLimit && id ? `${id}-helper-text-counter` : undefined
    const InputComponent = variantComponent[variant]
    const InputElement = (
        <InputComponent
            aria-describedby={helperTextId}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            fullWidth={fullWidth}
            multiline={multiline}
            name={name}
            rows={rows}
            rowsmax={rowsmax}
            type={type}
            value={value}
            id={id}
            inputRef={inputRef}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            inputProps={inputProps}
            {...InputMore}
            {...InputProps}
        />
    )

    return (
        <StyledFormControl
            className={clsx(classNameProp)}
            error={error}
            fullWidth={fullWidth}
            ref={ref}
            required={required}
            variant={variant}
            {...other}
        >
            {label && (
                <InputLabel htmlFor={id} ref={labelRef} {...InputLabelProps}>
                    {label}
                </InputLabel>
            )}
            {select ? (
                <Select
                    aria-describedby={helperTextId}
                    value={value}
                    input={InputElement}
                    {...SelectProps}
                >
                    {children}
                </Select>
            ) : (
                InputElement
            )}
            <div style={{ display: "flex" }}>
                {helperText && (
                    <FormHelperText id={helperTextId} {...FormHelperTextProps}>
                        {helperText}
                    </FormHelperText>
                )}
                {characterLimit && (
                    <FormHelperText
                        style={characterLimitStyle}
                        id={helperTextCounterId}
                        {...FormHelperTextProps}
                    >
                        {fancyCount(value)}/{characterLimit}
                    </FormHelperText>
                )}
            </div>
        </StyledFormControl>
    )
})

export default MaxTextField