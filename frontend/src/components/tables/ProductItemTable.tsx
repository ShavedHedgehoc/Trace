import React from "react";
import classes from "../../styles/Table.module.css"
import {IProductItemRow} from "../../types/productItem";
import {RouteNames} from "../../router";
import {BsClipboardData} from "react-icons/bs";
import {Link} from "react-router-dom";


interface TableProps {
    items: IProductItemRow[];
}

export default function ProductItemTable(props: TableProps) {

    const columns = [
        {id: '1', label: 'Квазипартия'},
        {id: '2', label: 'Дата прихода'},
        {id: '3', label: 'Поставщик'},
        {id: '4', label: 'Производитель'},
        {id: '5', label: 'Партия производителя'},
        {id: '6', label: 'Торговое название'},
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
                    key={item.lot_id}>
                    <td className={classes.tableTd} style={{minWidth: "280px"}}>
                        {item.lot_name}
                        <Link
                            className={classes.tableLink}
                            to={`${RouteNames.LOTS}/${item.lot_id}`}
                        >
                            <BsClipboardData/>
                        </Link>
                    </td>
                    <td className={classes.tableTd}>{item.lot_date || 'Нет данных'}</td>
                    <td className={classes.tableTd}>
                        {item.seller_name || 'Нет данных'}
                        {/*{item.seller_name &&*/}
                        {/*    <Link*/}
                        {/*        className={classes.tableLink}*/}
                        {/*        to={`${RouteNames.SELLERS}/${item.seller_id}`}*/}
                        {/*    >*/}
                        {/*        <BsClipboardData/>*/}
                        {/*    </Link>*/}
                        {/*}*/}
                    </td>
                    <td className={classes.tableTd}>
                        {item.manufacturer_name || 'Нет данных'}
                        {/*{item.manufacturer_name &&*/}
                        {/*    <Link*/}
                        {/*        className={classes.tableLink}*/}
                        {/*        to={`${RouteNames.MANUFACTURERS}/${item.manufacturer_id}`}*/}
                        {/*    >*/}
                        {/*        <BsClipboardData/>*/}
                        {/*    </Link>*/}
                        {/*}*/}
                    </td>
                    <td className={classes.tableTd}>
                        {item.manufacturer_lot_name || 'Нет данных'}
                        {/*{item.manufacturer_lot_name &&*/}
                        {/*    <Link*/}
                        {/*        className={classes.tableLink}*/}
                        {/*        to={`${RouteNames.MANUFACTURER_LOTS}/${item.manufacturer_lot_id}`}*/}
                        {/*    >*/}
                        {/*        <BsClipboardData/>*/}
                        {/*    </Link>*/}
                        {/*}*/}
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
                </tr>
            ))}
            </tbody>
        </table>
    );
}