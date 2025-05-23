import React from 'react'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import UKFlag from '../../assets/images/flags/GB.svg'
import BRFlag from '../../assets/images/flags/BR.svg'
import '../../css/poptape.css'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()

    const handleLanguageChange = (e) => {
        const newLang = e.target.value
        i18n.changeLanguage(newLang)
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id='lang'>Language</InputLabel>
            <Select
                labelId='select-language'
                value={i18n.language}
                label='Language'
                onChange={handleLanguageChange}
            >
                <MenuItem value='en'><img className='flags' alt='UK' src={UKFlag} /> En</MenuItem>
                <MenuItem value='pt'><img className='flags' alt='Brasil' src={BRFlag} /> Pt</MenuItem>
            </Select>
        </FormControl>
    )
}

export default LanguageSwitcher