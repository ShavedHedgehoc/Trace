import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useLocation, useParams} from "react-router-dom";
import {Params} from "../../router";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Pagination, {PaginationProps} from "../utils/Pagination";
import ProductTmItemTable from "../tables/ProductTmItemTable";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";

const ProductTmDetail = () => {

    const location = useLocation()
    const params = useParams<Params.PRODUCT_TM_PARAMS>()
    const product_tm_id: string | undefined = params.product_tm_id
    const {data, loading, error, limit, page, init} = useTypedSelector(state => state.productTmItem)

    const {
        fetchProductTmItem,
        increaseProductTmItemPage,
        decreaseProductTmItemPage,
        getFirstProductTmItemPage,
        getLastProductTmItemPage,
        changeProductTmItemLimit,
        resetProductTmItemState,
    } = useActions()

    const paginationProps: PaginationProps = {
        increasePage: () => increaseProductTmItemPage(),
        decreasePage: () => decreaseProductTmItemPage(),
        getFirstPage: () => getFirstProductTmItemPage(),
        getLastPage: () => getLastProductTmItemPage(),
        changeLimit: (limit) => changeProductTmItemLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    useEffect(() => {
        resetProductTmItemState();
    }, [location])

    useEffect(() => {
        fetchProductTmItem(page, limit, product_tm_id);
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
                Отчет по варкам с продуктом
            </div>
            <div className={classes.pageSubHeader}>
                <div>Наименование: {data.header.product_name}</div>
                <div>Код 1С: {data.header.product_id}</div>
            </div>
            <div className={classes.pageTableContainer}>
                <ProductTmItemTable items={data.rows}/>
            </div>
            <Pagination {...paginationProps}/>
        </div>
    );
};

export default ProductTmDetail;