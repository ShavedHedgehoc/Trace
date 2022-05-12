import React from "react";
import classes from "../../styles/Table.module.css"
import {IConvergenceItemRow} from "../../types/convergenceItem";

interface TableProps {
    items: IConvergenceItemRow[];
}

export default function ConvergenceItemTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Код 1С'},
        {id: '2', label: 'Наименование'},
        {id: '3', label: 'План'},
        {id: '4', label: 'Факт'},
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
                    <td className={classes.tableTd}>{item.plan}</td>
                    <td className={classes.tableTd}>{item.fact}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}