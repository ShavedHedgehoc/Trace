import { Dispatch } from "react";
import { BoilAction, BoilActionTypes, IBoilFormField } from "../../types/boil"
import BoilService from '../../http/services/BoilServise';
import handleError from "../../http/handleError";

const filterInitValue = { batch: "", marking: "", date: "", month: "-", year: "-", plant: "-" };

export const fetchBoils = (
    page = 0, limit = 10, filter = filterInitValue) => {
    return async (dispatch: Dispatch<BoilAction>) => {
        try {
            dispatch({ type: BoilActionTypes.FETCH_BOILS })
            const response = await BoilService.get_boils(page, limit, filter)
            dispatch({
                type: BoilActionTypes.FETCH_BOILS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: BoilActionTypes.FETCH_BOILS_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseBoilsPage(): BoilAction {
    return { type: BoilActionTypes.INCREASE_BOILS_PAGE }
}

export function decreaseBoilsPage(): BoilAction {
    return { type: BoilActionTypes.DECREASE_BOILS_PAGE }
}

export function getFirstBoilsPage(): BoilAction {
    return { type: BoilActionTypes.GET_FIRST_BOILS_PAGE }
}

export function getLastBoilsPage(): BoilAction {
    return { type: BoilActionTypes.GET_LAST_BOILS_PAGE }
}

export function setBoilsPage(page = 0): BoilAction {
    return {
        type: BoilActionTypes.SET_BOILS_PAGE,
        payload: page - 1
    }
}

export function changeBoilsLimit(limit = 10): BoilAction {
    return {
        type: BoilActionTypes.CHANGE_BOILS_LIMIT,
        payload: limit
    }
}

export function changeBoilsFilter({ key, value }: IBoilFormField): BoilAction {
    return {
        type: BoilActionTypes.CHANGE_BOILS_FILTER,
        payload: { key, value }
    }
}

export function clearBoilsFilter(): BoilAction {
    return { type: BoilActionTypes.CLEAR_BOILS_FILTER }
}