import React from 'react';
import classes from "./ErrorHandler.module.css"


const ErrorHandler = ({ children }) => {
    return (
        <div className={classes.errorHandler}>
            <div className={classes.errorHandlerContent}>
                {children}
            </div>
        </div >
    );
};

export default ErrorHandler;