import React, {useEffect} from "react";
import classes from "../../styles/Page.module.css"
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDebounce} from "../../hooks/useDebounce";
import BoilForm from "../forms/BoilForm";
import BoilTable from "../tables/BoilTable";
import Pagination from "../utils/Pagination";

const BoilsList: React.FC = () => {

    const {data, error, loading, page, limit, filter} = useTypedSelector(state => state.boils);
    const {
        fetchBoils,
        increaseBoilsPage,
        decreaseBoilsPage,
        getFirstBoilsPage,
        getLastBoilsPage,
        changeBoilsLimit,
        changeBoilsFilter,
        clearBoilsFilter
    } = useActions()

    const debouncedFilter = useDebounce(filter, 500)

    useEffect(() => {
        fetchBoils(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedFilter])

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
            <div className={classes.pageHeader}>Варки</div>
            <div className={classes.pageFormContainer}>
                <BoilForm
                    changeFilter={({key, value}) => changeBoilsFilter({key, value})}
                    clearFilter={() => clearBoilsFilter()}
                    months={data.month_selector_options}
                    years={data.year_selector_options}
                    plants={data.plant_selector_options}
                    filter={filter}
                    loading={loading}
                />
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0 ? <p>No data...</p> : <BoilTable items={data.rows}/>}
            </div>
            <div>
                <Pagination
                    increasePage={() => increaseBoilsPage()}
                    decreasePage={() => decreaseBoilsPage()}
                    getFirstPage={() => getFirstBoilsPage()}
                    getLastPage={() => getLastBoilsPage()}
                    changeLimit={(limit) => changeBoilsLimit(limit)}
                    page={page}
                    limit={limit}
                    total={data.total}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default BoilsList;