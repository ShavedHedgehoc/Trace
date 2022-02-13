import React, { useEffect, useState } from "react";
import data from "./data.json";
import axios from 'axios';

const App = () => {
    const [searchString, setSearchString] = useState('');
    const [tableData, setTableData] = useState(null);

    const sendSearchString = (event) => {
        event.preventDefault()
        fetchData(searchString);
        setSearchString('');
    }

    async function fetchData(batchName) {
        try {
            const response = await axios.get('/api/v1/boils/summary/' + batchName);
            setTableData(response.data);
        } catch (err) {
            setTableData(null);
        }
    }
    
    return (
        <div className="main">
            <div className="search-form">
                <input type="text"
                    value={searchString}
                    onChange={(event) => (setSearchString(event.target.value))}>
                </input>
                <button onClick={(event) => (sendSearchString(event))}>
                    Send
                </button>
            </div>
            <div className="content">
                {tableData
                    ? <>
                        <div className="content__header">
                            <p>Партия: {tableData.boil.name}</p>
                            <p>Площадка: {tableData.boil.plant}</p>
                            <p>Дата: {tableData.boil.date}</p>
                        </div>
                        <div className="content__table">
                            <table>
                                <thead>
                                    <tr className="table_header">
                                        <th>Код 1С</th>
                                        <th>Наименование</th>
                                        <th>План</th>
                                        <th>Факт</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.boil.data.map((row, number) => (
                                        <tr className="row" key={number}>
                                            <td className="cell" >{row.product_id}</td>
                                            <td className="cell" >{row.product_name}</td>
                                            <td className="cell" >{row.plan}</td>
                                            <td className="cell" >{row.fact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                    : <h1>No  data</h1>
                }
            </div>
        </div>
    )
};
export default App;