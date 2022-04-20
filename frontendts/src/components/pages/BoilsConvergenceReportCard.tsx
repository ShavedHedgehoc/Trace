import React from 'react';
import classes from './Page.module.css';
import {useParams} from "react-router-dom";
import {Params} from "../../router";

const BoilsConvergenceReportCard = () => {
    const params = useParams<Params.BOILS_CONVERGENCE_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            BoilsConvergenceReportCard...{params.boil_name}
        </div>
    );
};

export default BoilsConvergenceReportCard;