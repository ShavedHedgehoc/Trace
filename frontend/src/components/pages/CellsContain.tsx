import React, { useEffect, useState } from 'react';
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
import { useDebounce } from '../../hooks/useDebounce';
import DeleteCellsContain from '../utils/DeleteCellsContain';
import { ICellsContainRow } from '../../types/cellsContain';



const CellsContain: React.FC = (): JSX.Element => {

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [deleteRowId, setDeleteRowId] = useState('')
    const [itemToDelete, setItemToDelete] = useState<Partial<ICellsContainRow>>({
        id: '', cell_id: '', cell_name: '', exp: '', lot_name: ''
    })

    const location = useLocation()

    const { data, loading, error, page, limit, filter, order, init } = useTypedSelector(state => state.cellsContain)
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
        changeCellsContainOrder,
        resetCellsContainState,
        deleteCellsContainById
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
        order: order,
        changeFilter: ({ key, value }) => changeCellsContainFilter({ key, value }),
        changeOrder: (value) => changeCellsContainOrder(value),
        resetFilter: () => resetCellsContainFilter()
    }


    useEffect(() => {
        resetCellsContainState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        fetchCellsContains(page, limit, filter, order);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, order, debouncedFilter])

    useEffect(() => {
        fetchCellsContains(page, limit, filter, order);
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


    const showDeleteModal = (id: string, item: ICellsContainRow) => {
        setDeleteRowId(id)
        setItemToDelete(item)
        setDeleteModalVisible(true)
    }

    const handleDeleteModalClickYes = () => {
        deleteCellsContainById(deleteRowId, page, limit, filter, order);
        setDeleteRowId('')
        setDeleteModalVisible(false)
    }

    const handleDeleteModalClickNo = () => {
        setDeleteRowId('')
        setDeleteModalVisible(false)
    }

    return (
        <div className={classes.pageContainer}>
            <Modal visible={loading}><LoadingHandler /></Modal>
            <Modal visible={deleteModalVisible}><DeleteCellsContain
                id={deleteRowId}
                item={itemToDelete}
                handleClickYes={handleDeleteModalClickYes} handleClickNo={handleDeleteModalClickNo} /></Modal>
            <div className={classes.pageHeader}>Содержимое ячеек</div>
            <div className={classes.pageFormContainer}>
                <CellsContainForm {...cellsContainFormProps} />
            </div>
            <div className={classes.pageTableContainer}>
                {data.rows.length === 0 ? <NoDataHandler limit={limit} /> : user?.roles && <CellsContainTable items={data.rows} roles={user.roles} delItem={showDeleteModal} />}
            </div>
            <Pagination {...paginationProps} />
        </div>
    );
};

export default CellsContain;