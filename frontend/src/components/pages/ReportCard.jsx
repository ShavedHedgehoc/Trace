import React from 'react';
import classes from "./Pages.module.css";
import { Paper } from '@mui/material';
import ReportCardView from '../views/ReportCardView.jsx';

const ReportCard = (props) => {

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
                
                {/* <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    // padding: '20px',
                    marginTop: '30px',
                }}
                > */}
                <ReportCardView batchName={props.batchName} />
                {/* </div> */}
            </Paper>
        </div>
    );
}

export default ReportCard;