import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";
import Pagination from "../utils/Pagination";
import TrademarkTable from "../tables/TrademarkTable";

const TrademarksList = () => {
    const {data, loading, error, page, limit} = useTypedSelector(state => state.trademarks)
    const {
        fetchTrademarks,
        increaseTrademarkPage,
        decreaseTrademarkPage,
        getFirstTrademarkPage,
        getLastTrademarkPage,
        changeTrademarkLimit
    } = useActions()

    useEffect(() => {
        fetchTrademarks(page, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit])

    let navigate = useNavigate();
    const redirectToTrademark = (id: string) => {
        navigate(`${RouteNames.TRADEMARKS}/${id}`)
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
                    : <TrademarkTable
                        items={data.rows}
                        redirect={(trademark_id) => redirectToTrademark(trademark_id)}
                    />
                }
            </div>
            <div>
                <Pagination
                    increasePage={() => increaseTrademarkPage()}
                    decreasePage={() => decreaseTrademarkPage()}
                    getFirstPage={() => getFirstTrademarkPage()}
                    getLastPage={() => getLastTrademarkPage()}
                    changeLimit={(limit) => changeTrademarkLimit(limit)}
                    page={page}
                    limit={limit}
                    total={data.total}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default TrademarksList;