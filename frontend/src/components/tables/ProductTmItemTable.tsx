import React from "react";
import classes from "../../styles/Table.module.css"
import {IProductTmItemRow} from "../../types/productTmItem";
import {RouteNames} from "../../router";
import {Link} from "react-router-dom";
import {BsClipboardData} from "react-icons/bs";

interface TableProps {
    items: IProductTmItemRow[];
}

export default function ProductTmItemTable(props: TableProps) {

    const columns = [

        {id: '1', label: 'Варка'},
        {id: '2', label: 'Артикул'},
        {id: '3', label: 'Дата варки'},
        {id: '4', label: 'Площадка'},
        {id: '4', label: 'Квазипартия'},
        {id: '5', label: 'Торговое название'},
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
                    <td className={classes.tableTd}>
                        {item.boil_name}
                        <Link
                            className={classes.tableLink}
                            to={`${RouteNames.BOILS}/${item.boil_id}`}
                        >
                            <BsClipboardData/>
                        </Link>
                    </td>
                    <td className={classes.tableTd}>
                        {item.product_name || 'Нет данных'}
                    </td>
                    <td className={classes.tableTd}>
                        {item.boil_date || 'Нет данных'}

                    </td>
                    <td className={classes.tableTd}>
                        {item.plant || 'Нет данных'}
                    </td>
                    <td className={classes.tableTd}>
                        {item.lot_name}
                        <Link
                            className={classes.tableLink}
                            to={`${RouteNames.LOTS}/${item.lot_id}`}
                        >
                            <BsClipboardData/>
                        </Link>
                    </td>
                    <td className={classes.tableTd}>
                        {item.trademark_name || 'Нет данных'}
                        {item.trademark_name &&
                            <Link
                                className={classes.tableLink}
                                to={`${RouteNames.TRADEMARKS}/${item.trademark_id}`}
                            >
                                <BsClipboardData/>
                            </Link>
                        }
                    </td>

                    <td className={classes.tableTd}>

                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}