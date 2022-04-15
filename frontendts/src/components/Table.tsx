import React, { FC } from "react";
import { IBoilData } from "../types/boil";

interface TableProps<T> {
    items: IBoilData[];
}

export default function Table<T>(props: TableProps<T>) {
    return (
        <table>
            <tbody>
                {props.items.map((item) => (

                    <tr key={item.batchid}>
                        <td>{item.name}</td>
                        <td>{item.marking}</td>
                        <td>{item.date}</td>
                        <td>{item.month}</td>
                        <td>{item.year}</td>
                        <td>{item.plant}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}