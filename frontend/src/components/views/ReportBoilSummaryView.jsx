import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { navigate } from "hookrouter";
import LoadingHandler from '../ui/handlers/LoadingHandler.jsx';
import ErrorHandler from '../ui/handlers/ErrorHandler';
import { useFetching } from '../hooks/useFetching.js';
import { OutlinedInput, Typography, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import ReportBoilSummaryTable from '../tables/ReportBoilSummaryTable.jsx';

const setDates = () => {
    let today = new Date();
    let todayDay = today.getDate()
    let endDay = todayDay - 1;
    let strEndDay = String(endDay).padStart(2, '0');
    let month = today.getMonth() + 1;
    let strMonth = String(month).padStart(2, '0');
    let strYear = String(today.getFullYear());
    let startDate = strYear + '-' + strMonth + '-01';
    let endDate = strYear + '-' + strMonth + '-' + strEndDay;
    return [startDate, endDate];

}

function useDebounce(value, wait = 500) {
    const [deboncedValue, setDeboncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeboncedValue(value);
        }, wait);
        return () => clearTimeout(timer);
    }, [value, wait]);
    return deboncedValue;
}

const ReportBoilSummaryView = () => {

    const [searchString, setSearchString] = useState(
        {
            'startDateString': setDates()[0],
            'endDateString': setDates()[1],
            'plantString': '-'
        }
    );
    const [plantItems, setPlantItems] = useState([]);

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(15);
    const [page, setPage] = useState(0);

    const initRender = useRef(false);
    const debounceSearchString = useDebounce(searchString, 500);

    const apiUrl = `/api/v1/boils_report?page=${page}&per_page=${perPage}` +
        `&start_date=${searchString.startDateString}` +
        `&end_date=${searchString.endDateString}` +
        `&plant=${searchString.plantString}`;

    const [fetchData, pending, errorMessage] = useFetching(async () => {
        const response = await axios.get(apiUrl);
        setData(response.data.data);
        setTotalRows(response.data.total);
        setPlantItems(response.data.plant_selector_options);
    })

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handlePerRowsChange = async (event) => {
        setPerPage(parseInt(event.target.value, 10));
    }

    const clickRedirectToBoil = (batchName) => {
        navigate("/boils/" + batchName);
    }
    
    const clickRedirectToCard = (batchName) => {
        navigate("/report_boil_summary/" + batchName);
    }

    useEffect(() => {
        if (initRender.current) {
            if (page === 0) { fetchData(); } else { setPage(0); }
        } // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [perPage]);

    useEffect(() => {
        if (initRender.current) { fetchData() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        fetchData();
        initRender.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (initRender.current) {
            if (page === 0) {
                fetchData();
            } else {
                setPage(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearchString]);

    // useEffect(() => { console.log(searchString.startDateString) }, [searchString]);
    return (
        <>
            <LoadingHandler visible={pending}>Loading...</LoadingHandler>
            {errorMessage
                ?
                <ErrorHandler>{errorMessage}</ErrorHandler>
                : <>
                    <Box
                        sx={{
                            backgroundColor: '#4db6ac',
                            padding: "5px",
                            borderRadius: "5px"
                        }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                textAlign: "center"
                            }}
                        >
                            Отчет по сходимости варок
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: '#b2dfdb',
                                padding: "5px",
                                borderRadius: "5px"
                            }}
                        >
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{
                                    textAlign: "center"
                                }}
                            >
                                Выберите площадку, даты начала и конца отчета:
                            </Typography>
                            <OutlinedInput
                                sx={{
                                    // width: "100%",
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                type="date"
                                size='small'
                                color='success'
                                value={searchString.startDateString}
                                onChange={(event) => {
                                    setSearchString(prevState => ({
                                        ...prevState,

                                        'startDateString': event.target.value
                                    }));
                                }}

                            />
                            <OutlinedInput
                                sx={{
                                    // width: "100%",
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                type="date"
                                size='small'
                                color='success'
                                value={searchString.endDateString}
                                onChange={(event) => {
                                    setSearchString(prevState => ({
                                        ...prevState,

                                        'endDateString': event.target.value
                                    }));
                                }}

                            />
                            <Select size='small'
                                color='success'
                                sx={{
                                    fontStyle: 'italic',
                                    fontSize: '14px',
                                    backgroundColor: 'white'
                                }}
                                value={searchString.plantString}
                                defaultValue='-'
                                onChange={(event) => {
                                    setSearchString(prevState => ({
                                        ...prevState,
                                        'plantString': event.target.value
                                    }));
                                }}
                            >
                                <MenuItem value='-' sx={{ fontSize: '14px' }}><em>Все</em></MenuItem>
                                {plantItems.map((item) =>
                                    <MenuItem key={item.key} value={item.key} sx={{ fontSize: '14px' }}><em>{item.value}</em></MenuItem>
                                )}
                            </Select>
                        </Box>
                    </Box>
                    <ReportBoilSummaryTable
                        data={data}
                        // headerData={headerData}
                        totalRows={totalRows}
                        perPage={perPage}
                        page={page}
                        handlePageChange={handlePageChange}
                        handlePerRowsChange={handlePerRowsChange}
                        clickRedirectToBoil={clickRedirectToBoil}                        
                        clickRedirectToCard={clickRedirectToCard} 
                    />
                </>
            }
        </>
    );

};
export default ReportBoilSummaryView;