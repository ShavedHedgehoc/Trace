import React from "react";
import classes from "../../styles/Page.module.css"

const AdminPage: React.FC = (): JSX.Element => {
    return (
        <div className={classes.pageContainer}>
            <div className={classes.pageHeader}>
                Admin page!!!
            </div>            
        </div>
    )
}

export default AdminPage;