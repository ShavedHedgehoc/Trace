import React, {useEffect} from 'react';
import classes from '../../styles/Page.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {Params, RouteNames} from "../../router";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import LotItemHeader from "../page_headers/LotItemHeader";
import Pagination from "../utils/Pagination";
import LotItemTable from "../tables/LotItemTable";

const LotDetail = () => {

    const params = useParams<Params.LOT_PARAMS>()
    const lot_id: string | undefined = params.lot_id
    const {data, loading, error, limit, page} = useTypedSelector(state => state.lotItem)

    const {
        fetchLotItem,
        increaseLotItemPage,
        decreaseLotItemPage,
        getFirstLotItemPage,
        getLastLotItemPage,
        changeLotItemLimit,
    } = useActions()

    useEffect(() => {
        fetchLotItem(page, limit, lot_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit])

    let navigate = useNavigate();
    const redirectToBoil = (boil_name: string) => {
        navigate(`${RouteNames.BOILS}/${boil_name}`)
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
            <div className={classes.pageHeader}>
                <LotItemHeader header={data.header}/>
            </div>
            <div className={classes.pageTableContainer}>
                <LotItemTable items={data.rows} redirect={(boil_name) => redirectToBoil(boil_name)}/>
            </div>
            <div>
                <Pagination increasePage={() => increaseLotItemPage()}
                            decreasePage={() => decreaseLotItemPage()}
                            getFirstPage={() => getFirstLotItemPage()}
                            getLastPage={() => getLastLotItemPage()}
                            changeLimit={(limit) => changeLotItemLimit(limit)}
                            loading={loading}
                            page={page}
                            limit={limit}
                            total={data.total}/>
            </div>


        </div>
    );
};

export default LotDetail;