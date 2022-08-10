import { Dispatch } from "react";
import { ITrademarkFormField, TrademarkAction, TrademarkActionTypes } from "../../types/trademark";
import TrademarkService from "../../http/services/TrademarkService";
import handleError from "../../http/handleError";

const filterInitValue = { trademark_name: '', product_id: '', product_name: '' }

export const fetchTrademarks = (page = 0, limit = 10, filter = filterInitValue) => {
    return async (dispatch: Dispatch<TrademarkAction>) => {
        try {
            dispatch({ type: TrademarkActionTypes.FETCH_TRADEMARKS })
            const response = await TrademarkService.get_trademarks(page, limit, filter)
            dispatch({
                type: TrademarkActionTypes.FETCH_TRADEMARKS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: TrademarkActionTypes.FETCH_TRADEMARKS_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseTrademarkPage(): TrademarkAction {
    return { type: TrademarkActionTypes.INCREASE_TRADEMARKS_PAGE }
}

export function decreaseTrademarkPage(): TrademarkAction {
    return { type: TrademarkActionTypes.DECREASE_TRADEMARKS_PAGE }
}

export function getFirstTrademarkPage(): TrademarkAction {
    return { type: TrademarkActionTypes.GET_FIRST_TRADEMARKS_PAGE }
}

export function getLastTrademarkPage(): TrademarkAction {
    return { type: TrademarkActionTypes.GET_LAST_TRADEMARKS_PAGE }
}

export function changeTrademarkLimit(limit = 10): TrademarkAction {
    return {
        type: TrademarkActionTypes.CHANGE_TRADEMARKS_LIMIT,
        payload: limit
    }
}

export function changeTrademarkFilter({ key, value }: ITrademarkFormField): TrademarkAction {
    return {
        type: TrademarkActionTypes.CHANGE_TRADEMARKS_FILTER,
        payload: { key, value }
    }
}

export function clearTrademarkFilter(): TrademarkAction {
    return { type: TrademarkActionTypes.CLEAR_TRADEMARKS_FILTER }
}