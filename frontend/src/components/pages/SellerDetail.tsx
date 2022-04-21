import React from 'react';
import classes from './Page.module.css';
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const SellerDetail = () => {
    const params = useParams<Params.SELLER_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            SellerDetail...{params.seller_id}
        </div>
    );
};

export default SellerDetail;