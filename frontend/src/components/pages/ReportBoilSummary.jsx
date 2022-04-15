import React from "react";
import classes from "./Pages.module.css";
import { Paper } from '@mui/material';
import ReportBoilSummaryView from "../views/ReportBoilSummaryView";

const ReportBoilSummary = () => {
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
                <ReportBoilSummaryView />
            </Paper>
        </div>
    );

};
export default ReportBoilSummary;