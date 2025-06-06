import React from 'react'
import { Link } from 'react-router'
import TopNavBar from '../components/navigation/TopNavBar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {useTranslation} from 'react-i18next'

export default function NotFoundPage() {
    const { t } = useTranslation()

    React.useEffect(() => {
        document.title = 'POPTAPE | '+ t('errors:not_found_page_title')
    }, []);

    return (
        <>
            <header>
                <TopNavBar />
            </header>
            <div>
                <Paper style={{ margin: 20 }}>
                    <Typography variant="h3">
                        Oh noes!<br /><br />
                    </Typography>
                    <Typography variant="body1">
                        I don't think you want to be here. Go back to the <Link to={'/'}>
                        home page
                    </Link> and try again.<br /><br />
                    </Typography>
                </Paper>
            </div>
        </>
    )
}