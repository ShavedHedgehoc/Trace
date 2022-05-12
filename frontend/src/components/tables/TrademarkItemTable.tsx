import React from "react";
import classes from "../../styles/Table.module.css"
import {RouteNames} from "../../router";
import {Link} from "react-router-dom";
import {ITrademarkItemRow} from "../../types/trademarkItem";


interface TableProps {
    items: ITrademarkItemRow[];
}

export default function ProductItemTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Варка'},
        {id: '2', label: 'Артикул'},
        {id: '3', label: 'Дата'},
        {id: '4', label: 'Площадка'},
        {id: '5', label: 'Переход'},
    ];

    return (
        <table className={classes.tableContainer}>
            <thead>
            <tr>
                {columns.map(column =>
                    <th className={classes.tableTh} key={column.id}>{column.label}</th>
                )}
            </tr>
            </thead>
            <tbody>
            {props.items.map((item) => (
                <tr
                    className={classes.tableRow}
                    key={item.boil_id}>
                    <td className={classes.tableTd}>
                        {item.boil_name}
                    </td>
                    <td className={classes.tableTd}>
                        {item.product_name}
                    </td>
                    <td className={classes.tableTd}>
                        {item.date}
                    </td>
                    <td className={classes.tableTd}>
                        {item.plant}
                    </td>
                    <td className={classes.tableTd}>
                        <Link
                            className={classes.tableLink}
                            to={`${RouteNames.BOILS}/${item.boil_id}`}
                        >
                            Варка
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}