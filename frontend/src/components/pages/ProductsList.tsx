import React, {useEffect} from 'react';
import classes from "../../styles/Page.module.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Pagination from "../utils/Pagination";
import ProductTable from "../tables/ProductTable";
import LotTable from "../tables/LotTable";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";

const ProductsList: React.FC = (): JSX.Element => {
    const {data, loading, error, page, limit} = useTypedSelector(state => state.products)
    const {
        fetchProducts,
        increaseProductPage,
        decreaseProductPage,
        getFirstProductPage,
        getLastProductPage,
        changeProductLimit
    } = useActions()

    useEffect(() => {
        fetchProducts(page, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit])

    let navigate = useNavigate();
    const redirectToProduct = (id: string) => {
        navigate(`${RouteNames.PRODUCTS}/${id}`)
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
            <div className={classes.pageHeader}>Сырье</div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <p>No data...</p>
                    : <ProductTable
                        items={data.rows}
                        redirect={(product_id) => redirectToProduct(product_id)}
                    />
                }
            </div>
            <div>
                <Pagination
                    increasePage={() => increaseProductPage()}
                    decreasePage={() => decreaseProductPage()}
                    getFirstPage={() => getFirstProductPage()}
                    getLastPage={() => getLastProductPage()}
                    changeLimit={(limit) => changeProductLimit(limit)}
                    page={page}
                    limit={limit}
                    total={data.total}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ProductsList;