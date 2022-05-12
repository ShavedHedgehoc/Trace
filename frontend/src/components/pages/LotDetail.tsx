import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useLocation, useParams} from "react-router-dom";
import {Params} from "../../router";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Pagination, {PaginationProps} from "../utils/Pagination";
import LotItemTable from "../tables/LotItemTable";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";

const LotDetail = () => {

    const location = useLocation()
    const params = useParams<Params.LOT_PARAMS>()
    const lot_id: string | undefined = params.lot_id
    const {data, loading, error, limit, page, init} = useTypedSelector(state => state.lotItem)

    const {
        fetchLotItem,
        increaseLotItemPage,
        decreaseLotItemPage,
        getFirstLotItemPage,
        getLastLotItemPage,
        changeLotItemLimit,
        resetLotItemState,
    } = useActions()

    const paginationProps: PaginationProps = {
        increasePage: () => increaseLotItemPage(),
        decreasePage: () => decreaseLotItemPage(),
        getFirstPage: () => getFirstLotItemPage(),
        getLastPage: () => getLastLotItemPage(),
        changeLimit: (limit) => changeLotItemLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    useEffect(() => {
        resetLotItemState();
    }, [location])

    useEffect(() => {
        fetchLotItem(page, limit, lot_id);
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
                Информация по квазипартии: {data.header.lot_name}
            </div>
            <div className={classes.pageSubHeader}>
                <div>{data.header.product_name}</div>
                <div>Торговое название: {data.header.trademark_name}</div>
                <div>Партия производителя: {data.header.manufacturer_lot_name}</div>
            </div>
            <div className={classes.pageTableContainer}>
                <LotItemTable items={data.rows}/>
            </div>
            <Pagination {...paginationProps}/>
        </div>
    );
};

export default LotDetail;