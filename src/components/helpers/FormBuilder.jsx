import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import MaxTextField from '../helpers/MaxTextField'
import CurrencyField from './CurrencyField'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { de, enGB, zhCN } from 'date-fns/locale'
import {useTranslation} from 'react-i18next'

// Styled components for MUI 7+
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3, 2)
}))

const DivButtons = styled('div')({
    width: '100%'
})

const Buttons = styled(Button)(({ theme }) => ({
    float: 'right',
    marginLeft: 20,
    textTransform: 'none'
}))

function FormBuilder({
                         model,
                         onSubmit,
                         title = 'Form',
                         blurb = '',
                         submitLabel = 'Submit'
                     }) {
    const [state, setState] = useState({})
    const { t } = useTranslation()

    const handleChange = (e, key) => {
        setState(s => ({
            ...s,
            [key]: e.target.value
        }))
    }

    const handleCheckboxChange = (e, itemValue) => {
        setState(s => ({
            ...s,
            [itemValue]: e.target.checked
        }))
    }

    const handleDateChange = (value, key) => {
        setState(s => ({
            ...s,
            [key]: value
        }))
    }

    const setCurrency = (key, value) => {
        setState(prev => ({ ...prev, [key]: value }))
    }

    const clearForm = e => {
        e.preventDefault()
        const cleared = {}
        Object.keys(state).forEach(key => {
            cleared[key] = ''
        })
        setState(cleared)
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (onSubmit) onSubmit(state)
    }

    const renderForm = () => {
        if (!Array.isArray(model)) return null
        return model.map(m => {
            let key = m.key
            let type = m.type
            let props = m.props || {}
            let required = !!m.props.required

            // React 19: Do not use inputProps for value or defaultValue, pass them directly.
            // Only use inputProps for things like maxLength, min, max, pattern, etc.

            if (type === 'text') {
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <TextField
                            required={required}
                            margin="dense"
                            value={state[key] ?? ''}
                            label={m.label}
                            name={key}
                            type="text"
                            slotProps={{ htmlInput: { maxLength: m.props.maxlength } }}
                            onChange={e => handleChange(e, key)}
                            //style={{ width: 500 }}
                            fullWidth
                        />
                    </div>
                )
            } else if (type === 'number') {
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <TextField
                            required={required}
                            margin="dense"
                            value={state[key] ?? ''}
                            label={m.label}
                            name={key}
                            type="number"
                            slotProps={{ htmlInput: { min: m.props.min,
                                    max: m.props.max,
                                    step: m.props.step } }}
                            onChange={e => handleChange(e, key)}
                            //style={{ width: 500 }}
                            fullWidth
                        />
                    </div>
                )
            } else if (type === 'select') {
                let selectElements = props.items.map(item => (
                    <MenuItem value={item.value} key={item.order}>
                        {item.label}
                    </MenuItem>
                ))
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <br />
                        <FormLabel>{m.label}</FormLabel>
                        <Select
                            name={key}
                            value={state[key] ?? ''}
                            style={{ minWidth: 200, marginRight: 20 }}
                            onChange={e => handleChange(e, key)}
                        >
                            {selectElements}
                        </Select>
                        <br />
                        <br />
                    </div>
                )
            } else if (type === 'radio') {
                let radioOptions = props.items.map(item => (
                    <FormControlLabel
                        value={item.value}
                        key={item.order}
                        control={<Radio color="primary" />}
                        label={item.label}
                        labelPlacement="start"
                        style={{ color: '#0000008a' }}
                    />
                ))
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <br />
                        <FormLabel>{m.label}</FormLabel>
                        <RadioGroup
                            name={key}
                            required={required}
                            value={state[key] ?? ''}
                            onChange={e => handleChange(e, key)}
                            row
                        >
                            {radioOptions}
                        </RadioGroup>
                    </div>
                )
            } else if (type === 'maxtext') {
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <MaxTextField
                            multiline
                            rows={m.props.rows}
                            required={required}
                            margin="dense"
                            label={m.label}
                            name={key}
                            type="text"
                            inputProps={{
                                maxLength: m.props.maxlength
                            }}
                            characterLimit={m.props.maxlength}
                            helperText="Number of characters:   "
                            fullWidth
                            value={state[key] ?? ''}
                            onChange={e => handleChange(e, key)}
                        /><br /><br /><br />
                    </div>
                )
            } else if (type === 'checkbox') {
                let checkboxElements = props.items.map((item, idx) => (
                    <FormControlLabel
                        key={idx}
                        control={
                            <Checkbox
                                checked={!!state[item.value]}
                                onChange={e => handleCheckboxChange(e, item.value)}
                                color="primary"
                                value={item.value}
                            />
                        }
                        label={item.label}
                        style={{ color: '#0000008a' }}
                    />
                ))
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <br />
                        <FormLabel>{m.label}</FormLabel>
                        <FormGroup row>
                            <div>
                                {checkboxElements}
                            </div>
                        </FormGroup>
                    </div>
                )
            } else if (type === 'datetime') {
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                            <DateTimePicker
                                ampm={false}
                                disablePast
                                disabled={m.props.disabled}
                                value={state[key] ?? null}
                                onChange={value => handleDateChange(value, key)}
                                label={m.label}
                                slotProps={{ textField: { variant: 'standard' } }}
                            />
                        </LocalizationProvider>
                    </div>
                )
            } else if (type === 'currency') {
                return (
                    <div key={key} style={{ marginBottom: 10 }}>
                        <br />
                        {console.log(`key is ${key}`)}
                        <CurrencyField
                            name={key}
                            value={state[key]}
                            required={required}
                            onChange={setCurrency}
                            currencySymbol="£"
                            decimalSeparator="."
                            thousandSeparator=","
                            label={m.label}
                            precision={2}
                        />
                        <br />
                    </div>
                )
            }
            return null
        })
    }

    return (
        <div>
            <StyledPaper>
                <Typography variant="h5" component="h5">
                    {title}
                </Typography>
                {blurb === ''
                    ? null
                    : <Typography component="p">{blurb}</Typography>
                }
                <br />
                <form onSubmit={handleSubmit}>

                    {renderForm()}
                    <DivButtons>
                        <Buttons
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {submitLabel}
                        </Buttons>
                        <Buttons
                            type="reset"
                            variant="outlined"
                            onClick={clearForm}
                            color="secondary"
                        >
                            Clear
                        </Buttons>
                        <br /><br />
                    </DivButtons>
                </form>
            </StyledPaper>
        </div>
    )
}

export default FormBuilder