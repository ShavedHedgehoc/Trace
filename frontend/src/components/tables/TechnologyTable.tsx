import React from "react";
import classes from "../../styles/Table.module.css";
import { ITechnologyRow } from "../../types/boilItem";

interface TableProps {
  items: ITechnologyRow[];
}

export default function TechnologyTable(props: TableProps) {
  const columns = [
    { id: "1", label: "Код операции" },
    { id: "2", label: "Операция" },
    { id: "3", label: "Выполнил" },
    { id: "4", label: "Дата" },
    { id: "5", label: "Время" },
  ];

  return (
    <table className={classes.tableContainer}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th className={classes.tableTh} key={column.id}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item) => (
          <tr className={classes.tableRow} key={item.time}>
            <td className={classes.tableTd}>{item.op_code}</td>
            <td className={classes.tableTd}>{item.op_name}</td>
            <td className={classes.tableTd}>{item.user}</td>
            <td className={classes.tableTd}>{item.date}</td>
            <td className={classes.tableTd}>{item.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
