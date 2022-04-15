import React from 'react';
import classes from "./Pages.module.css";
import { Paper } from '@mui/material';
import TrademarkDetailView from '../views/TrademarkDetailView';

const Trademark = (props) => {
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
                    <TrademarkDetailView trademarkId={props.trademarkId}/>
            </Paper>
        </div>
    );
};
export default Trademark;