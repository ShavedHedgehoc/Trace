import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {fetchConvergence} from "../../store/action-creators/convergence";
import {useDebounce} from "../../hooks/useDebounce";
import Pagination from "../utils/Pagination";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";
import ConvergenceTable from "../tables/ConvergenceTable";
import ConvergenceForm from "../forms/ConvergenceForm";

const ConvergenceConvergenceReport = () => {

    const {data, loading, error, page, limit, filter} = useTypedSelector(state => state.convergence)
    const {
        fetchConvergence,
        increaseConvergencePage,
        decreaseConvergencePage,
        getFirstConvergencePage,
        getLastConvergencePage,
        changeConvergenceLimit,
        changeConvergenceFilter,
        resetConvergenceFilter,
    } = useActions()

    const debouncedFilter = useDebounce(filter, 500)

    useEffect(() => {
        fetchConvergence(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedFilter])

    let navigate = useNavigate();

    const redirectToBoil = (boil_name: string) => {
        navigate(`${RouteNames.BOILS}/${boil_name}`)
    }

    const redirectToCard = (boil_name: string) => {
        navigate(`${RouteNames.BOILS_CONVERGENCE_REPORT}/${boil_name}`)
    }

    if (error) {
        return (
            <div className={classes.centeredMessage}>
                Error...
            </div>
        )
    }

    if (loading) {
        return (
            <div className={classes.centeredMessage}>
                Loading...
            </div>
        )
    }

    return (
        <div className={classes.pageContainer}>
            <div className={classes.pageHeader}>Отчет по варкам</div>
            <div className={classes.pageFormContainer}>
                <ConvergenceForm
                    filter={filter}
                    plants_select_options={data.plant_selector_options}
                    changeFilter={
                        ({key, value}) => changeConvergenceFilter({key, value})
                    }
                    resetFilter={() => resetConvergenceFilter()}
                />
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <p>No data...</p>
                    : <ConvergenceTable
                        items={data.rows}
                        redirect_to_boil={(boil_name) => redirectToBoil(boil_name)}
                        redirect_to_card={(boil_name) => redirectToCard(boil_name)}
                    />
                }
            </div>
            <div>
                <Pagination
                    increasePage={() => increaseConvergencePage()}
                    decreasePage={() => decreaseConvergencePage()}
                    getFirstPage={() => getFirstConvergencePage()}
                    getLastPage={() => getLastConvergencePage()}
                    changeLimit={(limit) => changeConvergenceLimit(limit)}
                    page={page}
                    limit={limit}
                    total={data.total}
                    loading={loading}
                />
            </div>
        </div>
    )
};

export default ConvergenceConvergenceReport;