import React, {FC} from 'react';
import classes from "../../styles/NoDataHandler.module.css";

interface NoDataHandlerProps {
    limit?: number;
}

const NoDataHandler: FC<NoDataHandlerProps> = ({limit = 10}) => {
    const height = 60 + limit * 40
    return (
        <div className={classes.noDataHandlerContainer} style={{height: `${height}px`}}>
            Данные не найдены...
        </div>
    )
}

export default NoDataHandler;