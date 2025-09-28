import React, {useState, useCallback, useEffect} from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined'
import FormBuilder from '../helpers/FormBuilder'
import CustomSnackbar from '../information/CustomSnackbar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import {useTranslation} from 'react-i18next'
import superagent from 'superagent'
import {addToAuctionFields} from '../../assets/scripts/general'

// styles
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3, 2)
}));

const Dropbuttons = styled(Button)(({ theme }) => ({
    textTransform: "none",
    marginRight: 20
}));

function AddToAuction(props) {

    const { t } = useTranslation()
    const auctionFields = addToAuctionFields()

    const peckishDefault = {
        variant: "info",
        message: t('items:ata_default_message')
    };

    const navigate = useNavigate();
    const [showSnack, setShowSnack] = useState(false);
    const [showError, setShowError] = useState(!props.itemId);
    const [showPaper, setShowPaper] = useState(true);
    const [duration] = useState(1900);
    const [itemId] = useState(props.itemId);
    const [itemName] = useState(props.itemName);
    const [itemsURL] = useState('/user/' + Cookies.get('username') + '/items');
    const [showSuccessButtons, setShowSuccessButtons] = useState(false);
    const [auctionType, setAuctionType] = useState('');
    const [showAddToAuctionButtons, setShowAddToAuctionButtons] = useState(!!props.itemId);
    const [showAuctionForm, setShowAuctionForm] = useState(false);
    const [formTitle] = useState(t('items:ata_form_builder_title'));
    const [formBlurb] = useState(t('items:ata_form_builder_blurb'));
    const [formFields, setFormFields] = useState(auctionFields['soloEnAuction']);
    const [date] = useState(new Date().getTime());
    const [peckish, setPeckish] = useState(peckishDefault);
    const [model, setModel] = useState({});

    useEffect(() => {
        const ff = formFields
        // translation functionality
        for (let i = 0; i < ff.length; i++) {
            let trans = t(ff[i].name)
            ff[i].name = trans
        }
        setFormFields(ff)
    }, [])

    const openSnack = useCallback(() => {
        setShowSnack(false);
        setTimeout(() => setShowSnack(true), 0);
    }, []);

    const handleButton = (e, aucType) => {
        setAuctionType(aucType);
        setShowAuctionForm(true);
    };

    const onSuccess = useCallback(() => {
        if (props.onSuccess) props.onSuccess({ showAuctionForm, showAddToAuctionButtons, showSuccessButtons, itemId, itemName });
        setShowAuctionForm(false);
        setShowAddToAuctionButtons(false);
        setShowSuccessButtons(true);
    }, [props, showAuctionForm, showAddToAuctionButtons, showSuccessButtons, itemId, itemName]);

    const onFail = (err) => {
        console.log(err)
        let variant = "warning"
        let message = t('errors:something_went_bang')
        if (err.status === 400) {
            variant = "warning"
            message = t('errors:fields_incorrect')
        } else if (err.status === 401) {
            variant = "error"
            message = t('errors:unauthorized')
        } else if (err.status === 502) {
            variant = "error"
            message = t('errors:bad_gateway')
        }
        setPeckish({ variant, message })
        openSnack()
    };

    const onSubmit = (model) => {
        //TODO: Move currency stuff to account related tings
        model['type'] = 'EN'
        model['currency'] = 'GBP'
        model['item_id'] = itemId
        setModel(model)

        console.log("Input data is ["+JSON.stringify(model)+"]")

        superagent.post('/auctionhouse/solo/auction/')
            .send(JSON.stringify(model))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('x-access-token', Cookies.get('access-token'))
            .then(res => {
                const auction_id = res.body.auction_id
                const lot_id = res.body.lot_id
                superagent.post('/auction/' + auction_id + '/lot/' + lot_id)
                    .send()
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .set('x-access-token', Cookies.get('access-token'))
                    .then(res => {
                        setPeckish({ variant: "success", message: t('items:ata_default_message') });
                        openSnack();
                        setShowPaper(false);
                        onSuccess(true);
                    })
                    .catch(onFail);
            })
            .catch(onFail);
    };

    // No-op handleChange since FormBuilder likely handles state internally in function components
    // If you need it, you can add: const handleChange = (e, key) => { ... }

    return (
        <div>
            {showPaper && (
                <StyledPaper>
                    {showError &&
                        <Typography variant="h5" component="h5">
                            {t('items:ata_no_item_id')}<br />
                        </Typography>
                    }

                    {showAddToAuctionButtons &&
                        <>
                            <Dropbuttons
                                color="primary"
                                variant="contained"
                                onClick={(e) => { handleButton(e, 'solo'); }}
                                endIcon={<AddBoxOutlinedIcon />}
                            >
                                {t('items:ata_sell_singly')}
                            </Dropbuttons>
                            <Dropbuttons
                                color="primary"
                                disabled={true}
                                variant="contained"
                                onClick={(e) => { handleButton(e, 'multiple'); }}
                                endIcon={<AddToPhotosOutlinedIcon />}
                            >
                                {t('items:ata_sell_multiple')}
                            </Dropbuttons>
                        </>
                    }

                    {showAuctionForm &&
                        <FormBuilder
                            title={formTitle}
                            blurb={formBlurb}
                            model={formFields}
                            submitLabel="Add"
                            onSubmit={onSubmit}
                        />
                    }

                    {showSuccessButtons &&
                        <>
                            <Dropbuttons
                                color="primary"
                                variant="contained"
                                onClick={() => navigate(`/item/${itemId}/${itemName}`)}
                            >
                                {t('items:ata_show_item')}
                            </Dropbuttons>
                            <Dropbuttons
                                color="primary"
                                variant="contained"
                                onClick={() => navigate(itemsURL)}
                            >
                                {t('items:ata_show_my_items')}
                            </Dropbuttons>
                            <Dropbuttons
                                color="primary"
                                variant="contained"
                                onClick={() => window.location.reload()}
                            >
                                {t('items:ata_create_another')}
                            </Dropbuttons>
                        </>
                    }

                    {showSnack &&
                        <CustomSnackbar
                            duration={duration}
                            key_date={date}
                            variant={peckish.variant}
                            message={peckish.message}
                        />
                    }
                </StyledPaper>
            )}
        </div>
    );
}

export default AddToAuction;