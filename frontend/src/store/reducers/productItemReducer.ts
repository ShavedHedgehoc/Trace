import {
    ProductItemAction,
    ProductItemActionTypes,
    ProductItemFilterParams,
    ProductItemState
} from "../../types/productItem";

const initialState: ProductItemState = {
    data: {
        header: {
            product_id: '',
            product_name: '',
        },
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    filter: {
        lot_name: '',
        seller_name: '',
        manufacturer_name: '',
        manufacturer_lot_name: '',
        trademark_name: '',
    },
    loading: false,
    error: null,
    init: true,
}

export const productItemReducer = (state = initialState, action: ProductItemAction): ProductItemState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case ProductItemActionTypes.FETCH_PRODUCT_ITEM:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: state.init,
            }
        case ProductItemActionTypes.FETCH_PRODUCT_ITEM_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: false,
            }
        case ProductItemActionTypes.FETCH_PRODUCT_ITEM_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: true,
            }
        case ProductItemActionTypes.INCREASE_PRODUCT_ITEM_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case ProductItemActionTypes.DECREASE_PRODUCT_ITEM_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case ProductItemActionTypes.GET_FIRST_PRODUCT_ITEM_PAGE:
            return {...state, page: 0}
        case ProductItemActionTypes.GET_LAST_PRODUCT_ITEM_PAGE:
            return {...state, page: lastPage - 1}
        case ProductItemActionTypes.SET_PRODUCT_ITEM_PAGE:
            return {...state, page: action.payload}
        case ProductItemActionTypes.CHANGE_PRODUCT_ITEM_LIMIT:
            return {...state, limit: action.payload, page: 0}
        case ProductItemActionTypes.CHANGE_PRODUCT_ITEM_FILTER:
            switch (action.payload.key) {
                case ProductItemFilterParams.LOT_NAME: {
                    return {...state, filter: {...state.filter, lot_name: action.payload.value}, page: 0}
                }
                case ProductItemFilterParams.SELLER_NAME: {
                    return {...state, filter: {...state.filter, seller_name: action.payload.value}, page: 0}
                }
                case ProductItemFilterParams.MANUFACTURER_NAME: {
                    return {...state, filter: {...state.filter, seller_name: action.payload.value}, page: 0}
                }
                case ProductItemFilterParams.MANUFACTURER_LOT_NAME: {
                    return {...state, filter: {...state.filter, manufacturer_lot_name: action.payload.value}, page: 0}
                }
                case ProductItemFilterParams.TRADEMARK_NAME: {
                    return {...state, filter: {...state.filter, trademark_name: action.payload.value}, page: 0}
                }
                default:
                    return state
            }
        case ProductItemActionTypes.CLEAR_PRODUCT_ITEM_FILTER: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    lot_name: '',
                    seller_name: '',
                    manufacturer_name: '',
                    manufacturer_lot_name: '',
                    trademark_name: ''
                }
            }
        }
        case ProductItemActionTypes.RESET_PRODUCT_ITEM_STATE:
            return initialState
        default:
            return state
    }
}