import React from "react";
import classes from "../../styles/Table.module.css";
import { ITechnologyRow } from "../../types/boilItem";

interface TableProps {
  items: ITechnologyRow[];
}

export default function TechnologyTable(props: TableProps) {
  const columns = [
    { id: "1", label: "Код" },
    { id: "2", label: "Наименование" },
    { id: "3", label: "Квазипартия" },
    { id: "3", label: "Температура" },
    { id: "4", label: "Выполнил" },
    { id: "5", label: "Дата" },
    { id: "6", label: "Время" },
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
            <td className={item.op_type == "boil" ? classes.tableTdSelect: classes.tableTd}>{item.code}</td>
            <td className={item.op_type == "boil" ? classes.tableTdAlignLeftSelect: classes.tableTdAlignLeft}>{item.name}</td>
            <td className={classes.tableTd}>{item.lot? item.lot : "-"}</td>
            <td className={item.op_type == "boil" ? classes.tableTdSelect: classes.tableTd}>{item.temp? item.temp : "-"}</td>
            <td className={classes.tableTd}>{item.user}</td>
            <td className={classes.tableTd}>{item.date}</td>
            <td className={classes.tableTd}>{item.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
