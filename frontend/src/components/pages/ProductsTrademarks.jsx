import React from 'react';
import classes from "./Pages.module.css";
// import { StyledPaper } from '../styled_components/StyledComponents';
import { Paper } from '@mui/material';

import ProductHeader from './headers/ProductHeader';
import ProductTrademarkDetailView from '../views/ProductTrademarkDetailView';

const ProductsTrademarks = (props) => {

    return (
        <div className={classes.page__content}>
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    padding: '20px',
                    marginTop: '30px',
                }}>

                <ProductHeader productId={props.productId} />
                <ProductTrademarkDetailView productId={props.productId} />
            </Paper>
        </div>
    );
}

export default ProductsTrademarks;

