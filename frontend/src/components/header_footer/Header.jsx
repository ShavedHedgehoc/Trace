import React from "react";


import classes from "./Header_footer.module.css"
import { navigate } from "hookrouter";
import { Menu, MenuSharp } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Header = (props) => {

    const logOutClick = () => {
        console.log('Log out pressed!');
        navigate('/', true);
    };

    
    return (
        <div className={classes.header}>
{/* <span className={classes.header_footer__span}> */}
            {/* <IconButton sx={{color:"white"}} >
                <MenuSharp  />
            </IconButton> */}
            {/* </span> */}
            {/* {props.user
                ? <>
                    <span className={classes.header_footer__span}>{props.user}</span>
                    <a className={classes.header_footer__a} onClick={logOutClick}>Logout</a>

                </>
                : <>
                    <a className={classes.classes.header_footer__a}>Login</a>
                </>
            } */}
        </div>
    );
}
export default Header;