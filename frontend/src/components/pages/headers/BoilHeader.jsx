import React, { useState, useEffect, useRef } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from 'axios';


const BoilHeader = (props) => {

    const [batchData, setBatchData] = useState([]);

    const fetchData = async () => {
        const apiUrl = `/api/v1/boils/boildata/${props.batchName}`;
        try {
            const response = await axios.get(apiUrl);
            setBatchData(response.data.batch_data);
        } catch (err) {
            setBatchData(prevState => ({
                ...prevState,
                'name': props.batchName,
                'marking': 'Нет данных',
                'plant': 'Нет данных',
                'date': 'Нет данных',
            }));

        } finally { }

    };

    const initRender = useRef(false);

    useEffect(() => {
        if (initRender.current) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.batchName]);

    useEffect(() => {
        fetchData();
        initRender.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: '#4db6ac',
                padding: "10px",
                borderRadius: "5px"
            }}>
            <Typography
                variant="h5"
                component="div"
                sx={{ padding: "10px" }}
            >
                Данные по варке: {batchData['name']}
            </Typography>
            <Box
                sx={{
                    backgroundColor: '#b2dfdb',
                    padding: "10px",
                    borderRadius: "5px"
                }}
            >
                <Typography variant="body1" component="div">
                    Артикул: {batchData['marking']}
                </Typography>
                <Typography variant="body1" component="div">
                    Площадка: {batchData['plant']}
                </Typography>
                <Typography variant="body1" component="div">
                    Дата варки: {batchData['date']}
                </Typography>
            </Box>
        </Box>
    )
};
export default BoilHeader;