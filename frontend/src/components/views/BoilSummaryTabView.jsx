import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import LoadingHandler from '../ui/handlers/LoadingHandler.jsx'
import ErrorHandler from '../ui/handlers/ErrorHandler';
import { useFetching } from '../hooks/useFetching.js';
import BoilSummaryTable from '../tables/BoilSummaryTable.jsx';

import { useReactToPrint } from 'react-to-print';
import ReportView from './ReportView.jsx';
import { IconButton } from '@mui/material';
import { PrintOutlined } from '@mui/icons-material';

const BoilSummaryTabView = (props) => {

    const [data, setData] = useState([]);

    const apiUrl = `/api/v1/boils/summary/${props.batchName}`;

    const [fetchData, pending, errorMessage] = useFetching(async () => {
        const response = await axios.get(apiUrl);
        setData(response.data.boil.data);
    })

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <LoadingHandler visible={pending}>Loading...</LoadingHandler>
            {errorMessage
                ?
                <ErrorHandler>{errorMessage}</ErrorHandler>
                :
                <>
                    {data.length > 0
                        ? <>
                            <div style={{ textAlign: "right" }}>
                                <IconButton onClick={handlePrint}
                                    sx={{
                                        fontSize: '35px',
                                        color: "lightgray",
                                        backgroundColor: "#4db6ac",
                                        ":hover": { 
                                            backgroundColor: "#4db6ac",
                                            color: "white" 
                                        },
                                        borderRadius: "5px",
                                    }}
                                >
                                    <PrintOutlined
                                        sx={{ padding: "5px" }}
                                    />
                                </IconButton>
                            </div>
                            <div style={{ display: "none" }}><ReportView ref={componentRef} data={data} /></div>
                            <BoilSummaryTable data={data} />
                        </>
                        :
                        <>Данные не найдены</>
                    }
                </>
            }
        </>
    )
};

export default BoilSummaryTabView;