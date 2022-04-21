import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Pagination from "../utils/Pagination";
import LotTable from "../tables/LotTable";

const LotsList: React.FC = (): JSX.Element => {

    const {data, loading, error, page, limit} = useTypedSelector(state => state.lots);
    const {
        fetchLots,
        increaseLotsPage,
        decreaseLotsPage,
        getFirstLotsPage,
        getLastLotsPage,
        changeLotsLimit
    } = useActions()

    useEffect(() => {
        fetchLots(page, limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit])

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
            <div className={classes.pageHeader}>Квазипартии</div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0 ? <p>No data...</p> : <LotTable items={data.rows}/>}
            </div>
            <div>
                <Pagination
                    increasePage={() => increaseLotsPage()}
                    decreasePage={() => decreaseLotsPage()}
                    getFirstPage={() => getFirstLotsPage()}
                    getLastPage={() => getLastLotsPage()}
                    changeLimit={(limit) => changeLotsLimit(limit)}
                    page={page}
                    limit={limit}
                    total={data.total}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default LotsList;