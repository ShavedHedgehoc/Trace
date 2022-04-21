import React from 'react';
import classes from "../../styles/Page.module.css";
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const ProductDetail = () => {
    const params = useParams<Params.PRODUCT_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            ProductDetail {params.product_id}
        </div>
    );
};

export default ProductDetail;