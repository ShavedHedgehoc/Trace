import React from "react";
import classes from "./Ui.module.css"
const PageHeader = (props) => {
    return (
        <div className={classes.main}>
            <h1 className={classes.text}>{props.text}</h1>
        </div>
    );
};
export default PageHeader;