import React from "react";
import classes from "../../styles/Table.module.css"
import {IWeightingRow} from "../../types/boilItem";
import {Link} from "react-router-dom";
import {RouteNames} from "../../router";
import {BsClipboardData} from "react-icons/bs";

interface TableProps {
    items: IWeightingRow[];
}

export default function WeightingTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Код  1С'},
        {id: '2', label: 'Наименование'},
        {id: '3', label: 'Квазипартия',},
        {id: '4', label: 'Взвесил',},
        {id: '5', label: 'Количество',},
        {id: '6', label: 'Дата',},
        {id: '7', label: 'Время',},
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
                    <td className={classes.tableTd} style={{minWidth:"280px"}}>
                        {item.lot}
                        <Link className={classes.tableLink} to={`${RouteNames.LOTS}/${item.lot_id}`} ><BsClipboardData/></Link>
                    </td>
                    <td className={classes.tableTdAlignLeft} style={{minWidth:"150px"}}>{item.user}</td>
                    <td className={classes.tableTd}>
                        {parseFloat(item.quantity)}
                    </td>
                    <td className={classes.tableTdAlignLeft} style={{minWidth:"100px"}}>{item.date}</td>
                    <td className={classes.tableTd}>{item.time}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}