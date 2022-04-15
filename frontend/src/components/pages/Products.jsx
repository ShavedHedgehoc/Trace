import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from "./Pages.module.css";
import { navigate } from "hookrouter";

import { ClearOutlined } from '@mui/icons-material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import {
    IconButton,    
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,    
    TableRow,
    TableFooter,
    TablePagination,
    Button,
    InputAdornment,
    OutlinedInput,    
} from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingHandler from '../ui/handlers/LoadingHandler.jsx'
import ErrorHandler from '../ui/handlers/ErrorHandler';
import { StyledTableRow, StyledTableCell, StyledTableCellSearch } from '../styled_components/StyledComponents';

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

const Products = () => {

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [pending, setPending] = useState(true);
    const [fetchErr, setFetchErr] = useState(false);
    const [perPage, setPerPage] = useState(15);
    const [page, setPage] = useState(0);

    const [searchString, setSearchString] = useState(
        {
            'id': '',
            'name': '',
        }
    );

    const fetchProducts = async () => {
        setPending(true);
        setFetchErr(false);
        const apiUrl = `/api/v1/products?page=${page}` +
            `&per_page=${perPage}` +
            `&code_search=${searchString.id}` +
            `&name_search=${searchString.name}`;


        try {
            const response = await axios.get(apiUrl);
            setData(response.data.products.data);
            setTotalRows(response.data.products.total);
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

    const clickRedirectToLots = (productId) => {
        navigate("/products/" + productId);
    }

    const clickRedirectToBoils = (productId) => {
        navigate("/products_trademarks/" + productId);
    }

    const initRender = useRef(false);
    const debounceSearchString = useDebounce(searchString, 500);

    useEffect(() => {

        if (initRender.current) {
            if (page === 0) {
                fetchProducts();
            } else {
                setPage(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [perPage]);

    useEffect(() => {

        if (initRender.current) {
            if (page === 0) {
                fetchProducts();
            } else {
                setPage(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearchString]);

    useEffect(() => {
        if (initRender.current) {
            fetchProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        fetchProducts();
        initRender.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        { id: '1', label: 'Код 1С', align: 'center', width: '140px', },
        { id: '2', label: 'Наименование', align: 'center', },
        { id: '3', label: 'Переход', align: 'center', width: '140px', },
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
                    elevation={3}
                    sx={{
                        display: 'flex',
                        marginTop: '30px',
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
                                        Список сырья
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
                                                value={searchString.id}
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'id': event.target.value
                                                    }));
                                                }}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onClick={() => {
                                                                setSearchString(prevState => ({
                                                                    ...prevState,
                                                                    'id': ''
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
                                                value={searchString.name}
                                                onChange={(event) => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'name': event.target.value
                                                    }));
                                                }}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            onClick={() => {
                                                                setSearchString(prevState => ({
                                                                    ...prevState,
                                                                    'name': ''
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
                                            <Button
                                                sx={{ width: '100%', fontStyle: 'italic' }}
                                                onClick={() => {
                                                    setSearchString(prevState => ({
                                                        ...prevState,
                                                        'id': '',
                                                        'name': '',
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
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell align='center' >{row.id}</StyledTableCell>
                                                <StyledTableCell align='left' >{row.name}</StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    <Button onClick={() => clickRedirectToLots(row.id)}>Квази</Button>
                                                    <Button onClick={() => clickRedirectToBoils(row.id)}>Варки</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                    :
                                    <></>
                                }
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 15, 20]}
                                            labelRowsPerPage={'Записей на странице:'}
                                            labelDisplayedRows={({ from, to, count }) => `Записи ${from} - ${to} из ${count}`}
                                            count={totalRows}
                                            rowsPerPage={perPage}
                                            page={page}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handlePerRowsChange}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
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
};

export default Products;