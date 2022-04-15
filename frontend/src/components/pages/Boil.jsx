import React, { useState } from 'react';
import classes from "./Pages.module.css";
import { Tab, Paper } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';

// problem with override row and cell styles
// import { StyledPaper } from '../styled_components/StyledComponents';

import BoilHeader from './headers/BoilHeader';
import BoilSummaryTabView from '../views/BoilSummaryTabView';
import BoilLoadTabView from '../views/BoilLoadTabView';
import BoilWeightingTabView from '../views/BoilWeightingTabView';


const Boil = (props) => {

    const [tabValue, setTabValue] = useState('1');

    const changeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className={classes.page__content}>
            <Paper elevation={6}
                sx={{
                    display: 'flex',
                    width: '100%',                    
                    flexDirection: 'column',
                    padding: '20px',
                    // marginTop: '30px',                                        
                }}>
                <BoilHeader batchName={props.batchName} />
                <TabContext value={tabValue}>
                    <TabList onChange={changeTab}>
                        <Tab label="Сводка" value="1" />
                        <Tab label="Взвешивание" value="2" />
                        <Tab label="Загрузки" value="3" />
                        {/* <Tab label="Торговые названия" value="4" /> */}
                    </TabList>
                    <TabPanel value="1">
                        <BoilSummaryTabView batchName={props.batchName} />
                    </TabPanel>
                    <TabPanel value="2">
                        <BoilWeightingTabView batchName={props.batchName} />
                    </TabPanel>
                    <TabPanel value="3">
                        <BoilLoadTabView batchName={props.batchName} />
                    </TabPanel>
                    {/* <TabPanel value="4">
                        Торговые названия
                    </TabPanel> */}
                </TabContext>
            </Paper>
        </div>
    );
}

export default Boil;
