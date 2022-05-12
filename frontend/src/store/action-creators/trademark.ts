import {Dispatch} from "react";
import {ITrademarkFilter, ITrademarkFormField, TrademarkAction, TrademarkActionTypes} from "../../types/trademark";
import axios from "axios";


const axiosParams = (
    page: number,
    limit: number,
    filter: ITrademarkFilter) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    Object.entries(filter).forEach(([key, value]) => {
        params.append("_" + key, value)
    })
    return params
}

export const fetchTrademarks = (
    page = 0,
    limit = 10,
    filter = {trademark_name: '', product_id: '', product_name: ''}
) => {
    return async (dispatch: Dispatch<TrademarkAction>) => {
        try {
            dispatch({type: TrademarkActionTypes.FETCH_TRADEMARKS})
            const response = await (
                axios.get(
                    "/api/v1/trademarks",
                    {
                        params: axiosParams(page, limit, filter)
                    }
                ))
            dispatch({
                type: TrademarkActionTypes.FETCH_TRADEMARKS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: TrademarkActionTypes.FETCH_TRADEMARKS_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increaseTrademarkPage(): TrademarkAction {
    return {type: TrademarkActionTypes.INCREASE_TRADEMARKS_PAGE}
}

export function decreaseTrademarkPage(): TrademarkAction {
    return {type: TrademarkActionTypes.DECREASE_TRADEMARKS_PAGE}
}

export function getFirstTrademarkPage(): TrademarkAction {
    return {type: TrademarkActionTypes.GET_FIRST_TRADEMARKS_PAGE}
}

export function getLastTrademarkPage(): TrademarkAction {
    return {type: TrademarkActionTypes.GET_LAST_TRADEMARKS_PAGE}
}

export function changeTrademarkLimit(limit = 10): TrademarkAction {
    return {
        type: TrademarkActionTypes.CHANGE_TRADEMARKS_LIMIT,
        payload: limit
    }
}

export function changeTrademarkFilter({key, value}: ITrademarkFormField): TrademarkAction {
    return {
        type: TrademarkActionTypes.CHANGE_TRADEMARKS_FILTER,
        payload: {key, value}
    }
}

export function clearTrademarkFilter(): TrademarkAction {
    return {type: TrademarkActionTypes.CLEAR_TRADEMARKS_FILTER}
}