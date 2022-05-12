import {ProductAction, ProductActionTypes, ProductFilterParams, ProductState} from "../../types/product";

const initialState: ProductState = {
    data: {
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null,
    filter: {
        product_id: '',
        product_name: '',
    },
    init: true,
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: state.init,
            }
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: false,
            }
        case ProductActionTypes.FETCH_PRODUCTS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: true,
            }
        case ProductActionTypes.INCREASE_PRODUCTS_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case ProductActionTypes.DECREASE_PRODUCTS_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case ProductActionTypes.GET_FIRST_PRODUCTS_PAGE:
            return {...state, page: 0}
        case ProductActionTypes.GET_LAST_PRODUCTS_PAGE:
            return {...state, page: lastPage - 1}
        case ProductActionTypes.CHANGE_PRODUCTS_LIMIT:
            return {...state, limit: action.payload, page: 0}
        case ProductActionTypes.CHANGE_PRODUCTS_FILTER:
            switch (action.payload.key) {
                case ProductFilterParams.PRODUCT_ID:
                    return {...state, filter: {...state.filter, product_id: action.payload.value}, page: 0}
                case ProductFilterParams.PRODUCT_NAME:
                    return {...state, filter: {...state.filter, product_name: action.payload.value}, page: 0}
                default:
                    return state
            }
        case ProductActionTypes.CLEAR_PRODUCTS_FILTER:
            return {...state, filter: {...state.filter, product_id: '', product_name: ''}}
        default:
            return state
    }
}