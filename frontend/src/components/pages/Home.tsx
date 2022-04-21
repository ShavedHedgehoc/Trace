import React from "react";
import classes from "../../styles/Page.module.css"

const Home: React.FC = (): JSX.Element => {
    return (
        <div className={classes.centeredMessage}>
            Добро пожаловать!
        </div>
    )
}

export default Home;