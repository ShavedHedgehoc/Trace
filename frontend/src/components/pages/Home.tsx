import React from "react";
import classes from "../../styles/Page.module.css"

const Home: React.FC = (): JSX.Element => {
    return (
        <div className={classes.pageContainer}>
            <div className={classes.pageHeader}>
                Добро пожаловать!
            </div>
            <div className={classes.pageSubHeader}>
                Здесь надо написать что-нибудь про обратную связь и дать ссылки на Telegram и WhatsApp...
            </div>
        </div>
    )
}

export default Home;