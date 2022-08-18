import { CellsContainAction, CellsContainState, CellsContainActionTypes } from '../../types/cellsContain';

const initialState: CellsContainState = {
    data: {
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null,
    // filter: {
    //     product_id: '',
    //     product_name: '',
    // },
    init: true,
}

export const cellsContainReducer = (state = initialState, action: CellsContainAction): CellsContainState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case CellsContainActionTypes.FETCH_CELLS_CONTAIN:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                // filter: state.filter,
                init: state.init,
            }
        case CellsContainActionTypes.FETCH_CELLS_CONTAIN_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                // filter: state.filter,
                init: false,
            }
        case CellsContainActionTypes.FETCH_CELLS_CONTAIN_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                // filter: state.filter,
                init: true,
            }
        case CellsContainActionTypes.INCREASE_CELLS_CONTAIN_PAGE:
            if (state.page === lastPage - 1) {
                return { ...state, page: state.page }
            } else {
                return { ...state, page: state.page + 1 }
            }
        case CellsContainActionTypes.DECREASE_CELLS_CONTAIN_PAGE:
            if (state.page === 0) {
                return { ...state, page: state.page }
            } else {
                return { ...state, page: state.page - 1 }
            }
        case CellsContainActionTypes.GET_FIRST_CELLS_CONTAIN_PAGE:
            return { ...state, page: 0 }
        case CellsContainActionTypes.GET_LAST_CELLS_CONTAIN_PAGE:
            return { ...state, page: lastPage - 1 }
        case CellsContainActionTypes.CHANGE_CELLS_CONTAIN_LIMIT:
            return { ...state, limit: action.payload, page: 0 }
        // case ProductActionTypes.CHANGE_PRODUCTS_FILTER:
        //     switch (action.payload.key) {
        //         case ProductFilterParams.PRODUCT_ID:
        //             return { ...state, filter: { ...state.filter, product_id: action.payload.value }, page: 0 }
        //         case ProductFilterParams.PRODUCT_NAME:
        //             return { ...state, filter: { ...state.filter, product_name: action.payload.value }, page: 0 }
        //         default:
        //             return state
        //     }
        // case ProductActionTypes.CLEAR_PRODUCTS_FILTER:
        //     return { ...state, filter: { ...state.filter, product_id: '', product_name: '' } }
        case CellsContainActionTypes.RESET_CELLS_CONTAIN_STATE:
            return initialState
        default:
            return state
    }
}