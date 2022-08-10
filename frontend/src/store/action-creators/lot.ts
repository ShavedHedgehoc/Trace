import { Dispatch } from "react";
import { LotAction, LotActionTypes } from "../../types/lot"
import LotService from '../../http/services/LotService';
import handleError from "../../http/handleError";


export const fetchLots = (page = 0, limit = 10) => {
    return async (dispatch: Dispatch<LotAction>) => {
        try {
            dispatch({ type: LotActionTypes.FETCH_LOTS })
            const response = await LotService.get_lots(page, limit)
            dispatch({
                type: LotActionTypes.FETCH_LOTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: LotActionTypes.FETCH_LOTS_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseLotsPage(): LotAction {
    return { type: LotActionTypes.INCREASE_LOTS_PAGE }
}

export function decreaseLotsPage(): LotAction {
    return { type: LotActionTypes.DECREASE_LOTS_PAGE }
}

export function getFirstLotsPage(): LotAction {
    return { type: LotActionTypes.GET_LAST_LOTS_PAGE }
}

export function getLastLotsPage(): LotAction {
    return { type: LotActionTypes.GET_LAST_LOTS_PAGE }
}

export function changeLotsLimit(limit = 10): LotAction {
    return {
        type: LotActionTypes.CHANGE_LOTS_LIMIT,
        payload: limit
    }
}