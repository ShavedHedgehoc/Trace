import React from "react";
import { TableContainer, Table, TableBody, TableHead, TableFooter } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'


const ReportCardTable = (props) => {

    const columns = [
        { id: '1', label: 'Код  1С', align: 'center', width: '60px', },
        { id: '2', label: 'Наименование', align: 'center', },        
        { id: '3', label: 'План', align: 'center', width: '30px', },
        { id: '4', label: 'Факт', align: 'center', width: '30px', },

    ];

    return (
        <TableContainer>
            <Table>
                <TableHead>                
                    <StyledTableRow
                    // sx={{
                    //     backgroundColor:"#26a69a",
                    //     color:"white"
                    // }}
                    >
                        {columns.map((column) => (
                            <StyledTableCell

                            // sx={{
                              
                            //     color:"white"
                            // }}
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
                    {props.data.map((row) => (
                        <StyledTableRow key={row.product_id}>
                            <StyledTableCell align='center' >{row.product_id}</StyledTableCell>
                            <StyledTableCell align='left' >{row.product_name}</StyledTableCell>                            
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
                {/* <TableFooter sx={{height:"40px"}}></TableFooter> */}
            </Table>
        </TableContainer>
    );
};

export default ReportCardTable;