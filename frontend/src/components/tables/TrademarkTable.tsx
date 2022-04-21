import React from "react";
import classes from "../../styles/Table.module.css";
import {ITrademarkRow} from "../../types/trademark";

interface TableProps {
    items: ITrademarkRow[];
    redirect: (trademark_id: string) => void;
}

export default function TrademarkTable(props: TableProps) {
    const columns = [
        { id: '1', label: 'Торговое название', align: 'left' },
        { id: '2', label: 'Код1С', align: 'center', width: '100px', },
        { id: '3', label: 'Наименование', align: 'left' },
        { id: '4', label: 'Переход', align: 'center', width: '100px', },
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
                    key={item.trademark_id}>
                    <td className={classes.tableTd}>{item.trademark_name}</td>
                    <td className={classes.tableTd}>{item.product_id}</td>
                    <td className={classes.tableTd}>{item.product_name}</td>
                    <td className={classes.tableTd}>
                        <button onClick={() => props.redirect(item.trademark_id)} className={classes.tableButton}>
                            Данные
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}