import React, { useEffect } from "react";

import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BoilActionTypes } from "../types/boil";
import Pagination from "./Pagination";

import Table from "./Table";


const BoilsList: React.FC = () => {

    const { boils, error, loading, page, limit } = useTypedSelector(state => state.boils);
    const { fetchBoils, increasePage, decreasePage, getFirstPage, getLastPage, setPage, changeLimit } = useActions()
    const lastPage = (Math.ceil(boils.total / limit))
    

    useEffect(() => {
        fetchBoils(page, limit);
    }, [page, limit])

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        return <h1>Error</h1>
    }

    return (
        <div>
            <Table items={boils.data} />            
            <Pagination
                increasePage={() => increasePage()}
                decreasePage={() => decreasePage()}
                getFirstPage={() => getFirstPage()}
                getLastPage={() => getLastPage()}
                changeLimit={(limit) => changeLimit(limit)}
                page={page}                
                limit={limit}
                total={boils.total}
            />
        </div>
    )
}

export default BoilsList;