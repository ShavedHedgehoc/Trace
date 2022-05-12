import React from "react";
import classes from "../../styles/Table.module.css"
import {IProductRow} from "../../types/product";
import {Link} from "react-router-dom";
import {RouteNames} from "../../router";

interface TableProps {
    items: IProductRow[];
}

export default function ProductTable(props: TableProps) {
    const columns = [
        {id: '1', label: 'Код 1С'},
        {id: '2', label: 'Наименование'},
        {id: '3', label: 'Переход'},
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
                    <td className={classes.tableTdAlignLeft}>{item.product_name}</td>
                    <td className={classes.tableTd}>
                        <Link className={classes.tableLink} to={`${RouteNames.PRODUCTS}/${item.product_id}`}>Квазипартии</Link>
                        <Link className={classes.tableLink} to={`${RouteNames.PRODUCT_TMS}/${item.product_id}`}>Варки</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}