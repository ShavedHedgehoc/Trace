import React from 'react';
import LotView from '../views/LotView';
import classes from "./Pages.module.css";
import { Paper, Typography } from '@mui/material';

const Lots = () => {
    return (
        <div className={classes.page__content}>
            <div style={{
                display:"flex",
                width:"100%",
                justifyContent:"left",
                padding:"20px"
                }}>
            <Typography variant="h5">Список квазипартий</Typography>
            </div>
            {/* <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    padding: '20px',
                    marginTop: '30px',                    
                }}> */}
                <LotView />
            {/* </Paper> */}
        </div>
    );
};
export default Lots;