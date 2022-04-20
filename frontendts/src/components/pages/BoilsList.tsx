import React, {useEffect} from "react";
import classes from "./Page.module.css"
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDebounce} from "../../hooks/useDebounce";
import BoilForm from "../BoilForm";
import Table from "../Table";
import Pagination from "../Pagination";

const BoilsList: React.FC = () => {

    const {boils, error, loading, page, limit, filter} = useTypedSelector(state => state.boils);
    const {
        fetchBoils, increasePage, decreasePage, getFirstPage,
        getLastPage, changeLimit, changeFilter, clearFilter
    } = useActions()

    const debouncedFilter = useDebounce(filter, 500)

    useEffect(() => {
        fetchBoils(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedFilter])

    const tableWindowHeight = () => {
        const rowHeight = 45
        const headerHeight = 65
        if (boils.data.length !== 0 && boils.data.length < limit) {
            return headerHeight + boils.data.length * rowHeight
        }
        return headerHeight + limit * rowHeight
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
            <div className={classes.pageHeader}>Варки</div>
            <div className={classes.pageFormContainer}>
                <BoilForm
                    changeFilter={({key, value}) => changeFilter({key, value})}
                    clearFilter={() => clearFilter()}
                    months={boils.month_selector_options}
                    years={boils.year_selector_options}
                    plants={boils.plant_selector_options}
                    filter={filter}
                    loading={loading}
                />
            </div>
            <div className={classes.pageTableContainer} style={{height: `${tableWindowHeight()}px`}}>
                {loading ? <p>Loading...</p> :
                    boils.data.length === 0 ? <p>No data...</p> : <Table items={boils.data}/>}
            </div>
            <div>
                <Pagination
                    increasePage={() => increasePage()}
                    decreasePage={() => decreasePage()}
                    getFirstPage={() => getFirstPage()}
                    getLastPage={() => getLastPage()}
                    changeLimit={(limit) => changeLimit(limit)}
                    page={page}
                    limit={limit}
                    total={boils.total}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default BoilsList;