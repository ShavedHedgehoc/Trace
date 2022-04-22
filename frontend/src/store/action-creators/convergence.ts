import axios from "axios";
import { Dispatch } from "react";
import { ConvergenceAction, ConvergenceActionTypes, IConvergenceFilter } from "../../types/convergence"

const axiosParams = (page: number, limit: number, filter: IConvergenceFilter) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    Object.entries(filter).forEach(([key, value]) => {
        params.append("_" + key, value)
    })
    return params
}

export const fetchConvergence = (
    page = 0, limit = 10, filter = { start_date: "", end_date: "", plant: "-" }) => {
    return async (dispatch: Dispatch<ConvergenceAction>) => {
        try {
            dispatch({ type: ConvergenceActionTypes.FETCH_CONVERGENCE })
            const response = await (
                axios.get(
                    "/api/v1/boils_report",
                    {
                        params: axiosParams(page, limit, filter)

                    }
                ))
            dispatch({
                type: ConvergenceActionTypes.FETCH_CONVERGENCE_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ConvergenceActionTypes.FETCH_CONVERGENCE_ERROR,
                payload: 'error'
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

// export function changeConvergenceFilter({ key, value }: IConvergenceFilter): ConvergenceAction {
//     return {
//         type: ConvergenceActionTypes.CHANGE_CONVERGENCE_FILTER,
//         payload: { key, value }
//     }
// }

// export function clearConvergenceFilter(): ConvergenceAction {
//     return { type: ConvergenceActionTypes.CLEAR_CONVERGENCE_FILTER }
// }