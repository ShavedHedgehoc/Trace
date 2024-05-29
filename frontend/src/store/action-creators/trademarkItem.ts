import { Dispatch } from "react";
import handleError from "../../http/handleError";
import TrademarkService from "../../http/services/TrademarkService";
import { TrademarkItemAction, TrademarkItemActionTypes } from "../../types/trademarkItem"

export const fetchTrademarkItem = (page = 0, limit = 10, trademark_id: string | undefined) => {
    return async (dispatch: Dispatch<TrademarkItemAction>) => {
        try {
            dispatch({ type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM })
            const response = await TrademarkService.get_trademark_item(Number(trademark_id), page, limit)
            dispatch({
                type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseTrademarkItemPage(): TrademarkItemAction {
    return { type: TrademarkItemActionTypes.INCREASE_TRADEMARK_ITEM_PAGE }
}

export function decreaseTrademarkItemPage(): TrademarkItemAction {
    return { type: TrademarkItemActionTypes.DECREASE_TRADEMARK_ITEM_PAGE }
}

export function getFirstTrademarkItemPage(): TrademarkItemAction {
    return { type: TrademarkItemActionTypes.GET_FIRST_TRADEMARK_ITEM_PAGE }
}

export function getLastTrademarkItemPage(): TrademarkItemAction {
    return { type: TrademarkItemActionTypes.GET_LAST_TRADEMARK_ITEM_PAGE }
}

export function changeTrademarkItemLimit(limit = 10): TrademarkItemAction {
    return {
        type: TrademarkItemActionTypes.CHANGE_TRADEMARK_ITEM_LIMIT,
        payload: limit
    }
}

export function resetTrademarkItemState(): TrademarkItemAction {
    return { type: TrademarkItemActionTypes.RESET_TRADEMARK_ITEM_STATE }
}