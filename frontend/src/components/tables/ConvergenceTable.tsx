import React from "react";
import classes from "../../styles/Table.module.css"
import {IConvergenceRow} from "../../types/convergence";

interface TableProps {
    items: IConvergenceRow[];
    redirect_to_boil: (boil_name: string) => void;
    redirect_to_card: (boil_name: string) => void;
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
                        <button onClick={() => props.redirect_to_boil(item.batch_name)} className={classes.tableButton}>
                            Варка
                        </button>
                        <button onClick={() => props.redirect_to_card(item.batch_name)} className={classes.tableButton}>
                            Карточка
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}