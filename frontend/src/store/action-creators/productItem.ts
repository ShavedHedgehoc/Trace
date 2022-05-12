import axios from "axios";
import {Dispatch} from "react";
import {
    IProductItemFilter,
    IProductItemFormField,
    ProductItemAction,
    ProductItemActionTypes
} from "../../types/productItem"

const axiosParams = (page: number, limit: number, filter: IProductItemFilter) => {
    const params = new URLSearchParams();
    params.append('_page', String(page))
    params.append('_limit', String(limit))
    Object.entries(filter).forEach(([key, value]) => {
        params.append("_" + key, value)
    })
    return params
}

export const fetchProductItem = (
    page = 0, limit = 10, product_id: string | undefined, filter = {
        lot_name: '',
        seller_name: '',
        manufacturer_name: '',
        manufacturer_lot_name: '',
        trademark_name: ''
    }) => {
    return async (dispatch: Dispatch<ProductItemAction>) => {
        try {
            dispatch({type: ProductItemActionTypes.FETCH_PRODUCT_ITEM})
            const response = await (
                axios.get(
                    `/api/v1/products/${product_id}`,
                    {
                        params: axiosParams(page, limit, filter)
                    }
                ))
            dispatch({
                type: ProductItemActionTypes.FETCH_PRODUCT_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: ProductItemActionTypes.FETCH_PRODUCT_ITEM_ERROR,
                payload: 'error'
            })
        }
    }
}

export function increaseProductItemPage(): ProductItemAction {
    return {type: ProductItemActionTypes.INCREASE_PRODUCT_ITEM_PAGE}
}

export function decreaseProductItemPage(): ProductItemAction {
    return {type: ProductItemActionTypes.DECREASE_PRODUCT_ITEM_PAGE}
}

export function getFirstProductItemPage(): ProductItemAction {
    return {type: ProductItemActionTypes.GET_FIRST_PRODUCT_ITEM_PAGE}
}

export function getLastProductItemPage(): ProductItemAction {
    return {type: ProductItemActionTypes.GET_LAST_PRODUCT_ITEM_PAGE}
}

export function setProductItemsPage(page = 0): ProductItemAction {
    return {
        type: ProductItemActionTypes.SET_PRODUCT_ITEM_PAGE,
        payload: page - 1
    }
}

export function changeProductItemLimit(limit = 10): ProductItemAction {
    return {
        type: ProductItemActionTypes.CHANGE_PRODUCT_ITEM_LIMIT,
        payload: limit
    }
}

export function changeProductItemFilter({key, value}: IProductItemFormField): ProductItemAction {
    return {
        type: ProductItemActionTypes.CHANGE_PRODUCT_ITEM_FILTER,
        payload: {key, value}
    }
}

export function clearProductItemFilter(): ProductItemAction {
    return {type: ProductItemActionTypes.CLEAR_PRODUCT_ITEM_FILTER}
}

export function resetProductItemState(): ProductItemAction {
    return {type: ProductItemActionTypes.RESET_PRODUCT_ITEM_STATE}
}