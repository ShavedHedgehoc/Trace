import { TableRow, TableCell, Paper } from '@mui/material';
import { withStyles } from '@mui/styles';

export const StyledTableRow = withStyles((theme) => ({
    root: {
        height: 40
    }
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
    root: {
        padding: "0px 16px"
    }
}))(TableCell);

export const StyledTableCellSearch = withStyles((theme) => ({
    root: {
        padding: "5px 16px"
    }
}))(TableCell);


export const StyledPaper = withStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: '20px',
        marginTop: '30px',
    }
}))(Paper);