import React, {useEffect} from 'react';
import classes from "../../styles/Page.module.css";
import {useLocation, useParams} from "react-router-dom";
import {Params} from "../../router";
import Pagination, {PaginationProps} from "../utils/Pagination";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ProductItemForm, {ProductItemFormProps} from "../forms/ProductItemForm";
import {useDebounce} from "../../hooks/useDebounce";
import ProductItemTable from "../tables/ProductItemTable";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";

const ProductDetail = () => {

    const location = useLocation()
    const params = useParams<Params.PRODUCT_PARAMS>()
    const product_id: string | undefined = params.product_id
    const {data, loading, error, page, limit, filter, init} = useTypedSelector(state => state.productItem)

    const {
        fetchProductItem,
        increaseProductItemPage,
        decreaseProductItemPage,
        getFirstProductItemPage,
        getLastProductItemPage,
        changeProductItemLimit,
        changeProductItemFilter,
        clearProductItemFilter,
        resetProductItemState,
    } = useActions()

    const debouncedFilter = useDebounce(filter, 500)

    const paginationProps: PaginationProps = {
        increasePage: () => increaseProductItemPage(),
        decreasePage: () => decreaseProductItemPage(),
        getFirstPage: () => getFirstProductItemPage(),
        getLastPage: () => getLastProductItemPage(),
        changeLimit: (limit) => changeProductItemLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    const productItemFormProps: ProductItemFormProps = {
        changeFilter: ({key, value}) => changeProductItemFilter({key, value}),
        clearFilter: () => clearProductItemFilter(),
        filter: filter
    }

    useEffect(() => {
        resetProductItemState();
    }, [location])

    useEffect(() => {
        fetchProductItem(page, limit, product_id, filter);
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
            <div className={classes.pageHeader}>
                Отчет по сырью
            </div>
            <div className={classes.pageSubHeader}>
                <div>Наименование: {data.header.product_name}</div>
                <div> Код 1С: {data.header.product_id}</div>
            </div>
            <div className={classes.pageFormContainer}>
                <ProductItemForm {...productItemFormProps}/>
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <NoDataHandler limit={limit}/>
                    : <ProductItemTable items={data.rows}/>
                }
            </div>
            <Pagination {...paginationProps}/>
        </div>
    );
};

export default ProductDetail;