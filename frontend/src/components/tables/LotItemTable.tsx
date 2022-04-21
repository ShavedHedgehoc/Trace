import React from "react";
import classes from "../../styles/Table.module.css"
import {ILotItemRow} from "../../types/lotItem";

interface TableProps {
    items: ILotItemRow[];
    redirect: (boil_name: string) => void;
}

export default function LotItemTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Варка'},
        {id: '2', label: 'Артикул'},
        {id: '3', label: 'Дата варки'},
        {id: '4', label: 'Переход'},
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
                    key={item.name}>
                    <td className={classes.tableTd}>{item.name}</td>
                    <td className={classes.tableTd}>{item.product_name}</td>
                    <td className={classes.tableTd}>{item.date}</td>
                    <td className={classes.tableTd}>
                        <button onClick={() => props.redirect(item.name)} className={classes.tableButton}>
                            Данные
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}