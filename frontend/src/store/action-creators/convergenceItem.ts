import axios from "axios";
import {Dispatch} from "react";
import {ConvergenceItemAction, ConvergenceItemActionTypes} from "../../types/convergenceItem";

export const fetchConvergenceItem = (
    boil_name: string | undefined,
    exactly: string | undefined) => {
    return async (dispatch: Dispatch<ConvergenceItemAction>) => {
        try {
            dispatch({type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM})
            const response = await (axios.get(`/api/v1/boils_report/${boil_name}?_exactly=${exactly}`))
            dispatch({
                type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_ERROR,
                payload: 'error'
            })
        }
    }
}