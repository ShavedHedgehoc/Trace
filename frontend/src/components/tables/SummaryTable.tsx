import React from "react";
import classes from "../../styles/Table.module.css"
import {ISummaryRow} from "../../types/boilItem";
import Indicator from "../utils/Indicator";

interface TableProps {
    items: ISummaryRow[];
}

export default function SummaryTable(props: TableProps) {
    const columns = [
        {id: '1', label: 'Код  1С'},
        {id: '2', label: 'Наименование'},
        {id: '3', label: ''},
        {id: '4', label: 'План'},
        {id: '5', label: 'Факт'},
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
                    <td className={classes.tableTd}>
                        <Indicator plan={item.plan} fact={item.fact}/>
                    </td>
                    <td className={classes.tableTd}>
                        {item.plan ? `${parseFloat(item.plan)}` : `-`}
                    </td>
                    <td className={classes.tableTd}>
                        {item.fact ? `${parseFloat(item.fact)}` : `-`}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}