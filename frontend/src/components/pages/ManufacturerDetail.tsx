import React from 'react';
import classes from '../../styles/Page.module.css';
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const ManufacturerDetail = () => {
    const params = useParams<Params.MANUFACTURER_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            ManufacturerDetail...{params.manufacturer_id}
        </div>
    );
};

export default ManufacturerDetail;