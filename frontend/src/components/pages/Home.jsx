import React, { useEffect, useState } from 'react';
import classes from "./Pages.module.css";

import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useFetching } from '../hooks/useFetching.js';
import SearchForm from '../forms/SearchForm';
import { changeBoilsDataAction, handleErrorBoilsDataAction } from '../../store/boilsDataReducer';
import { fetchBoils } from '../../asyncActions/boils';

const Home = () => {



    const [perPage, setPerPage] = useState(15);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const formData = useSelector(state => state.boilsFormData.boilsFormData);
    const boilsData = useSelector(state => state.boilsData.boilsData);



    // const apiUrl = `/api/v1/boils?page=${page}` +
    //     `&per_page=${perPage}` +
    //     `&batch_search=${formData.batch}` +
    //     `&marking_search=${formData.marking}` +
    //     `&date_search=${formData.date}` +
    //     `&month_search=${formData.month}` +
    //     `&year_search=${formData.year}` +
    //     `&plant_search=${formData.plant}`

    // const [fetchData, pending, errorMessage] = useFetching(async () => {
    //     const response = await axios.get(apiUrl);
    //     dispatch(changeBoilsDataAction(response.data.boilsdata));        
    // })

    useEffect(() => {
        // fetchData();
        dispatch(fetchBoils(formData))
    }, [formData])

    const clear = () => {
        dispatch(handleErrorBoilsDataAction())
    }

    return (
        <div className={classes.page__content}>
            <SearchForm />


            <div>
                {boilsData.error
                    ?
                    <p>{boilsData.error}</p>
                    :
                    <>{boilsData.data.map((item, key) => (<p key={key}>{item.batchid}</p>))}</>
                }
                <button onClick={clear}>XXX</button>
            </div>
        </div>
    );
}
export default Home;
