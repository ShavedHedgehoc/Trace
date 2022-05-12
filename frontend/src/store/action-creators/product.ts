import {Dispatch} from "react";
import {IProductFilter, IProductFormField, ProductAction, ProductActionTypes} from "../../types/product";
import axios from "axios";

const axiosParams = (page: number, limit: number, filter: IProductFilter) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    Object.entries(filter).forEach(([key, value]) => {
        params.append("_" + key, value)
    })
    return params
}

export const fetchProducts = (page = 0, limit = 10, filter = {product_id: '', product_name: ''}) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({type: ProductActionTypes.FETCH_PRODUCTS})
            const response = await (
                axios.get(
                    "/api/v1/products",
                    {
                        params: axiosParams(page, limit, filter)
                    }
                ))
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increaseProductPage(): ProductAction {
    return {type: ProductActionTypes.INCREASE_PRODUCTS_PAGE}
}

export function decreaseProductPage(): ProductAction {
    return {type: ProductActionTypes.DECREASE_PRODUCTS_PAGE}
}

export function getFirstProductPage(): ProductAction {
    return {type: ProductActionTypes.GET_FIRST_PRODUCTS_PAGE}
}

export function getLastProductPage(): ProductAction {
    return {type: ProductActionTypes.GET_LAST_PRODUCTS_PAGE}
}

export function changeProductLimit(limit = 10): ProductAction {
    return {
        type: ProductActionTypes.CHANGE_PRODUCTS_LIMIT,
        payload: limit
    }
}

export function changeProductFilter({key, value}: IProductFormField): ProductAction {
    return {
        type: ProductActionTypes.CHANGE_PRODUCTS_FILTER,
        payload: {key, value}
    }
}

export function clearProductFilter(): ProductAction {
    return {type: ProductActionTypes.CLEAR_PRODUCTS_FILTER}
}