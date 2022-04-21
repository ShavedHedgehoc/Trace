import React from 'react';
import classes from '../../styles/Page.module.css';
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const TrademarkDetail = () => {
    const params=useParams<Params.TRADEMARK_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            TrademarkDetail... {params.trademark_id}
        </div>
    );
};

export default TrademarkDetail;