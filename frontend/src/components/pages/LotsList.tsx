import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Pagination, {PaginationProps} from "../utils/Pagination";
import LotTable from "../tables/LotTable";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";

const LotsList: React.FC = (): JSX.Element => {
    // not use

    const {data, loading, error, page, limit, init} = useTypedSelector(state => state.lots);
    const {
        fetchLots,
        increaseLotsPage,
        decreaseLotsPage,
        getFirstLotsPage,
        getLastLotsPage,
        changeLotsLimit
    } = useActions()

    const paginationProps: PaginationProps = {
        increasePage: () => increaseLotsPage(),
        decreasePage: () => decreaseLotsPage(),
        getFirstPage: () => getFirstLotsPage(),
        getLastPage: () => getLastLotsPage(),
        changeLimit: (limit) => changeLotsLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

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
            <div className={classes.pageHeader}>Список квазипартий</div>
            <div className={classes.pageSubHeader}>
                Вставить в таблицу иконки со ссылками на всё и вся...
            </div>
            <div className={classes.pageSubHeader}>
                Прикрутить фильтроформу....
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0
                    ? <NoDataHandler/>
                    : <LotTable items={data.rows}/>}
            </div>
            <Pagination {...paginationProps} />
        </div>
    );
};

export default LotsList;