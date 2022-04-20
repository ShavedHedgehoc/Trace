import React from "react";
import classes from "./Table.module.css"
import {useNavigate} from 'react-router-dom'
import {RouteNames} from "../../router";
import {ILotRow} from "../../types/lot";

interface TableProps {
    items: ILotRow[];
}

export default function LotTable(props: TableProps) {
    let navigate = useNavigate();
    const redirectToLot = (id: string) => {
        navigate(`${RouteNames.LOTS}/${id}`)
    }
    const columns = [
        { id: '1', label: 'Квазипартия', align: 'center', width: '200px', },
        { id: '2', label: 'Наименование', align: 'center' },
        { id: '3', label: 'Торговое название', align: 'center' },
        { id: '4', label: 'Дата прихода', align: 'center', width: '100px', },
        { id: '5', label: 'Производитель', align: 'center' },
        { id: '6', label: 'Партия производителя', align: 'center', width: '100px', },
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
                    key={item.lot_id}>
                    <td className={classes.tableTd}>{item.lot_name}</td>
                    <td className={classes.tableTd}>{item.product_name}</td>
                    <td className={classes.tableTd}>{item.trademark_name}</td>
                    <td className={classes.tableTd}>{item.lot_date}</td>
                    <td className={classes.tableTd}>{item.manufacturer_name}</td>
                    <td className={classes.tableTd}>{item.manufacturer_lot_name}</td>
                    <td className={classes.tableTd}>
                        <button onClick={() => redirectToLot(item.lot_id)} className={classes.tableButton}>
                            Данные
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}