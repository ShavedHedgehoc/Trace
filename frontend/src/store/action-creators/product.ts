import { Dispatch } from "react";
import { IProductFormField, ProductAction, ProductActionTypes } from "../../types/product";
import ProductService from "../../http/services/ProductService";
import handleError from "../../http/handleError";

const filterInitValue = { product_id: '', product_name: '' };

export const fetchProducts = (page = 0, limit = 10, filter = filterInitValue) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS })
            const response = await ProductService.get_products(page, limit, filter)
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseProductPage(): ProductAction {
    return { type: ProductActionTypes.INCREASE_PRODUCTS_PAGE }
}

export function decreaseProductPage(): ProductAction {
    return { type: ProductActionTypes.DECREASE_PRODUCTS_PAGE }
}

export function getFirstProductPage(): ProductAction {
    return { type: ProductActionTypes.GET_FIRST_PRODUCTS_PAGE }
}

export function getLastProductPage(): ProductAction {
    return { type: ProductActionTypes.GET_LAST_PRODUCTS_PAGE }
}

export function changeProductLimit(limit = 10): ProductAction {
    return {
        type: ProductActionTypes.CHANGE_PRODUCTS_LIMIT,
        payload: limit
    }
}

export function changeProductFilter({ key, value }: IProductFormField): ProductAction {
    return {
        type: ProductActionTypes.CHANGE_PRODUCTS_FILTER,
        payload: { key, value }
    }
}

export function clearProductFilter(): ProductAction {
    return { type: ProductActionTypes.CLEAR_PRODUCTS_FILTER }
}