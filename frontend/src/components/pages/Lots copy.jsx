import React from 'react';
import LotView from '../views/LotView';
import classes from "./Pages.module.css";
import { Paper } from '@mui/material';

const Lots = () => {
    return (
        <div className={classes.page__content}>
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    padding: '20px',
                    marginTop: '30px',                    
                }}>
                <LotView />
            </Paper>
        </div>
    );
};
export default Lots;