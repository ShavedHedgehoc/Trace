import React from "react";
import classes from "../../styles/Table.module.css"
import {ILoadRow} from "../../types/boilItem";

interface TableProps {
    items: ILoadRow[];
}

export default function LoadTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Код  1С',},
        {id: '2', label: 'Наименование',},
        {id: '3', label: 'Квазипартия',},
        {id: '4', label: 'Загрузил',},
        {id: '5', label: 'Дата',},
        {id: '6', label: 'Время',},
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
                    key={item.product_id}>
                    <td className={classes.tableTd}>{item.product_id}</td>
                    <td className={classes.tableTdAlignLeft}>{item.product_name}</td>
                    <td className={classes.tableTd}>{item.lot}</td>
                    <td className={classes.tableTdAlignLeft}>{item.user}</td>
                    <td className={classes.tableTdAlignLeft}>{item.date}</td>
                    <td className={classes.tableTd}>{item.time}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}