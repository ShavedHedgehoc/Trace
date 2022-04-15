import React from "react";
import DocCounter from "../ui/DocCounter";
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={classes.footer__container}>
            <span className={classes.footer__content}>
                <DocCounter />
            </span>
        </div>
    );
};
export default Footer;