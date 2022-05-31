import React, { useEffect } from 'react';
import classes from '../../styles/Page.module.css';
import { Link, useParams } from "react-router-dom";
import { Params, RouteNames } from "../../router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import ConvergenceItemTable from "../tables/ConvergenceItemTable";
import { useBarcode } from 'react-barcodes';
import LoadingHandler from "../utils/LoadingHandler";
import { BsClipboardData } from 'react-icons/bs';

interface BarcodeProps {
    value: string | undefined;
}

function Barcode(props: BarcodeProps): JSX.Element {
    const val = props.value ?
        `(${props.value})(00)(0000)(000000)`
        : '(000000)(00)(0000)(000000)'
    const { inputRef } = useBarcode({
        value: val,
        options: {
            height: 30,
            width: 2,
            lineColor: '#121212',
            background: '#dd5',
            margin: 10,
            displayValue: false,

        }
    })
    return <img ref={inputRef} />
}

const BoilsConvergenceReportCard = () => {
    const params = useParams<Params.BOILS_CONVERGENCE_PARAMS_BOIL | Params.BOILS_CONVERGENCE_PARAMS_EXACTLY>()
    const boil_name = params.boil_name
    const exactly = params.exactly
    const { data, loading, error } = useTypedSelector(state => state.convergenceItem)

    const { fetchConvergenceItem } = useActions()


    useEffect(() => {
        fetchConvergenceItem(boil_name, exactly);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        <div className={classes.pageContainer}>
            <div className={classes.pageSpaceHeader}>
                Несовпадения по варке: {boil_name}
                <Link
                    className={classes.tableLink}
                    to={`${RouteNames.BOILS}/${data.batch_id}`}
                >
                    <BsClipboardData />
                </Link>
                <Barcode value={boil_name} />
            </div>
            <div className={classes.pageTableContainer}>
                <ConvergenceItemTable items={data.rows} />
            </div>
        </div>
    )
        ;
};

export default BoilsConvergenceReportCard;

