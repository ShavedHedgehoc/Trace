import { Dispatch } from "react";
import { ConvergenceItemAction, ConvergenceItemActionTypes } from "../../types/convergenceItem";
import ConvergenceService from '../../http/services/ConvergenceServise';
import handleError from "../../http/handleError";

export const fetchConvergenceItem = (boil_name: string|undefined, exactly: string|undefined) => {
    return async (dispatch: Dispatch<ConvergenceItemAction>) => {
        try {
            dispatch({ type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM })
            const response = await ConvergenceService.get_convergence_item(boil_name, exactly)
            dispatch({
                type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_ERROR,
                payload: errValue
            })
        }
    }
}