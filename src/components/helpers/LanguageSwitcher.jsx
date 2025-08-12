import React, {useState, useEffect} from 'react'
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
    const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'en')

    const handleLanguageChange = (e) => {
        const newLang = e.target.value
        i18n.changeLanguage(newLang)
        setLang(newLang)
        localStorage.setItem('i18nextLng', newLang)
    };

    useEffect(() => {
        if (localStorage.getItem('i18nextLng') !== null) {
            setLang(localStorage.getItem('i18nextLng'))
        } else {
            setLang('en')
            localStorage.setItem('i18nextLng', 'en')
        }
        i18n.changeLanguage(lang)
    }, []);

    const { t } = useTranslation()

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id='lang'>{t('settings:st_language')}</InputLabel>
            <Select
                labelId='select-language'
                value={lang}
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