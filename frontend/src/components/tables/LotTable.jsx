import React from "react";
import {
    TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination, IconButton,
} from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'
import { PageviewOutlined } from '@mui/icons-material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const LotTable = (props) => {

    const columns = [
        { id: '1', label: 'Квазипартия', align: 'center', width: '200px', },
        { id: '2', label: 'Наименование', align: 'center' },
        { id: '3', label: 'Торговое название', align: 'center' },
        { id: '4', label: 'Дата прихода', align: 'center', width: '100px', },
        { id: '5', label: 'Производитель', align: 'center' },
        { id: '6', label: 'Партия производителя', align: 'center', width: '100px', },
    ];

    return (
        <TableContainer >
            <Table>
                <TableHead>
                    <StyledTableRow sx={{ background: "#e8ebed" }}>
                        {columns.map((column) => (
                            <StyledTableCell
                                key={column.id}
                                align={column.align}
                                width={column.width}
                            >
                                {column.label}
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align='center' 
                            sx={{background:"white"}}>
                                {row.lot_name}
                                <IconButton
                                    onClick={() => props.clickRedirectToLot(row.lot_id)}
                                >
                                    <PageviewOutlined />
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align='center' sx={{ background: "#e8ebed" }}>{row.product_name}</StyledTableCell>
                            <StyledTableCell align='center' sx={{background:"white"}}>
                                {row.trademark_name ? row.trademark_name : '-'}
                            </StyledTableCell>
                            <StyledTableCell align='center' sx={{ background: "#e8ebed" }}>{row.lot_date}</StyledTableCell>
                            <StyledTableCell align='center' sx={{background:"white"}}>
                                {row.manufacturer_name ? row.manufacturer_name : '-'}
                            </StyledTableCell>
                            <StyledTableCell align='center' sx={{ background: "#e8ebed" }}>
                                {row.manufacturer_lot_name ? row.manufacturer_lot_name : '-'}
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow sx={{ background: "#e8ebed" }}>
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

export default LotTable;