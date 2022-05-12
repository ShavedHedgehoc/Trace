import React from 'react';
import classes from '../../styles/Page.module.css';
import {useLocation, useParams} from "react-router-dom";
import {Params} from "../../router";

const ManufacturerLotDetail = () => {

    const location = useLocation()
    const params = useParams<Params.MANUFACTURER_LOT_PARAMS>()
    const manufacturer_lot_id: string | undefined = params.manufacturer_lot_id



    return (
        <div className={classes.centeredMessage}>
            ManufacturerLotDetail... {manufacturer_lot_id}
        </div>
    );
};

export default ManufacturerLotDetail;