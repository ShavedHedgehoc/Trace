import { Dispatch } from "react";
import ProductService from "../../http/services/ProductService";
import { ProductTmItemAction, ProductTmItemActionTypes } from "../../types/productTmItem";
import handleError from '../../http/handleError';

export const fetchProductTmItem = (page = 0, limit = 10, product_id: string | undefined) => {
    return async (dispatch: Dispatch<ProductTmItemAction>) => {
        try {
            dispatch({ type: ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM })
            const response = await ProductService.get_product_tm_item(product_id, page, limit)
            dispatch({
                type: ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseProductTmItemPage(): ProductTmItemAction {
    return { type: ProductTmItemActionTypes.INCREASE_PRODUCT_TM_ITEM_PAGE }
}

export function decreaseProductTmItemPage(): ProductTmItemAction {
    return { type: ProductTmItemActionTypes.DECREASE_PRODUCT_TM_ITEM_PAGE }
}

export function getFirstProductTmItemPage(): ProductTmItemAction {
    return { type: ProductTmItemActionTypes.GET_FIRST_PRODUCT_TM_ITEM_PAGE }
}

export function getLastProductTmItemPage(): ProductTmItemAction {
    return { type: ProductTmItemActionTypes.GET_LAST_PRODUCT_TM_ITEM_PAGE }
}

export function changeProductTmItemLimit(limit = 10): ProductTmItemAction {
    return {
        type: ProductTmItemActionTypes.CHANGE_PRODUCT_TM_ITEM_LIMIT,
        payload: limit
    }
}

export function resetProductTmItemState(): ProductTmItemAction {
    return { type: ProductTmItemActionTypes.RESET_PRODUCT_TM_ITEM_STATE }
}