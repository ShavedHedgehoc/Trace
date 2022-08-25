import React, { useEffect } from 'react';
import classes from "../../styles/Page.module.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import Pagination, { PaginationProps } from "../utils/Pagination";
import LoadingHandler from "../utils/LoadingHandler";
import Modal from "../utils/Modal";
import NoDataHandler from "../utils/NoDataHandler";
import { useLocation } from 'react-router-dom';
import CellsContainTable from '../tables/CellsContainTable';
import CellsContainForm, { CellsContainFormProps } from '../forms/CellContainForm';
import { changeCellsContainFilter, resetCellsContainFilter } from '../../store/action-creators/cellsContain';
import { useDebounce } from '../../hooks/useDebounce';


const CellsContain: React.FC = (): JSX.Element => {
    const location = useLocation()

    const { data, loading, error, page, limit, filter, init } = useTypedSelector(state => state.cellsContain)
    const { user } = useTypedSelector(state => state.auth)

    const {
        fetchCellsContains,
        increaseCellsContainPage,
        decreaseCellsContainPage,
        getFirstCellsContainPage,
        getLastCellsContainPage,
        changeCellsContainLimit,
        changeCellsContainFilter,
        resetCellsContainFilter,
        resetCellsContainState
    } = useActions()

    const debouncedFilter = useDebounce(filter, 800)

    const paginationProps: PaginationProps = {
        increasePage: () => increaseCellsContainPage(),
        decreasePage: () => decreaseCellsContainPage(),
        getFirstPage: () => getFirstCellsContainPage(),
        getLastPage: () => getLastCellsContainPage(),
        changeLimit: (limit) => changeCellsContainLimit(limit),
        loading: loading,
        page: page,
        limit: limit,
        total: data.total
    }

    const cellsContainFormProps: CellsContainFormProps = {
        filter: filter,
        changeFilter: ({ key, value }) => changeCellsContainFilter({ key, value }),
        resetFilter: () => resetCellsContainFilter()
    }


    useEffect(() => {
        resetCellsContainState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        fetchCellsContains(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, debouncedFilter])

    useEffect(() => {
        fetchCellsContains(page, limit, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                <LoadingHandler />
            </div>
        )
    }

    return (
        <div className={classes.pageContainer}>
            <Modal visible={loading}><LoadingHandler /></Modal>
            <div className={classes.pageHeader}>Содержимое ячеек</div>
            <div className={classes.pageFormContainer}>
                <CellsContainForm {...cellsContainFormProps} />
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0 ? <NoDataHandler limit={limit} /> : user?.roles && <CellsContainTable items={data.rows} roles={user.roles} />}
            </div>
            <Pagination {...paginationProps} />
        </div>
    );
};

export default CellsContain;