import React from 'react';
import classes from "./Pages.module.css";
import { Paper } from '@mui/material';
import TrademarkView from '../views/TrademarkView';

const Trademarks = () => {
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
                <TrademarkView />
            </Paper>
        </div>
    );
};
export default Trademarks;