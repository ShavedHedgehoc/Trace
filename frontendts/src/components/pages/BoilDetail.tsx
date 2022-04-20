import React from "react";
import classes from "./Page.module.css"
import {useParams} from 'react-router-dom'
import {Params} from "../../router";

const BoilDetail: React.FC = (): JSX.Element => {
    const params = useParams<Params.BOIL_PARAMS>()
    return (
        <div className={classes.centeredMessage}>
            BoilDetail...{params.boil_name}
        </div>
    )
}

export default BoilDetail;