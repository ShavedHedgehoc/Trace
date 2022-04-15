import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from "./Pages.module.css";
import { navigate } from "hookrouter";

import { KeyboardArrowUp, ClearOutlined } from '@mui/icons-material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import {
    IconButton,
    Select,
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableFooter,
    TablePagination,
    Button,
    InputAdornment,
    OutlinedInput,
    MenuItem,
} from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingHandler from '../ui/handlers/LoadingHandler.jsx'
import ErrorHandler from '../ui/handlers/ErrorHandler';


import { StyledTableRow, StyledTableCell, StyledTableCellSearch } from '../styled_components/StyledComponents.js'


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

    // need to add catch fetch error

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [monthItems, setMonthItems] = useState([]);
    const [yearItems, setYearItems] = useState([]);
    const [plantItems, setPlantItems] = useState([]);
    const [perPage, setPerPage] = useState(15);
    const [page, setPage] = useState(0);

    const [searchString, setSearchString] = useState(
        {
            'batchString': '',
            'markingString': '',
            'dateString': '',
            'monthString': '-',
            'yearString': '-',
            'plantString': '-'
        }
    );


    const [pending, setPending] = useState(true);
    const [fetchErr, setFetchErr] = useState(false);

    const fetchBoils = async () => {
        setPending(true);
        setFetchErr(false);
        const apiUrl = `/api/v1/boils?page=${page}` +
            `&per_page=${perPage}` +
            `&batch_search=${searchString.batchString}` +
            `&marking_search=${searchString.markingString}` +
            `&date_search=${searchString.dateString}` +
            `&month_search=${searchString.monthString}` +
            `&year_search=${searchString.yearString}` +
            `&plant_search=${searchString.plantString}`

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

        if (initRender.current) {
            if (page === 0) {
                fetchBoils();
            } else {
                setPage(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearchString]);

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
            <LoadingHandler visible={pending}>
                Loading...
            </LoadingHandler>



            {!pending && fetchErr
                ? <ErrorHandler>Something went wrong...</ErrorHandler>
                :
                <Paper
                    elevation={0}
                    // elevation={6}
                    sx={{
                        border:"1px solid lightgray",
                        display: 'flex',
                        // marginTop: '30px',
                        width: '100%',
                    }}
                >

                    {initRender.current
                        ?
                        <TableContainer
                            sx={{
                                padding: "20px 20px 0px 20px",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: '#4db6ac',
                                    padding: "5px",
                                    borderRadius: "5px"
                                }}>

                                <Box
                                    sx={{
                                        backgroundColor: '#b2dfdb',
                                        padding: "5px",
                                        borderRadius: "5px"
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{                                            
                                            textAlign: "center"
                                        }}
                                    >
                                        Список варок
                                    </Typography>
                                </Box>
                            </Box>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        {columns.map((column) => (
                                            <StyledTableCell
                                                sx={{
                                                    fontSize: '14px',
                                                }}
                                                key={column.id}
                                                align={column.align}
                                                width={column.width}
                                            >
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCellSearch align='center'>
                                            <OutlinedInput
                                                sx={{
                                                    width: "100%",
                                                    fontStyle: 'italic',
                                                    fontSize: '14px'
                                                }}
                                                size='small'
                                                color='success'
                                                value={searchString.batchString}
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'batchString': event.target.value
                                                    }));
                                                }}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onClick={() => {
                                                                setSearchString(prevState => ({
                                                                    ...prevState,
                                                                    'batchString': ''
                                                                }));
                                                            }}
                                                            edge="end"
                                                        >
                                                            <ClearOutlined />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </StyledTableCellSearch>
                                        <StyledTableCellSearch align='center'>
                                            <OutlinedInput
                                                sx={{
                                                    width: "100%",
                                                    fontStyle: 'italic',
                                                    fontSize: '14px'
                                                }}
                                                size='small'
                                                color='success'
                                                value={searchString.markingString}
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'markingString': event.target.value
                                                    }));
                                                }}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onClick={() => {
                                                                setSearchString(prevState => ({
                                                                    ...prevState,
                                                                    'markingString': ''
                                                                }));
                                                            }}
                                                            edge="end"
                                                        >
                                                            <ClearOutlined />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </StyledTableCellSearch>
                                        <StyledTableCell align='center'>
                                            <OutlinedInput
                                                sx={{
                                                    width: "100%",
                                                    fontStyle: 'italic',
                                                    fontSize: '14px'
                                                }}
                                                className={classes.cl}
                                                type="date"
                                                size='small'
                                                color='success'
                                                value={searchString.dateString}
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'monthString': '-',
                                                        'yearString': '-',
                                                        'plantString': '-',
                                                        'dateString': event.target.value
                                                    }));
                                                }}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onClick={() => {
                                                                setSearchString(prevState => ({
                                                                    ...prevState,
                                                                    'dateString': ''
                                                                }));
                                                            }}
                                                            edge="end"
                                                        >
                                                            <ClearOutlined />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <Select size='small'
                                                color='success'
                                                sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                                                value={searchString.monthString}
                                                defaultValue='-'
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'monthString': event.target.value
                                                    }));
                                                }}
                                            >
                                                <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                                                {monthItems.map((item) =>
                                                    <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                                                )}
                                            </Select>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <Select size='small'
                                                color='success'
                                                sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                                                value={searchString.yearString}
                                                defaultValue='-'
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'yearString': event.target.value
                                                    }));
                                                }}
                                            >
                                                <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                                                {yearItems.map((item) =>
                                                    <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                                                )}
                                            </Select>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <Select size='small'
                                                color='success'
                                                sx={{ width: '100%', fontStyle: 'italic', fontSize: '14px' }}
                                                value={searchString.plantString}
                                                defaultValue='-'
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'plantString': event.target.value
                                                    }));
                                                }}
                                            >
                                                <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                                                {plantItems.map((item) =>
                                                    <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                                                )}

                                            </Select>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <Button
                                                sx={{ width: '100%', fontStyle: 'italic' }}
                                                onClick={() => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'batchString': '',
                                                        'markingString': '',
                                                        'dateString': '',
                                                        'monthString': '-',
                                                        'yearString': '-',
                                                        'plantString': '-',
                                                    }));
                                                }}
                                            >Очистить</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>


                                {data.length > 0
                                    ?
                                    <TableBody>
                                        {data.map((row) => (
                                            <StyledTableRow key={row.batchid}>
                                                <StyledTableCell align='center' >{row.name}</StyledTableCell>
                                                <StyledTableCell align='center' >{row.marking}
                                                    <IconButton
                                                        onClick={() => {
                                                            setSearchString(prevState => ({
                                                                ...prevState,
                                                                'markingString': row.marking,
                                                            }));
                                                        }}
                                                    >
                                                        <KeyboardArrowUp />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell align='center'>{row.date}</StyledTableCell>
                                                <StyledTableCell align='center'>{row.month}</StyledTableCell>
                                                <StyledTableCell align='center'>{row.year}</StyledTableCell>
                                                <StyledTableCell align='center'>{row.plant}</StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    <Button onClick={() => clickRedirect(row.name)}>Данные</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                    :
                                    <></>
                                }
                                <TableFooter>
                                    <StyledTableRow>
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


                </Paper>
            }
        </div >
    );
}

export default Boils;