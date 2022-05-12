import React, { } from "react";
import { useActions } from "../../hooks/useActions";
import { useInterval } from "../../hooks/useInterval";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import classes from "../../styles/DocCounter.module.css"

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
                <span className={classes.dot} style={{backgroundColor: error === null ?'#7b7b7b':'red'}}></span>
                <span className={classes.dot} style={{backgroundColor: loading ?'yellow':'#7b7b7b'}}></span>
                <span className={classes.dot} style={{backgroundColor: error === null ? count !== 0 ? 'green':'#7b7b7b':'#7b7b7b'}}></span>
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