import React from "react";
import {
    TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination,
} from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

const TrademarkTable = (props) => {

    const columns = [
        { id: '1', label: 'Торговое название', align: 'left' },        
        { id: '2', label: 'Код1С', align: 'center', width: '100px', },
        { id: '3', label: 'Наименование', align: 'left' },
        { id: '4', label: 'Переход', align: 'center', width: '100px', },
    ];

    return (
        <TableContainer>
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
                        Список торговых названий
                    </Typography>
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
                            <StyledTableCell align='left' >{row.trademark_name}</StyledTableCell>
                            {/* <StyledTableCell align='left' >{row.lot_name}</StyledTableCell> */}
                            <StyledTableCell align='center' >{row.product_id}</StyledTableCell>
                            <StyledTableCell align='left' >{row.product_name}</StyledTableCell>
                            <StyledTableCell align='center'>
                                <Button onClick={() => props.clickRedirectToTrademark(row.trademark_id)}>Данные</Button>
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
        </TableContainer>
    );
};

export default TrademarkTable;