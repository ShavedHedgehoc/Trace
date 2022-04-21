import React from "react";
import DocCounter from "../utils/DocCounter";

import classes from "../../styles/Footer.module.css";

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