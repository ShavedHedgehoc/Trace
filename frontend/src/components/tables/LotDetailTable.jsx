import React from "react";
import {
    Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination,
} from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const LotDetailTable = (props) => {

    const columns = [
        { id: '1', label: 'Варка', align: 'center' },
        { id: '2', label: 'Артикул', align: 'center' },
        { id: '3', label: 'Дата варки', align: 'center' },
        { id: '4', label: 'Переход', align: 'center' },
    ];

    return (
        <TableContainer>
            <Box
                sx={{
                    backgroundColor: '#4db6ac',
                    padding: "10px",
                    borderRadius: "5px"
                }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ padding: "10px" }}
                >
                    Квазипартия: {props.headerData.lot_name}
                </Typography>
                <Box
                    sx={{
                        backgroundColor: '#b2dfdb',
                        padding: "10px",
                        borderRadius: "5px"
                    }}
                >
                    <Typography variant="body1" component="div">
                        {props.headerData.product_name}
                    </Typography>
                    {props.headerData.trademark_name
                        ?
                        <Typography variant="body1" component="div">
                            Торговое название: {props.headerData.trademark_name}
                        </Typography>
                        :
                        <></>
                    }
                    {props.headerData.trademark_name
                        ?
                        <Typography variant="body1" component="div">
                            Партия производителя: {props.headerData.manufacturer_lot_name}
                        </Typography>
                        :
                        <></>
                    }
                </Box>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                width={column.width}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align='center' >{row.name}</StyledTableCell>
                            <StyledTableCell align='center' >{row.product_name}</StyledTableCell>
                            <StyledTableCell align='center' >{row.date}</StyledTableCell>
                            <StyledTableCell align='center'>
                                <Button onClick={() => props.clickRedirectToBoil(row.name)}>Данные</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20]}
                            labelRowsPerPage={'Записей на странице:'}
                            labelDisplayedRows={({ from, to, count }) => `Записи ${from} - ${to} из ${count}`}
                            count={props.totalRows}
                            rowsPerPage={props.perPage}
                            page={(props.page > 0 && props.page >= props.totalRows / props.perPage) ? 0 : props.page}
                            onPageChange={props.handlePageChange}
                            onRowsPerPageChange={props.handlePerRowsChange}
                            ActionsComponent={TablePaginationActions}
                        />
                    </StyledTableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
};

export default LotDetailTable;