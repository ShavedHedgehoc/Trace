import React from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import classes from "./SideMenu.module.css";
import {Link} from 'react-router-dom';
import {useActions} from "../../hooks/useActions";
import {RouteNames} from "../../router";

const SideMenu: React.FC = ({}) => {
    const {isOpen} = useTypedSelector(state => state.sideMenu);
    const {switchMenu} = useActions()

    return (
        <div className={isOpen ? (classes.menu__active) : classes.menu} onClick={() => switchMenu()}>
            <div className={classes.blur}>
                <div className={classes.menu__content} onClick={e => e.stopPropagation()}>
                    <div className={classes.menu__ul}>
                        <Link to={RouteNames.HOME} onClick={() => switchMenu()}>Home</Link>
                        <Link to={RouteNames.BOILS} onClick={() => switchMenu()}>Boils</Link>
                        <Link to={RouteNames.PRODUCTS} onClick={() => switchMenu()}>Products</Link>
                        <Link to={RouteNames.LOTS} onClick={() => switchMenu()}>Lots</Link>
                        <Link to={RouteNames.TRADEMARKS} onClick={() => switchMenu()}>Trademarks</Link>
                        <Link to={RouteNames.BOILS_CONVERGENCE_REPORT} onClick={() => switchMenu()}>Report</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;