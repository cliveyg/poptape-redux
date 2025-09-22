import { alpha, styled, ThemeProvider } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import TypeSense from '../../assets/scripts/typesense'
import {selectTheme} from '../../assets/scripts/theme'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            },
            '&:hover': {
                width: '20ch'
            }
        }
    }
}))

function SearchBox() {
    const [query, setQuery] = React.useState('')
    const [results, setResults] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const { t } = useTranslation()
    const [theme, _] = React.useState(selectTheme())

    const handleSearch = async (e) => {
        const value = e.target.value
        setQuery(value)
        setError('')
        if (value.trim().length < 2) {
            setResults([])
            return
        }
        setLoading(true)
        try {
            const searchResults = await TypeSense.collections('test')
                .documents()
                .search({
                    q: value,
                    query_by: 'name,ingredients,instructions,cuisine,difficulty,company_name'
                })
            setResults(searchResults.hits.map(hit => hit.document))
        } catch (err) {
            setError('Search failed')
            console.log(err)
            setResults([])
        }
        setLoading(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder={t('tm_search')}
                    inputProps={{ 'aria-label': t('search') }}
                    value={query}
                    onChange={handleSearch}
                    sx={{ width: '100%' }}
                />
                {loading && (
                    <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CircularProgress size={20} />
                    </Box>
                )}
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                {results.length > 0 && (
                    <List sx={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        left: 0,
                        zIndex: 10,
                        width: '100%',
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        borderRadius: 1,
                        maxHeight: 300,
                        overflowY: 'auto'
                    }}>
                        {results.map((result, idx) => (
                            <ListItem key={idx} sx={{ cursor: 'pointer', px: 2, py: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {result.image && (
                                    <img
                                        src={result.image}
                                        alt={result.name}
                                        style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 4, marginRight: 12}}
                                    />
                                )}
                                <Box>
                                    <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
                                        {result.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {result.cuisine} | {result.cookTimeMinutes} min
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Search>
        </ThemeProvider>
    )
}

export default SearchBox