import React from 'react';
import classes from './Page.module.css';
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const LotDetail = () => {
    const params = useParams<Params.LOT_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            LotDetail... {params.lot_id}
        </div>
    );
};

export default LotDetail;