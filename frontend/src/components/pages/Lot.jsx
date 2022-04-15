import React from 'react';
import classes from "./Pages.module.css";
import { Paper } from '@mui/material';
import LotDetailView from '../views/LotDetailView.jsx';

const Lot = (props) => {

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
                <LotDetailView lotId={props.lotId} />
            </Paper>
        </div>
    );
}

export default Lot;