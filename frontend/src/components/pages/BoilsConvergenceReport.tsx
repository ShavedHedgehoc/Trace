import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {fetchConvergence} from "../../store/action-creators/convergence";
import {useDebounce} from "../../hooks/useDebounce";

const BoilsConvergenceReport = () => {
    const {data, loading, error, page, limit, filter} = useTypedSelector(state => state.convergence)
    const {fetchConvergence} = useActions()
    const debouncedFilter = useDebounce(filter, 500)

    useEffect(() => {
        fetchConvergence(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedFilter])

    return (
        <div className={classes.centeredMessage}>
            BoilsConvergenceReport
        </div>
    );
};

export default BoilsConvergenceReport;