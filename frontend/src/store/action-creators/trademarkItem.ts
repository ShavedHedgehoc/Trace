import axios from "axios";
import {Dispatch} from "react";
import {
    // ITrademarkItemFilter,
    // ITrademarkItemFormField,
    TrademarkItemAction,
    TrademarkItemActionTypes
} from "../../types/trademarkItem"

const axiosParams = (page: number, limit: number
                     // , filter: ITrademarkItemFilter
) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    // Object.entries(filter).forEach(([key, value]) => {
    //     params.append("_" + key, value)
    // })
    return params
}

export const fetchTrademarkItem = (
    page = 0, limit = 10, trademark_id: string | undefined
    // , filter = {
    //     lot_name: '',
    //     seller_name: '',
    //     manufacturer_name: '',
    //     manufacturer_lot_name: '',
    //     trademark_name: ''
    // }
    ) => {
    return async (dispatch: Dispatch<TrademarkItemAction>) => {
        try {
            dispatch({type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM})
            const response = await (
                axios.get(
                    `/api/v1/trademarks/${trademark_id}`,
                    {
                        params: axiosParams(page, limit) //, filter)
                    }
                ))
            dispatch({
                type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increaseTrademarkItemPage(): TrademarkItemAction {
    return {type: TrademarkItemActionTypes.INCREASE_TRADEMARK_ITEM_PAGE}
}

export function decreaseTrademarkItemPage(): TrademarkItemAction {
    return {type: TrademarkItemActionTypes.DECREASE_TRADEMARK_ITEM_PAGE}
}

export function getFirstTrademarkItemPage(): TrademarkItemAction {
    return {type: TrademarkItemActionTypes.GET_FIRST_TRADEMARK_ITEM_PAGE}
}

export function getLastTrademarkItemPage(): TrademarkItemAction {
    return {type: TrademarkItemActionTypes.GET_LAST_TRADEMARK_ITEM_PAGE}
}

export function changeTrademarkItemLimit(limit = 10): TrademarkItemAction {
    return {
        type: TrademarkItemActionTypes.CHANGE_TRADEMARK_ITEM_LIMIT,
        payload: limit
    }
}

// export function changeTrademarkItemFilter({key, value}: ITrademarkItemFormField): TrademarkItemAction {
//     return {
//         type: TrademarkItemActionTypes.CHANGE_TRADEMARK_ITEM_FILTER,
//         payload: {key, value}
//     }
// }
//
// export function clearTrademarkItemFilter(): TrademarkItemAction {
//     return {type: TrademarkItemActionTypes.CLEAR_TRADEMARK_ITEM_FILTER}
// }

export function resetTrademarkItemState(): TrademarkItemAction {
    return {type: TrademarkItemActionTypes.RESET_TRADEMARK_ITEM_STATE}
}