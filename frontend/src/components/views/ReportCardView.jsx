import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoadingHandler from '../ui/handlers/LoadingHandler.jsx'
import ErrorHandler from '../ui/handlers/ErrorHandler';
import { useFetching } from '../hooks/useFetching.js';
import ReportCardTable from '../tables/ReportCardTable.jsx';
import Barcode from 'react-barcode';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const ReportCardView = (props) => {

    const [data, setData] = useState([]);

    const apiUrl = `/api/v1/boils_report/${props.batchName}`;

    const [fetchData, pending, errorMessage] = useFetching(async () => {
        const response = await axios.get(apiUrl);
        setData(response.data.boil.data);
    })

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <LoadingHandler visible={pending}>Loading...</LoadingHandler>
            {errorMessage
                ?
                <ErrorHandler>{errorMessage}</ErrorHandler>
                :
                <>
                    {data.length > 0
                        ?
                        <>
                            <Box
                                sx={{
                                    backgroundColor: '#4db6ac',
                                    padding: "10px",
                                    borderRadius: "5px"
                                }}>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{ padding: "5px", color: "white" }}
                                >
                                    Варка: {props.batchName}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "right",
                                        backgroundColor: '#b2dfdb',
                                        padding: "10px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "right",
                                            backgroundColor: "white",
                                            padding: "10px 5px 10px 5px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <Barcode
                                            value={`(${props.batchName})(00)(0000)(000000)`}
                                            background={"white"}
                                            height={"50px"}
                                            marginTop={"1px"}
                                            marginBottom={"1px"}
                                            width={"1px"}
                                            displayValue={false}
                                        />
                                    </Box>
                                </Box>
                            </Box>


                            {/* <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "right",
                                    backgroundColor: "white",
                                    padding: "20px 10px 10px 10px",
                             border: "1px solid #e0e0e0",
                                    borderRadius: "10px",
                                }}
                            > */}
                            
                                <ReportCardTable data={data} />
                            {/* </Box> */}
                        </>
                        :
                        <>Данные не найдены</>
                    }
                </>
            }
        </>
    )
};

export default ReportCardView;