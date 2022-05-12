import axios from "axios";
import {Dispatch} from "react";
import {LotItemAction, LotItemActionTypes} from "../../types/lotItem";

const axiosParams = (page: number, limit: number) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    // Object.entries(filter).forEach(([key, value]) => {
    //     params.append("_" + key, value)
    // })
    return params
}

export const fetchLotItem = (
    page = 0, limit = 10, lot_id: string|undefined) => {
    return async (dispatch: Dispatch<LotItemAction>) => {
        try {
            dispatch({type: LotItemActionTypes.FETCH_LOT_ITEM})
            const response = await (
                axios.get(
                    `/api/v1/lots/${lot_id}`,
                    {
                        params: axiosParams(page, limit)

                    }
                ))
            dispatch({
                type: LotItemActionTypes.FETCH_LOT_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: LotItemActionTypes.FETCH_LOT_ITEM_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increaseLotItemPage(): LotItemAction {
    return {type: LotItemActionTypes.INCREASE_LOT_ITEM_PAGE}
}

export function decreaseLotItemPage(): LotItemAction {
    return {type: LotItemActionTypes.DECREASE_LOT_ITEM_PAGE}
}

export function getFirstLotItemPage(): LotItemAction {
    return {type: LotItemActionTypes.GET_FIRST_LOT_ITEM_PAGE}
}

export function getLastLotItemPage(): LotItemAction {
    return {type: LotItemActionTypes.GET_LAST_LOT_ITEM_PAGE}
}

export function changeLotItemLimit(limit = 10): LotItemAction {
    return {
        type: LotItemActionTypes.CHANGE_LOT_ITEM_LIMIT,
        payload: limit
    }
}

export function resetLotItemState(): LotItemAction {
    return {type:LotItemActionTypes.RESET_LOT_ITEM_STATE}
}