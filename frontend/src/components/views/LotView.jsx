import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { navigate } from "hookrouter";
import LoadingHandler from '../ui/handlers/LoadingHandler.jsx'
import ErrorHandler from '../ui/handlers/ErrorHandler';
import LotTable from '../tables/LotTable.jsx';
import { useFetching } from '../hooks/useFetching.js';
import { Box } from '@mui/system';

const LotView = () => {

    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(15);
    const [page, setPage] = useState(0);

    const initRender = useRef(false);

    const apiUrl = `/api/v1/lots?page=${page}&per_page=${perPage}`;

    const [fetchData, pending, errorMessage] = useFetching(async () => {
        const response = await axios.get(apiUrl);
        setData(response.data.data);
        setTotalRows(response.data.total);
    })

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handlePerRowsChange = async (event) => {
        setPerPage(parseInt(event.target.value, 10));
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

    const clickRedirectToLot = (lotname) => {
        navigate("/lots/" + lotname);
    };

    return (
        <>
            <LoadingHandler visible={pending}>Loading...</LoadingHandler>
            {errorMessage
                ?
                <ErrorHandler>{errorMessage}</ErrorHandler>
                :
                // <>
                //     {data.length > 0
                //         ?
                // <Box

                //     sx={{
                //         background: "white",
                //     }}>
                    <LotTable
                        data={data}
                        totalRows={totalRows}
                        perPage={perPage}
                        page={page}
                        handlePageChange={handlePageChange}
                        handlePerRowsChange={handlePerRowsChange}
                        clickRedirectToLot={clickRedirectToLot}
                    />
                // </Box>
                //         :
                //         <>Данные не найдены</>
                //     }
                // </>
            }
        </>
    )
};

export default LotView;