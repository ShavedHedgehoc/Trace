import {ProductTmItemAction, ProductTmItemActionTypes, ProductTmItemState} from "../../types/productTmItem";

const initialState: ProductTmItemState = {
    data: {
        header: {
            product_id: '',
            product_name: '',
        },
        rows: [],
        total: 0
    },
    loading: false,
    error: null,
    page: 0,
    limit: 10,
    init: true,
}

export const productTmItemReducer = (state = initialState, action: ProductTmItemAction): ProductTmItemState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                init: state.init,
            }
        case ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                init: false,
            }
        case ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                init: true,
            }
        case ProductTmItemActionTypes.INCREASE_PRODUCT_TM_ITEM_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case ProductTmItemActionTypes.DECREASE_PRODUCT_TM_ITEM_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case ProductTmItemActionTypes.GET_FIRST_PRODUCT_TM_ITEM_PAGE:
            return {...state, page: 0}
        case ProductTmItemActionTypes.GET_LAST_PRODUCT_TM_ITEM_PAGE:
            return {...state, page: lastPage - 1}
        case ProductTmItemActionTypes.CHANGE_PRODUCT_TM_ITEM_LIMIT:
            return {...state, limit: action.payload, page: 0}
        case ProductTmItemActionTypes.RESET_PRODUCT_TM_ITEM_STATE:
            return initialState
        default:
            return state
    }
}