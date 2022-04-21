import React from 'react';
import classes from '../../styles/Page.module.css';
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const ProductTMDetail = () => {
    const params = useParams<Params.PRODUCT_TM_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            ProductTMDetail...{params.product_tm_id}
        </div>
    );
};

export default ProductTMDetail;