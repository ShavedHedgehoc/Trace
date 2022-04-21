import {TrademarkAction, TrademarkActionTypes, TrademarkState} from "../../types/trademark";

const initialState: TrademarkState = {
    data: {
        rows: [],
        total: 0
    },
    loading: false,
    error: null,
    page: 0,
    limit: 10
}

export const trademarksReducer = (state = initialState, action: TrademarkAction): TrademarkState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type){
        case TrademarkActionTypes.FETCH_TRADEMARKS:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit
            }
        case TrademarkActionTypes.FETCH_TRADEMARKS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit
            }
        case TrademarkActionTypes.FETCH_TRADEMARKS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit
            }
        case TrademarkActionTypes.INCREASE_TRADEMARKS_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case TrademarkActionTypes.DECREASE_TRADEMARKS_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case TrademarkActionTypes.GET_FIRST_TRADEMARKS_PAGE:
            return {...state, page: 0}
        case TrademarkActionTypes.GET_LAST_TRADEMARKS_PAGE:
            return {...state, page: lastPage - 1}
        case TrademarkActionTypes.CHANGE_TRADEMARKS_LIMIT:
            return {...state, limit: action.payload, page: 0}
        default:
            return state
    }
}