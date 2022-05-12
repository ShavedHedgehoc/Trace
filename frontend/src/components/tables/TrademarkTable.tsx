import React from "react";
import classes from "../../styles/Table.module.css";
import {ITrademarkRow} from "../../types/trademark";
import {RouteNames} from "../../router";
import {Link} from "react-router-dom";
import {BsClipboardData} from "react-icons/bs";

interface TableProps {
    items: ITrademarkRow[];
}

export default function TrademarkTable(props: TableProps) {
    const columns = [
        {id: '1', label: 'Торговое название'},
        {id: '2', label: 'Код 1С'},
        {id: '3', label: 'Наименование'},
        // { id: '4', label: 'Переход'},
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
                    key={item.trademark_id}>
                    <td className={classes.tableTdAlignLeft}>
                        {item.trademark_name}
                        <Link
                            className={classes.tableLink}
                            to={`${RouteNames.TRADEMARKS}/${item.trademark_id}`}
                        >
                            <BsClipboardData/>
                        </Link>
                    </td>
                    <td className={classes.tableTd}>{item.product_id}</td>
                    <td className={classes.tableTdAlignLeft}>
                        {item.product_name}
                        <Link
                            className={classes.tableLink}
                            to={`${RouteNames.PRODUCTS}/${item.product_id}`}
                        >
                            <BsClipboardData/>
                        </Link>
                    </td>
                    {/*<td className={classes.tableTd}>*/}
                    {/*    <Link className={classes.tableLink} to={`${RouteNames.TRADEMARKS}/${item.trademark_id}`}>Данные</Link>*/}
                    {/*</td>*/}
                </tr>
            ))}
            </tbody>
        </table>
    )
}