import React from "react";
import { navigate } from "hookrouter";
import { PageviewOutlined } from '@mui/icons-material';
import { TableContainer, Table, TableBody, TableHead, IconButton, } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../styled_components/StyledComponents.js'



const BoilLoadTable = (props) => {

    const clickRedirectToLot = (lotname) => {
        navigate("/lots/" + lotname);
    };

    const columns = [
        { id: '1', label: 'Код  1С', align: 'center', width: '30px', },
        { id: '2', label: 'Наименование', align: 'center' },
        { id: '3', label: 'Квазипартия', align: 'center', width: '200px', },
        { id: '4', label: 'Загрузил', align: 'center', width: '140px', },
        { id: '5', label: 'Дата', align: 'center', width: '80px', },
        { id: '6', label: 'Время', align: 'center', width: '40px', },
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
                            <StyledTableCell align='center' >{row.product_id}</StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.product_name}
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                {row.lot}
                                <IconButton
                                    onClick={() => clickRedirectToLot(row.lot_id)}
                                >
                                    <PageviewOutlined />
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.user}</StyledTableCell>
                            <StyledTableCell align='center'>{row.date}</StyledTableCell>
                            <StyledTableCell align='center'>{row.time}</StyledTableCell>
                        </StyledTableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BoilLoadTable;