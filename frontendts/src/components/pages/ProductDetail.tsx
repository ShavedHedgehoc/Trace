import React from 'react';
import classes from "./Page.module.css";
import {useParams} from "react-router-dom";

const ProductDetail = () => {
    const params = useParams()
    return (
        <div className={classes.centeredMessage}>
            ProductDetail {params.product_id}
        </div>
    );
};

export default ProductDetail;