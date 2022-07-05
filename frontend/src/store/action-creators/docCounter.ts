import { Dispatch } from "react";
import { DocCounterAction, DocCounterActionTypes } from "../../types/doccount";
import DocumentService from '../../http/services/DocumentService';

export const fetchDocCounter = () => {
    return async (dispatch: Dispatch<DocCounterAction>) => {
        try {
            dispatch({ type: DocCounterActionTypes.FETCH_DOC_COUNTER })
            const response = await (DocumentService.doc_count())            
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