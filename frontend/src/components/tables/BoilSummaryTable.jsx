import React from "react";
import { TableContainer, Table, TableBody, TableHead } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'
import ColoredCircle from '../ui/ColoredCircle.jsx';

const BoilSummaryTable = (props) => {

    const columns = [
        { id: '1', label: 'Код  1С', align: 'center', width: '60px', },
        { id: '2', label: 'Наименование', align: 'center', },
        { id: '3', label: '', align: 'center', },
        { id: '4', label: 'План', align: 'center', width: '30px', },
        { id: '5', label: 'Факт', align: 'center', width: '30px', },

    ];

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        {columns.map((column) => (
                            <StyledTableCell
                                key={column.id}
                                align={column.align}
                                width={column.width}                            >
                                {column.label}
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <StyledTableRow key={row.product_id}>
                            <StyledTableCell align='center' >{row.product_id}</StyledTableCell>
                            <StyledTableCell align='left' >{row.product_name}</StyledTableCell>
                            <StyledTableCell align='left' >
                                <ColoredCircle plan={row.plan} fact={row.fact} />
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                {row.plan ? `${parseFloat(row.plan)}` : `-`}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                {row.fact ? `${parseFloat(row.fact)}` : `-`}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BoilSummaryTable;