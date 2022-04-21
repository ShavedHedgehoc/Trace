import axios from "axios";
import { Dispatch } from "react";
import { DocCounterAction, DocCounterActionTypes } from "../../types/doccount";

export const fetchDocCounter = () => {
    return async (dispatch: Dispatch<DocCounterAction>) => {
        try {
            dispatch({ type: DocCounterActionTypes.FETCH_DOC_COUNTER })
            const response = await (
                axios.get("/api/v1/doc_count"))
            dispatch({
                type: DocCounterActionTypes.FETCH_DOC_COUNTER_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: DocCounterActionTypes.FETCH_DOC_COUNTER_ERROR,
                payload: 'error'
            })
        }
    }
}