import {LotAction, LotActionTypes, LotState} from "../../types/lot";

const initialState: LotState = {
    data: {
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null,
    init: true,
}

export const lotsReducer = (state = initialState, action: LotAction): LotState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case LotActionTypes.FETCH_LOTS:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                init: state.init,
            }
        case LotActionTypes.FETCH_LOTS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                init: false,
            }
        case LotActionTypes.FETCH_LOTS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                init: true,
            }
        case LotActionTypes.INCREASE_LOTS_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case LotActionTypes.DECREASE_LOTS_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case LotActionTypes.GET_FIRST_LOTS_PAGE:
            return {...state, page: 0}
        case LotActionTypes.GET_LAST_LOTS_PAGE:
            return {...state, page: lastPage - 1}
        case LotActionTypes.CHANGE_LOTS_LIMIT:
            return {...state, limit: action.payload, page: 0}
        default:
            return state
    }
}