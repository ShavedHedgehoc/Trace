import React from "react";
import classes from "../../styles/Table.module.css"
import {IConvergenceRow} from "../../types/convergence";
import {RouteNames} from "../../router";
import {Link} from "react-router-dom";

interface TableProps {
    items: IConvergenceRow[];
    exactly: string;
}

export default function ConvergenceTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Дата'},
        {id: '2', label: 'Партия '},
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
                <tr
                    className={classes.tableRow}
                    key={item.batch_id}>
                    <td className={classes.tableTd}>{item.batch_date}</td>
                    <td className={classes.tableTd}>{item.batch_name}</td>
                    <td className={classes.tableTd}>{item.marking}</td>
                    <td className={classes.tableTd}>{item.plant}</td>
                    <td className={classes.tableTd}>
                        <Link className={classes.tableLink} to={`${RouteNames.BOILS}/${item.batch_id}`}>Варка</Link>
                        <Link className={classes.tableLink}
                              to={`${RouteNames.BOILS_CONVERGENCE_REPORT}/${item.batch_name}/${props.exactly}`}
                        >
                            Карточка
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}