import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoadingHandler from '../ui/handlers/LoadingHandler.jsx';
import ErrorHandler from '../ui/handlers/ErrorHandler';
import { useFetching } from '../hooks/useFetching.js';
import BoilLoadTable from '../tables/BoilLoadTable.jsx';


const BoilLoadTabView = (props) => {

    const [data, setData] = useState([]);

    const apiUrl = `/api/v1/boils/load/${props.batchName}`;

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
                        <BoilLoadTable data={data} />
                        :
                        <>Данные не найдены</>
                    }
                </>
            }
        </>
    )
};

export default BoilLoadTabView;