import React from "react";

import {IBoilRow} from "../../types/boil";
import classes from "../../styles/Table.module.css"
import {Link} from 'react-router-dom'
import {RouteNames} from "../../router";

interface TableProps {
    items: IBoilRow[];
}

export default function BoilTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Варка'},
        {id: '2', label: 'Артикул'},
        {id: '3', label: 'Дата'},
        {id: '4', label: 'Месяц'},
        {id: '5', label: 'Год'},
        {id: '6', label: 'Площадка'},
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
                    key={item.batch_id}>
                    <td className={classes.tableTd}>{item.name}</td>
                    <td className={classes.tableTd}>{item.marking}</td>
                    <td className={classes.tableTd}>{item.date}</td>
                    <td className={classes.tableTd}>{item.month}</td>
                    <td className={classes.tableTd}>{item.year}</td>
                    <td className={classes.tableTd}>{item.plant}</td>
                    <td className={classes.tableTd}>
                        <Link className={classes.tableLink} to={`${RouteNames.BOILS}/${item.batch_id}`} state={{a:true}}>Данные</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
};