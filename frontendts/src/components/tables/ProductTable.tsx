import React from "react";
import classes from "./Table.module.css"
import {IProductRow} from "../../types/product";

interface TableProps {
    items: IProductRow[];
    redirect: (product_id: string) => void;
}

export default function ProductTable(props: TableProps) {
    const columns = [
        {id: '1', label: 'Код 1С', align: 'center', width: '140px',},
        {id: '2', label: 'Наименование', align: 'left',},
        {id: '3', label: 'Переход', align: 'center', width: '140px',},
    ];

    return (
        <table className={classes.tableContainer}>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th className={classes.tableTh} key={column.id} >{column.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {props.items.map((item) => (
                <tr
                    className={classes.tableRow}
                    key={item.product_id}>
                    <td className={classes.tableTd}>{item.product_id}</td>
                    <td className={classes.tableTd}>{item.product_name}</td>
                    <td className={classes.tableTd}>
                        <button onClick={() => props.redirect(item.product_id)} className={classes.tableButton}>
                            Данные
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}