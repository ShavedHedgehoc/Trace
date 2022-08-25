import { CellsContainAction, CellsContainState, CellsContainActionTypes, ICellsContainOrders, CellsContainFilterParams } from '../../types/cellsContain';

const initialState: CellsContainState = {
    data: {
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null,
    filter: {
        cell: '',
        product_id: '',
        product_name: '',
    },
    order: ICellsContainOrders.BY_CELLS,
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
                filter: state.filter,
                order: state.order,
                init: state.init,
            }
        case CellsContainActionTypes.FETCH_CELLS_CONTAIN_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                order: state.order,
                init: false,
            }
        case CellsContainActionTypes.FETCH_CELLS_CONTAIN_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                order: state.order,
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
        case CellsContainActionTypes.CHANGE_CELLS_CONTAIN_FILTER:
            switch (action.payload.key) {
                case CellsContainFilterParams.CELL:
                    return { ...state, filter: { ...state.filter, cell: action.payload.value } }
                case CellsContainFilterParams.PRODUCT_ID:
                    return { ...state, filter: { ...state.filter, product_id: action.payload.value } }
                case CellsContainFilterParams.PRODUCT_NAME:
                    return { ...state, filter: { ...state.filter, product_name: action.payload.value } }
                default:
                    return state
            }
        case CellsContainActionTypes.RESET_CELLS_CONTAIN_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    cell: '',
                    product_id: '',
                    product_name: ''
                }
            }
        case CellsContainActionTypes.RESET_CELLS_CONTAIN_STATE:
            return initialState
        default:
            return state
    }
}