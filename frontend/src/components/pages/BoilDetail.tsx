import React, { useEffect, useState } from "react";
import classes from "../../styles/Page.module.css"
import { Link, useParams } from 'react-router-dom'
import { Params, RouteNames } from "../../router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import LoadingHandler from "../utils/LoadingHandler";
import SummaryTable from "../tables/SummaryTable";
import WeightingTable from "../tables/WeightingTable";
import LoadTable from "../tables/LoadTable";
import NoDataHandler from "../utils/NoDataHandler";
import { BsClipboardData } from "react-icons/bs";


const BoilDetail: React.FC = (): JSX.Element => {

    const params = useParams<Params.BOIL_PARAMS>()
    const boil_id: string | undefined = params.boil_id
    const [tab, setTab] = useState('Summary')
    const { data, loading, error } = useTypedSelector(state => state.boilItem)
    const { fetchBoilItem } = useActions()

    useEffect(() => {
        fetchBoilItem(boil_id);
    }, [])






    const tabs = (id: string) => {
        switch (id) {
            case 'Summary':
                return data.summaryRows.length === 0
                    ? <NoDataHandler />
                    : <SummaryTable items={data.summaryRows} />

            case 'Weighting':
                return data.weightingRows.length === 0
                    ? <NoDataHandler />
                    : <WeightingTable items={data.weightingRows} />
            case 'Load':
                return data.loadRows.length === 0
                    ? <NoDataHandler />
                    : <LoadTable items={data.loadRows} />
        }
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
                <LoadingHandler />
            </div>
        )
    }

    return (
        <div className={classes.pageContainer} >
            <div className={classes.pageSpaceHeader}>
                <div>Отчет по варке</div>
                <div className={classes.pageSubHeader}>
                    <Link
                        className={classes.tableLink}
                        to={`${RouteNames.BOIL_PDF}/${boil_id}`}
                    >
                        <BsClipboardData /> Отчет в PDF
                    </Link>
                </div>
            </div>
            <div className={classes.pageSubHeader}>
                <div>Номер варки: {data.header.boil_name}</div>
                <div>Артикул: {data.header.marking}</div>
                <div>Дата: {data.header.date}</div>
                <div>Площадка: {data.header.plant}</div>

            </div>
            <div className={classes.nestedNavigation}>
                <button
                    className={tab === 'Summary' ? classes.navButtonActive : classes.navButton}
                    id={'Summary'}
                    onClick={(e) => setTab(e.currentTarget.id)}>
                    Сводка
                </button>
                <button
                    className={tab === 'Weighting' ? classes.navButtonActive : classes.navButton}
                    id={'Weighting'}
                    onClick={(e) => setTab(e.currentTarget.id)}>
                    Взвешивания
                </button>
                <button
                    className={tab === 'Load' ? classes.navButtonActive : classes.navButton}
                    id={'Load'}
                    onClick={(e) => setTab(e.currentTarget.id)}>
                    Загрузки
                </button>
            </div>
            <div className={classes.pageTableContainer}>
                {tabs(tab)}
            </div>
        </div>
    )
}

export default BoilDetail;