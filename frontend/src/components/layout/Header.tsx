import React from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import classes from "../../styles/Header.module.css";

const Header: React.FC = () => {
    const { switchMenu, logout } = useActions()
    const { user } = useTypedSelector(state => state.auth)

    return (
        <div className={classes.headerContainer}>
            <div className={classes.headerLeftContainer}>
                <button className={classes.headerMenuButton} onClick={() => switchMenu()}>&equiv;</button>
            </div>
            <div className={classes.headerRightContainer}>
                <span className={classes.headerSpan}>{user?.name}</span>
                <button className={classes.headerButton} onClick={() => logout()}>Выйти</button>
            </div>


        </div>
    )
}

export default Header;