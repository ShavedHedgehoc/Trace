import { Dispatch } from "react";
import handleError from "../../http/handleError";
import LotService from "../../http/services/LotService";
import { LotItemAction, LotItemActionTypes } from "../../types/lotItem";

export const fetchLotItem = (page = 0, limit = 10, lot_id: string | undefined) => {
    return async (dispatch: Dispatch<LotItemAction>) => {
        try {
            dispatch({ type: LotItemActionTypes.FETCH_LOT_ITEM })
            const response = await LotService.get_lot_item(Number(lot_id), page, limit)
            dispatch({
                type: LotItemActionTypes.FETCH_LOT_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: LotItemActionTypes.FETCH_LOT_ITEM_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseLotItemPage(): LotItemAction {
    return { type: LotItemActionTypes.INCREASE_LOT_ITEM_PAGE }
}

export function decreaseLotItemPage(): LotItemAction {
    return { type: LotItemActionTypes.DECREASE_LOT_ITEM_PAGE }
}

export function getFirstLotItemPage(): LotItemAction {
    return { type: LotItemActionTypes.GET_FIRST_LOT_ITEM_PAGE }
}

export function getLastLotItemPage(): LotItemAction {
    return { type: LotItemActionTypes.GET_LAST_LOT_ITEM_PAGE }
}

export function changeLotItemLimit(limit = 10): LotItemAction {
    return {
        type: LotItemActionTypes.CHANGE_LOT_ITEM_LIMIT,
        payload: limit
    }
}

export function resetLotItemState(): LotItemAction {
    return { type: LotItemActionTypes.RESET_LOT_ITEM_STATE }
}