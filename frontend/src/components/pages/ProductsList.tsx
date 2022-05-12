import React, {useEffect} from 'react';
import classes from "../../styles/Page.module.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import ProductForm, {ProductFormProps} from "../forms/ProductForm";
import ProductTable from "../tables/ProductTable";
import Pagination, {PaginationProps} from "../utils/Pagination";
import {useDebounce} from "../../hooks/useDebounce";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";

const ProductsList: React.FC = (): JSX.Element => {

    const {data, loading, error, page, limit, filter, init} = useTypedSelector(state => state.products)

    const {
        fetchProducts,
        increaseProductPage,
        decreaseProductPage,
        getFirstProductPage,
        getLastProductPage,
        changeProductLimit,
        changeProductFilter,
        clearProductFilter,
    } = useActions()

    const debouncedFilter = useDebounce(filter, 500)

    const paginationProps: PaginationProps = {
        increasePage: () => increaseProductPage(),
        decreasePage: () => decreaseProductPage(),
        getFirstPage: () => getFirstProductPage(),
        getLastPage: () => getLastProductPage(),
        changeLimit: (limit) => changeProductLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    const productFormProps: ProductFormProps = {
        changeFilter: ({key, value}) => changeProductFilter({key, value}),
        clearFilter: () => clearProductFilter(),
        filter: filter
    }

    useEffect(() => {
        fetchProducts(page, limit, filter);
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
            <div className={classes.pageHeader}>Список сырья</div>
            <div className={classes.pageFormContainer}>
                <ProductForm {...productFormProps} />
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0 ? <NoDataHandler limit={limit}/> : <ProductTable items={data.rows}/>}
            </div>
            <Pagination {...paginationProps} />
        </div>
    );
};

export default ProductsList;