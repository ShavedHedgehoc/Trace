import React, {useEffect} from "react";
import classes from "../../styles/Page.module.css"
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDebounce} from "../../hooks/useDebounce";
import BoilForm, {BoilFormProps} from "../forms/BoilForm";
import BoilTable from "../tables/BoilTable";
import Pagination, {PaginationProps} from "../utils/Pagination";
import Modal from "../utils/Modal";
import LoadingHandler from "../utils/LoadingHandler";
import NoDataHandler from "../utils/NoDataHandler";

const BoilsList: React.FC = () => {

    const {data, error, loading, page, limit, filter, init} = useTypedSelector(state => state.boils);
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

    const debouncedFilter = useDebounce(filter, 800)

    const paginationProps: PaginationProps = {
        increasePage: () => increaseBoilsPage(),
        decreasePage: () => decreaseBoilsPage(),
        getFirstPage: () => getFirstBoilsPage(),
        getLastPage: () => getLastBoilsPage(),
        changeLimit: (limit) => changeBoilsLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    const boilFormProps: BoilFormProps = {
        changeFilter: ({key, value}) => changeBoilsFilter({key, value}),
        clearFilter: () => clearBoilsFilter(),
        months: data.month_selector_options,
        years: data.year_selector_options,
        plants: data.plant_selector_options,
        filter: filter,
        loading: loading
    }

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
            <div className={classes.pageHeader}>Список варок</div>
            <div className={classes.pageFormContainer}>
                <BoilForm {...boilFormProps} />
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0 ? <NoDataHandler limit={limit}/> : <BoilTable items={data.rows}/>}
            </div>
            <Pagination {...paginationProps}/>
        </div>
    )
}

export default BoilsList;