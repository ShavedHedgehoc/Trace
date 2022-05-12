import React from "react";
import classes from "../../styles/Table.module.css"
import {ILotItemRow} from "../../types/lotItem";
import {RouteNames} from "../../router";
import {Link} from "react-router-dom";

interface TableProps {
    items: ILotItemRow[];
}

export default function LotItemTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Дата варки'},
        {id: '2', label: 'Варка'},
        {id: '3', label: 'Артикул'},
        {id: '4', label: 'Площадка'},
        {id: '5', label: 'Переход'},
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
                <tr className={classes.tableRow}
                    key={item.boil_name}>
                    <td className={classes.tableTd}>{item.date}</td>
                    <td className={classes.tableTd}>{item.boil_name}</td>
                    <td className={classes.tableTd}>{item.product_name}</td>
                    <td className={classes.tableTd}>{item.plant}</td>
                    <td className={classes.tableTd}>
                        <Link className={classes.tableLink} to={`${RouteNames.BOILS}/${item.boil_id}`}>Варка</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}