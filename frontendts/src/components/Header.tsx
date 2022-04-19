import React from "react";
import { useActions } from "../hooks/useActions";
// import { useTypedSelector } from "../hooks/useTypedSelector";
import classes from "./Header.module.css";

const Header: React.FC = () => {    
    const { switchMenu } = useActions()

    // const menuSwitch = (isOpen: boolean) => {
    //     if (isOpen) {
    //         closeMenu()
    //     } else {
    //         openMenu()
    //     }
    // }

    return (
        <div className={classes.headerContainer}>
            <button className={classes.headerButton} onClick={() => switchMenu()}>&equiv;</button>
        </div>
    )
}

export default Header;