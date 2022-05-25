import React from "react";
import {BsTelegram, BsWhatsapp} from "react-icons/bs";
import classes from "../../styles/Page.module.css"

const Home: React.FC = (): JSX.Element => {
    return (
        <div className={classes.pageContainer}>
            <div className={classes.pageHeader}>
                Добро пожаловать!
            </div>
            <div className={classes.pageSubHeader}>
                В случае каких-либо затруднений или при необходимости добавить какой-нибудь функционал
            </div>
            <div className={classes.pageSubHeader}>
                <div><BsTelegram/> </div>
                <div><BsWhatsapp/> </div>
            </div>
        </div>
    )
}

export default Home;