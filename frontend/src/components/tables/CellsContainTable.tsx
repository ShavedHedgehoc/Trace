import React from "react";
import classes from "../../styles/Table.module.css"

import { ICellsContainRow } from '../../types/cellsContain';

interface TableProps {
    items: ICellsContainRow[];
    roles: string[];
    delItem: (id: string) => void;
}

export default function CellsContainTable(props: TableProps) {

    const columns = [
        { id: '1', label: 'Ячейка' },
        { id: '2', label: 'Код 1С' },
        { id: '3', label: 'Наименование' },
        { id: '4', label: 'Партия' },
        { id: '5', label: 'Срок годности' },

    ];
    if (props.roles.includes("Specialist")) {
        columns.push({ id: '6', label: 'Действия' })
    }

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
                        key={item.id}>
                        <td className={classes.tableTd}>{item.cell_name}</td>
                        <td className={classes.tableTd}>{item.product_id}</td>
                        <td className={classes.tableTdAlignLeft}>{item.product_name}</td>
                        <td className={classes.tableTd}>{item.lot_name}</td>
                        <td className={classes.tableTd}>{item.exp}</td>
                        {props.roles.includes("Specialist") &&
                            <td className={classes.tableTd}>
                                <a className={classes.tableLink} onClick={() => props.delItem(item.id)}>Удалить запись</a>
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}