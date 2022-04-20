import React from 'react';
import classes from'./Page.module.css';
import {useParams} from "react-router-dom";

const TrademarkDetail = () => {
    const params=useParams()
    return (
        <div className={classes.centeredMessage}>
            TrademarkDetail {params.trademark_id}
        </div>
    );
};

export default TrademarkDetail;