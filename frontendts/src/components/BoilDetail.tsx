import React from "react";
import { useParams } from 'react-router-dom'
import classes from "./Page.module.css"


// interface RouteParams {
//     name: string;
// }

const BoilDetail: React.FC = (): JSX.Element => {
    const params = useParams()
    return (
        <div className={classes.centeredMessage}>            
            BoilDetail...{params.name}
        </div>
    )
}

export default BoilDetail;