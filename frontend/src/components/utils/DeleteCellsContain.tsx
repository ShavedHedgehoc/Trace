import React, { FC } from 'react';
import classes from "../../styles/DeleteWindow.module.css";
import { ICellsContainRow } from '../../types/cellsContain';

export interface DeleteCellsContainModalProps {
    id: string;
    item: Partial<ICellsContainRow>;
    handleClickYes: () => void;
    handleClickNo: () => void;
}



const DeleteCellsContain: FC<DeleteCellsContainModalProps> = (props) => {
    return (
        <div className={classes.deleteWindowContainer}>
            <div className={classes.deleteWindowHeader}>
                Вы действительно хотите удалить запись?
            </div>
            <div className={classes.deleteWindowBody}>
                <div>Ячейка: {props.item.cell_name}</div>
                <div>Код 1С: {props.item.product_id}</div>
                <div>Наименование: {props.item.product_name}</div>
                <div>Партия: {props.item.lot_name}</div>
                <div>Срок годности: {props.item.exp}</div>
            </div>
            <div className={classes.deleteWindowButtonBlock}>
                <a className={classes.deleteWindowLink} onClick={() => props.handleClickYes()}>Да, однозначно!</a>
                <a className={classes.deleteWindowLink} onClick={() => props.handleClickNo()}>Ой, не надо!</a>
            </div>
        </div>
    )
}

export default DeleteCellsContain;