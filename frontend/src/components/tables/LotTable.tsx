import React from "react";
import classes from "../../styles/Table.module.css"
import {ILotRow} from "../../types/lot";
import {RouteNames} from "../../router";
import {Link} from "react-router-dom";

interface TableProps {
    items: ILotRow[];
}

export default function LotTable(props: TableProps) {
    const columns = [
        { id: '1', label: 'Квазипартия'},
        { id: '2', label: 'Наименование'},
        { id: '3', label: 'Торговое название'},
        { id: '4', label: 'Дата прихода' },
        { id: '5', label: 'Производитель'},
        { id: '6', label: 'Партия производителя'},
        {id: '7', label: 'Переход'},
    ];

    return (
        <table className={classes.tableContainer}>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th className={classes.tableTh} key={column.id}>{column.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {props.items.map((item) => (
                <tr
                    className={classes.tableRow}
                    key={item.lot_id}>
                    <td className={classes.tableTd}>{item.lot_name}</td>
                    <td className={classes.tableTdAlignLeft}>{item.product_name}</td>
                    <td className={classes.tableTdAlignLeft}>{item.trademark_name}</td>
                    <td className={classes.tableTd}>{item.lot_date}</td>
                    <td className={classes.tableTdAlignLeft}>{item.manufacturer_name}</td>
                    <td className={classes.tableTd}>{item.manufacturer_lot_name}</td>
                    <td className={classes.tableTd}>
                        <Link className={classes.tableLink} to={`${RouteNames.LOTS}/${item.lot_id}`}>Данные</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}