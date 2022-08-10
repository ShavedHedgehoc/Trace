import { Dispatch } from "react";
import handleError from "../../http/handleError";
import ProductService from '../../http/services/ProductService';
import { IProductItemFormField, ProductItemAction, ProductItemActionTypes } from "../../types/productItem"

const filterInitValue = { lot_name: '', seller_name: '', manufacturer_name: '', manufacturer_lot_name: '', trademark_name: '' };

export const fetchProductItem = (page = 0, limit = 10, product_id: string | undefined, filter = filterInitValue) => {
    return async (dispatch: Dispatch<ProductItemAction>) => {
        try {
            dispatch({ type: ProductItemActionTypes.FETCH_PRODUCT_ITEM })
            const response = await ProductService.get_product_item(product_id, page, limit, filter)
            dispatch({
                type: ProductItemActionTypes.FETCH_PRODUCT_ITEM_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: ProductItemActionTypes.FETCH_PRODUCT_ITEM_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseProductItemPage(): ProductItemAction {
    return { type: ProductItemActionTypes.INCREASE_PRODUCT_ITEM_PAGE }
}

export function decreaseProductItemPage(): ProductItemAction {
    return { type: ProductItemActionTypes.DECREASE_PRODUCT_ITEM_PAGE }
}

export function getFirstProductItemPage(): ProductItemAction {
    return { type: ProductItemActionTypes.GET_FIRST_PRODUCT_ITEM_PAGE }
}

export function getLastProductItemPage(): ProductItemAction {
    return { type: ProductItemActionTypes.GET_LAST_PRODUCT_ITEM_PAGE }
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

export function changeProductItemFilter({ key, value }: IProductItemFormField): ProductItemAction {
    return {
        type: ProductItemActionTypes.CHANGE_PRODUCT_ITEM_FILTER,
        payload: { key, value }
    }
}

export function clearProductItemFilter(): ProductItemAction {
    return { type: ProductItemActionTypes.CLEAR_PRODUCT_ITEM_FILTER }
}

export function resetProductItemState(): ProductItemAction {
    return { type: ProductItemActionTypes.RESET_PRODUCT_ITEM_STATE }
}