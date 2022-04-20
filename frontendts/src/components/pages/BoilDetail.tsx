import React from "react";
import classes from "./Page.module.css"
import {useParams} from 'react-router-dom'

const BoilDetail: React.FC = (): JSX.Element => {
    const params = useParams()
    return (
        <div className={classes.centeredMessage}>
            BoilDetail...{params.name}
        </div>
    )
}

export default BoilDetail;