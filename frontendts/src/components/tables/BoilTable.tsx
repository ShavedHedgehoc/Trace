import React from "react";
import {IBoilData} from "../../types/boil";
import classes from "./Table.module.css"
import {useNavigate} from 'react-router-dom'
import {RouteNames} from "../../router";

interface TableProps {
    items: IBoilData[];
}

export default function Table(props: TableProps) {

    let navigate = useNavigate();
    const redirectToBoil = (name: string) => {
        navigate(`${RouteNames.BOILS}/${name}`)
    }

    const columns = [
        {id: '1', label: 'Варка', align: 'center', width: '140px', value: 'name'},
        {id: '2', label: 'Артикул', align: 'center', width: '200px',},
        {id: '3', label: 'Дата', align: 'center', width: '100px',},
        {id: '4', label: 'Месяц', align: 'center', width: '120px',},
        {id: '5', label: 'Год', align: 'center', width: '120px',},
        {id: '6', label: 'Площадка', align: 'center', width: '120px',},
        {id: '7', label: 'Переход', align: 'center', width: '140px',},
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
                        <button onClick={() => redirectToBoil(item.name)} className={classes.tableButton}>
                            Данные
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}