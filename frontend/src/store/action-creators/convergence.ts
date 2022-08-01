import { Dispatch } from "react";
import handleError from "../../http/handleError";
import ConvergenceService from '../../http/services/ConvergenceServise';
import { ConvergenceAction, ConvergenceActionTypes, IConvergenceFormField } from "../../types/convergence"

const filterInitValue = { start_date: "", end_date: "", exactly: 'false', plant: "-" };

export const fetchConvergence = (page = 0, limit = 10, filter = filterInitValue) => {
    return async (dispatch: Dispatch<ConvergenceAction>) => {
        try {
            dispatch({ type: ConvergenceActionTypes.FETCH_CONVERGENCE })
            const response = await ConvergenceService.get_convergences(page, limit, filter)
            dispatch({
                type: ConvergenceActionTypes.FETCH_CONVERGENCE_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: ConvergenceActionTypes.FETCH_CONVERGENCE_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseConvergencePage(): ConvergenceAction {
    return { type: ConvergenceActionTypes.INCREASE_CONVERGENCE_PAGE }
}

export function decreaseConvergencePage(): ConvergenceAction {
    return { type: ConvergenceActionTypes.DECREASE_CONVERGENCE_PAGE }
}

export function getFirstConvergencePage(): ConvergenceAction {
    return { type: ConvergenceActionTypes.GET_FIRST_CONVERGENCE_PAGE }
}

export function getLastConvergencePage(): ConvergenceAction {
    return { type: ConvergenceActionTypes.GET_LAST_CONVERGENCE_PAGE }
}

export function changeConvergenceLimit(limit = 10): ConvergenceAction {
    return {
        type: ConvergenceActionTypes.CHANGE_CONVERGENCE_LIMIT,
        payload: limit
    }
}

export function changeConvergenceFilter({ key, value }: IConvergenceFormField): ConvergenceAction {
    return {
        type: ConvergenceActionTypes.CHANGE_CONVERGENCE_FILTER,
        payload: { key, value }
    }
}

export function resetConvergenceFilter(): ConvergenceAction {
    return { type: ConvergenceActionTypes.RESET_CONVERGENCE_FILTER }
}

export function resetConvergenceState(): ConvergenceAction {
    return { type: ConvergenceActionTypes.RESET_CONVERGENCE_STATE }
}