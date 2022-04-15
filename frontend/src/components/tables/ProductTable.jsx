import React from "react";
import {
    TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination, IconButton,
} from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'
import { PageviewOutlined } from '@mui/icons-material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

const ProductTable = (props) => {

    const columns = [
        { id: '1', label: 'Квазипартия', align: 'center', width: '200px', },
        { id: '2', label: 'Дата прихода', align: 'center', width: '100px', },
        { id: '3', label: 'Поставщик', align: 'center' },
        { id: '4', label: 'Производитель', align: 'center' },
        { id: '5', label: 'Партия производителя', align: 'center', width: '200px', },
        { id: '6', label: 'Торговое название', align: 'center' },
    ];

    return (
        <TableContainer>
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
                            <StyledTableCell align='center' >
                                {row.lot_name}
                                <IconButton
                                    onClick={() => props.clickRedirectToLot(row.lot_id)}
                                >
                                    <PageviewOutlined />
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                {row.lot_date ? row.lot_date : '-'}
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                {row.seller_name ? row.seller_name : '-'}
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                {row.manufacturer_name ? row.manufacturer_name : '-'}
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                {row.manufacturer_lot_name ? row.manufacturer_lot_name : '-'}
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                {row.trademark_name ? row.trademark_name : '-'}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20]}
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

export default ProductTable;