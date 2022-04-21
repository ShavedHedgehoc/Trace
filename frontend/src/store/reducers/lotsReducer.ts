import {LotAction, LotActionTypes, LotState} from "../../types/lot";

const initialState: LotState = {
    data: {
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null
}

export const lotsReducer = (state = initialState, action: LotAction): LotState => {
    const lastPage = <number>(Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case LotActionTypes.FETCH_LOTS:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit
            }
        case LotActionTypes.FETCH_LOTS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit
            }
        case LotActionTypes.FETCH_LOTS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit
            }
        case LotActionTypes.INCREASE_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case LotActionTypes.DECREASE_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case LotActionTypes.SET_FIRST_PAGE:
            return {...state, page: 0}
        case LotActionTypes.SET_LAST_PAGE:
            return {...state, page: lastPage - 1}
        case LotActionTypes.CHANGE_LIMIT:
            return {...state, limit: action.payload, page: 0}
        default:
            return state
    }
}