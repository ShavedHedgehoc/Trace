import React from "react";
import DocCounter from "./layout/DocCounter";

import classes from "./Footer.module.css";

const Footer:React.FC = () => {
    return (
        <div className={classes.footer__container}>
            <span className={classes.footer__content}>
                <DocCounter />
            </span>
        </div>
    );
};
export default Footer;