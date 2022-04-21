import axios from "axios";
import {Dispatch} from "react";
import {LotAction, LotActionTypes} from "../../types/lot"

const axiosParams = (page: number, limit: number) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    // Object.entries(filter).forEach(([key, value]) => {
    //     params.append("_" + key, value)
    // })
    return params
}

export const fetchLots = (
    page = 0, limit = 10) => {
    return async (dispatch: Dispatch<LotAction>) => {
        try {
            dispatch({type: LotActionTypes.FETCH_LOTS})
            const response = await (
                axios.get(
                    "/api/v1/lots",
                    {
                        params: axiosParams(page, limit)

                    }
                ))
            dispatch({
                type: LotActionTypes.FETCH_LOTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: LotActionTypes.FETCH_LOTS_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increaseLotsPage(): LotAction {
    return {type: LotActionTypes.INCREASE_LOTS_PAGE}
}

export function decreaseLotsPage(): LotAction {
    return {type: LotActionTypes.DECREASE_LOTS_PAGE}
}

export function getFirstLotsPage(): LotAction {
    return {type: LotActionTypes.GET_LAST_LOTS_PAGE}
}

export function getLastLotsPage(): LotAction {
    return {type: LotActionTypes.GET_LAST_LOTS_PAGE}
}

export function changeLotsLimit(limit = 10): LotAction {
    return {
        type: LotActionTypes.CHANGE_LOTS_LIMIT,
        payload: limit
    }
}