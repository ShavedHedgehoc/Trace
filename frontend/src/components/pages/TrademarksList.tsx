import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Pagination, {PaginationProps} from "../utils/Pagination";
import TrademarkTable from "../tables/TrademarkTable";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";
import TrademarkForm, {TrademarkFormProps} from "../forms/TrademarkForm";
import {useDebounce} from "../../hooks/useDebounce";

const TrademarksList = () => {
    const {data, loading, error, page, limit, init, filter} = useTypedSelector(state => state.trademarks)
    const {
        fetchTrademarks,
        increaseTrademarkPage,
        decreaseTrademarkPage,
        getFirstTrademarkPage,
        getLastTrademarkPage,
        changeTrademarkLimit,
        changeTrademarkFilter,
        clearTrademarkFilter
    } = useActions()

    const debouncedFilter = useDebounce(filter, 800)

    const trademarkFormProps: TrademarkFormProps = {
        changeFilter: ({key, value}) => changeTrademarkFilter({key, value}),
        resetFilter: () => clearTrademarkFilter(),
        filter: filter
    }

    const paginationProps: PaginationProps = {
        increasePage: () => increaseTrademarkPage(),
        decreasePage: () => decreaseTrademarkPage(),
        getFirstPage: () => getFirstTrademarkPage(),
        getLastPage: () => getLastTrademarkPage(),
        changeLimit: (limit) => changeTrademarkLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    useEffect(() => {
        fetchTrademarks(page, limit, filter);
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
            <div className={classes.pageHeader}>Список торговых названий</div>            
            <div className={classes.pageFormContainer}>
                <TrademarkForm {...trademarkFormProps}/>
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <NoDataHandler/>
                    : <TrademarkTable items={data.rows}/>
                }
            </div>
            <div>
                <Pagination {...paginationProps} />
            </div>
        </div>
    );
};

export default TrademarksList;