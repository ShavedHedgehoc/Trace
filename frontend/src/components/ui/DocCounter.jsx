import React, { useEffect } from 'react';
import axios from 'axios';

import { useFetching } from '../hooks/useFetching.js';
import { useInterval } from '../hooks/useInterval.js';
import { IconButton, Typography } from '@mui/material';
import { CircleRounded } from '@mui/icons-material';

const DocCounter = () => {

    const apiUrl = `/api/v1/doc_count`;
    const timeInterval = 10000;

    const [fetchData, pending, errorMessage] = useFetching(async () => {
        const response = await axios.get(apiUrl);
        localStorage.setItem('docCount', response.data.data);
        localStorage.setItem('docCountError', '');

    });

    useInterval(() => {
        fetchData();
    }, timeInterval);

    useEffect(() => {
        if (errorMessage) {
            localStorage.setItem('docCountError', errorMessage)
        }
    }, [errorMessage])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px 0px 10px",
                width: "300px"
            }}
        >
            <div>
                <IconButton disableRipple={true} disabled={true} >
                    <CircleRounded sx={{
                        fontSize: "18px",
                        color:
                            localStorage.getItem('docCountError') ? "coral" : "lightgray"
                    }} />
                    <CircleRounded sx={{
                        fontSize: "18px",
                        color: pending ? "yellow" : "lightgray"
                    }} />
                    <CircleRounded sx={{
                        fontSize: "18px",
                        color:
                            localStorage.getItem('docCountError')
                                ? "lightgray"
                                : pending
                                    ? "lightgray"
                                    : localStorage.getItem('docCount')
                                        ? "lightgreen"
                                        : "lightgray"
                    }} />
                </IconButton>
            </div>
            <div>
                <Typography variant="body2">
                    {localStorage.getItem('docCountError')
                        ? "Сервер не доступен..."
                        : `Документов на сервере: ${localStorage.getItem('docCount')
                            ? localStorage.getItem('docCount')
                            : "---"}`}
                </Typography>
            </div>
        </div>

    );
};

export default DocCounter;