import React, { } from "react";
import { useActions } from "../../hooks/useActions";
import { useInterval } from "../../hooks/useInterval";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import classes from "./DocCounter.module.css"

const DocCounter: React.FC = () => {

    const timeInterval = 10000

    const { count, error, loading } = useTypedSelector(state => state.docCounter);
    const { fetchDocCounter } = useActions()

    
        

    useInterval(() => {
        fetchDocCounter();
    }, timeInterval);
    
    return (

        <div className={classes.docCounterContainer}>
            <div className={classes.indicatorContainer}>
                <span className={classes.dot} style={{backgroundColor: error === null ?'lightgray':'coral'}}></span>
                <span className={classes.dot} style={{backgroundColor: loading ?'yellow':'lightgray'}}></span>
                <span className={classes.dot} style={{backgroundColor: error === null ? count !== 0 ? 'lightgreen':'lightgray':'lightgray'}}></span>
            </div>            
            <div>
                {error
                    ?
                    <span>Сервер не доступен...</span>
                    :
                    <span>Документов на сервере: {count === 0 ? '---' : count}</span>
                }
            </div>
        </div>

    )
}

export default DocCounter;