import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from "./Pages.module.css";
import { navigate } from "hookrouter";


import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import {

    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableFooter,
    TablePagination,
    Button,
} from '@mui/material';
import { Typography } from "@mui/material";
import LoadingHandler from '../ui/handlers/LoadingHandler.jsx'
import ErrorHandler from '../ui/handlers/ErrorHandler';


import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'
import SearchForm from '../forms/SearchForm';
import { Android } from '@mui/icons-material';



function useDebounce(value, wait = 500) {
    const [deboncedValue, setDeboncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeboncedValue(value);
        }, wait);
        return () => clearTimeout(timer);
    }, [value, wait]);
    return deboncedValue;
}

const Boils = () => {

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [monthItems, setMonthItems] = useState([]);
    const [yearItems, setYearItems] = useState([]);
    const [plantItems, setPlantItems] = useState([]);
    const [perPage, setPerPage] = useState(15);
    const [page, setPage] = useState(0);
    const [searchString, setSearchString] = useState([]);


    const [pending, setPending] = useState(true);
    const [fetchErr, setFetchErr] = useState(false);


    const getSearchString = (formSearchString) => {
        if (initRender.current) {
            setSearchString(formSearchString)
        }
    }

    const fetchBoils = async () => {
        setPending(true);
        setFetchErr(false);
        let apiUrl;
        if (initRender.current) {
            apiUrl = `/api/v1/boils?page=${page}` +
                `&per_page=${perPage}` +
                `&batch_search=${searchString.batchString ? searchString.batchString : ''}` +
                `&marking_search=${searchString.markingString ? searchString.markingString : ''}` +
                `&date_search=${searchString.dateString ? searchString.dateString : ''}` +
                `&month_search=${searchString.monthString ? searchString.monthString : '-'}` +
                `&year_search=${searchString.yearString ? searchString.yearString : '-'}` +
                `&plant_search=${searchString.plantString ? searchString.plantString : '-'}`
        } else {
            apiUrl = `/api/v1/boils?page=${page}&per_page=${perPage}`+
            `&batch_search=&marking_search=&date_search=&month_search=&year_search=&plant_search=`
        }

        try {
            const response = await axios.get(apiUrl);
            setData(response.data.boils.data);
            setPlantItems(response.data.boils.plant_selector_options);
            setMonthItems(response.data.boils.month_selector_options);
            setYearItems(response.data.boils.year_selector_options);
            setTotalRows(response.data.boils.total);
        } catch (err) {
            setFetchErr(true);
        } finally {
            setPending(false);
        };
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handlePerRowsChange = async (event) => {
        setPerPage(parseInt(event.target.value, 10));
    }

    const clickRedirect = (batchName) => {
        navigate("/boils/" + batchName);
    }

    const initRender = useRef(false);
    const debounceSearchString = useDebounce(searchString, 500);

    useEffect(() => {

        if (initRender.current) {
            if (page === 0) {
                fetchBoils();
            } else {
                setPage(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [perPage]);

    useEffect(() => {
        console.log("!")
        if (initRender.current) {
            if (page === 0) {
                fetchBoils();
            } else {
                setPage(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearchString]);
    // }, [searchString]);

    useEffect(() => {
        if (initRender.current) {
            fetchBoils();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        fetchBoils();
        initRender.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        { id: '1', label: 'Варка', align: 'center', width: '140px', },
        { id: '2', label: 'Артикул', align: 'center', width: '200px', },
        { id: '3', label: 'Дата', align: 'center', width: '100px', },
        { id: '4', label: 'Месяц', align: 'center', width: '120px', },
        { id: '5', label: 'Год', align: 'center', width: '120px', },
        { id: '6', label: 'Площадка', align: 'center', width: '120px', },
        { id: '7', label: 'Переход', align: 'center', width: '140px', },
    ];




    return (
        <div className={classes.page__content}>
            <LoadingHandler visible={pending}>Loading...</LoadingHandler>
            {!pending && fetchErr
                ? <ErrorHandler>Something went wrong...</ErrorHandler>
                :
                <>

                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "left",
                        // border: "0.5px solid lightgray",
                        // borderRadius: "5px",
                        margin: "10px"

                    }}><Typography variant="h5">Список варок</Typography></div>
                    <SearchForm callback={getSearchString} monthItems={monthItems} yearItems={yearItems} plantItems={plantItems} />
                    {initRender.current
                        ?
                        <TableContainer sx={{ border: "0.5px solid lightgray", }}>
                            <Table>
                                <TableHead>
                                    <StyledTableRow sx={{ background: "#e8ebed" }}>
                                        {columns.map((column) => (
                                            <StyledTableCell
                                                sx={{ fontSize: '14px', }}
                                                key={column.id}
                                                align={column.align}
                                                width={column.width}
                                            >
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                </TableHead>
                                {data.length > 0
                                    ?
                                    <TableBody>
                                        {data.map((row) => (
                                            <StyledTableRow key={row.batchid}>
                                                <StyledTableCell align='center' sx={{ background: "white" }}>{row.name}</StyledTableCell>
                                                <StyledTableCell align='center' sx={{ background: "#e8ebed" }}>{row.marking}</StyledTableCell>
                                                <StyledTableCell align='center' sx={{ background: "white" }}>{row.date}</StyledTableCell>
                                                <StyledTableCell align='center' sx={{ background: "#e8ebed" }}>{row.month}</StyledTableCell>
                                                <StyledTableCell align='center' sx={{ background: "white" }}>{row.year}</StyledTableCell>
                                                <StyledTableCell align='center' sx={{ background: "#e8ebed" }}>{row.plant}</StyledTableCell>
                                                <StyledTableCell align='center' sx={{ background: "white" }}>
                                                    <Button onClick={() => clickRedirect(row.name)}>Данные</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                    :
                                    <></>
                                }
                                <TableFooter>
                                    <StyledTableRow sx={{ background: "#e8ebed" }}>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 15, 20, 50]}
                                            labelRowsPerPage={'Записей на странице:'}
                                            labelDisplayedRows={({ from, to, count }) => `Записи ${from} - ${to} из ${count}`}
                                            count={totalRows}
                                            rowsPerPage={perPage}
                                            page={page}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handlePerRowsChange}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </StyledTableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>

                        :
                        <></>
                    }
                </>
            }
        </div >
    );
}

export default Boils;