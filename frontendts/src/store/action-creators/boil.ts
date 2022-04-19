import axios from "axios";
import { Dispatch } from "react";
import { BoilAction, BoilActionTypes, IBoilFilter, IBoilFormField } from "../../types/boil"

const axiosParams = (page: number, limit: number, filter: IBoilFilter) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    Object.entries(filter).forEach(([key, value]) => {
        params.append("_" + key, value)
    })
    return params
}

export const fetchBoils = (
    page = 0, limit = 10, filter = { batch: "", marking: "", date: "", month: "-", year: "-", plant: "-" }) => {
    return async (dispatch: Dispatch<BoilAction>) => {
        try {
            dispatch({ type: BoilActionTypes.FETCH_BOILS })
            const response = await (
                axios.get(
                    "/api/v1/boils",
                    {
                        params: axiosParams(page, limit, filter)

                    }
                ))
            dispatch({
                type: BoilActionTypes.FETCH_BOILS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: BoilActionTypes.FETCH_BOILS_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increasePage(): BoilAction {
    return { type: BoilActionTypes.INCREASE_BOILS_PAGE }
}

export function decreasePage(): BoilAction {
    return { type: BoilActionTypes.DECREASE_BOILS_PAGE }
}

export function getFirstPage(): BoilAction {
    return { type: BoilActionTypes.SET_FIRST_BOILS_PAGE }
}

export function getLastPage(): BoilAction {
    return { type: BoilActionTypes.SET_LAST_BOILS_PAGE }
}

export function setPage(page = 0): BoilAction {
    return {
        type: BoilActionTypes.SET_BOILS_PAGE,
        payload: page - 1
    }
}

export function changeLimit(limit = 10): BoilAction {
    return {
        type: BoilActionTypes.CHANGE_LIMIT,
        payload: limit
    }
}

export function changeFilter({ key, value }: IBoilFormField): BoilAction {
    return {
        type: BoilActionTypes.CHANGE_FILTER,
        payload: { key, value }
    }
}

export function clearFilter(): BoilAction {
    return { type: BoilActionTypes.CLEAR_FILTER }
}