import axios from "axios";
import { Dispatch } from "react";
import { BoilAction, BoilActionTypes } from "../../types/boil"


export const fetchBoils = (page = 0, limit=10) => {
    return async (dispatch: Dispatch<BoilAction>) => {
        try {
            dispatch({ type: BoilActionTypes.FETCH_BOILS })
            const response = await (
                axios.get(
                    "/api/v1/boils",
                    {
                        params: {
                            page: page,
                            per_page: limit
                        }
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

export function setPage(page=0): BoilAction {
    return {
        type: BoilActionTypes.SET_BOILS_PAGE,
        payload: page-1
    }
}

export function changeLimit(limit=10): BoilAction {
    return {
        type: BoilActionTypes.CHANGE_LIMIT,
        payload: limit
    }
}