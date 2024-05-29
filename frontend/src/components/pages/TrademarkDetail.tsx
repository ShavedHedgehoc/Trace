import React, {useEffect} from 'react';
import classes from "../../styles/Page.module.css";
import {useLocation, useParams} from "react-router-dom";
import {Params} from "../../router";
import Pagination, {PaginationProps} from "../utils/Pagination";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import TrademarkItemTable from "../tables/TrademarkItemTable";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";

const TrademarkDetail = () => {

    const location = useLocation()
    const params = useParams<Params.TRADEMARK_PARAMS>()
    const trademark_id: string | undefined = params.trademark_id
    const {data, loading, error, page, limit, init} = useTypedSelector(state => state.trademarkItem)

    const {
        fetchTrademarkItem,
        increaseTrademarkItemPage,
        decreaseTrademarkItemPage,
        getFirstTrademarkItemPage,
        getLastTrademarkItemPage,
        changeTrademarkItemLimit,
        resetTrademarkItemState,
    } = useActions()



    const paginationProps: PaginationProps = {
        increasePage: () => increaseTrademarkItemPage(),
        decreasePage: () => decreaseTrademarkItemPage(),
        getFirstPage: () => getFirstTrademarkItemPage(),
        getLastPage: () => getLastTrademarkItemPage(),
        changeLimit: (limit) => changeTrademarkItemLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    // const productItemFormProps: TrademarkItemFormProps = {
    //     changeFilter: ({key, value}) => changeTrademarkItemFilter({key, value}),
    //     clearFilter: () => clearTrademarkItemFilter(),
    //     filter: filter
    // }

    useEffect(() => {
        resetTrademarkItemState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        fetchTrademarkItem(page, limit, trademark_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit])

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
            <div className={classes.pageHeader}>
                Отчет по сырью
            </div>
            <div className={classes.pageSubHeader}>
                <div>Торговое название: {data.header.trademark_name}</div>
                <div>Наименование: {data.header.product_name}</div>
                <div> Код 1С: {data.header.product_id}</div>
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <NoDataHandler limit={limit}/>
                    : <TrademarkItemTable items={data.rows}/>
                }
            </div>
            <Pagination {...paginationProps}/>
        </div>
    );
};

export default TrademarkDetail;