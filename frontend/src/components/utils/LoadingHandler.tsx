import React, { FC } from 'react';
import classes from "../../styles/LoadingHandler.module.css";

const LoadingHandler: FC = () => {
    return (
        <div className={classes.loadingHandlerContainer}>
            <div className={classes.loadingHandlerHeader}>
                Loading...
            </div>
            <div className={classes.loadingHandlerBarContainer}/>
        </div>
    )
}

export default LoadingHandler;