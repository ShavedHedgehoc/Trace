import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {fetchConvergence} from "../../store/action-creators/convergence";
import {useDebounce} from "../../hooks/useDebounce";
import Pagination, {PaginationProps} from "../utils/Pagination";
import ConvergenceTable from "../tables/ConvergenceTable";
import ConvergenceForm, {ConvergenceFormProps} from "../forms/ConvergenceForm";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";
import {useLocation} from "react-router-dom";

const ConvergenceConvergenceReport = () => {

    const location = useLocation()
    const {data, loading, error, page, limit, filter, init} = useTypedSelector(state => state.convergence)
    const {
        fetchConvergence,
        increaseConvergencePage,
        decreaseConvergencePage,
        getFirstConvergencePage,
        getLastConvergencePage,
        changeConvergenceLimit,
        changeConvergenceFilter,
        resetConvergenceFilter,
        resetConvergenceState,
    } = useActions()

    const debouncedFilter = useDebounce(filter, 500)

    const paginationProps: PaginationProps = {
        increasePage: () => increaseConvergencePage(),
        decreasePage: () => decreaseConvergencePage(),
        getFirstPage: () => getFirstConvergencePage(),
        getLastPage: () => getLastConvergencePage(),
        changeLimit: (limit) => changeConvergenceLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    const convergenceFormProps: ConvergenceFormProps = {
        filter: filter,
        plants_select_options: data.plant_selector_options,
        changeFilter: ({key, value}) => changeConvergenceFilter({key, value}),
        resetFilter: () => resetConvergenceFilter()
    }

    useEffect(() => {
        resetConvergenceState();
    }, [location])

    useEffect(() => {
        fetchConvergence(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedFilter])

    if (error) {
        return (
            <div className={classes.centeredMessage}>
                Error...
            </div>
        )
    }

    if (loading && init) {
        return (
            <div className={classes.centeredMessage}>
                <LoadingHandler/>
            </div>
        )
    }

    return (
        <div className={classes.pageContainer}>
            <Modal visible={loading}><LoadingHandler/></Modal>
            <div className={classes.pageHeader}>Отчет по варкам</div>
            <div className={classes.pageFormContainer}>
                <ConvergenceForm {...convergenceFormProps}/>
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <NoDataHandler/>
                    : <ConvergenceTable items={data.rows} exactly={filter.exactly}/>
                }
            </div>
            <div>
                <Pagination {...paginationProps}/>
            </div>
        </div>
    )
};

export default ConvergenceConvergenceReport;