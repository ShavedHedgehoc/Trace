import {TrademarkItemAction, TrademarkItemActionTypes, TrademarkItemState} from "../../types/trademarkItem";

const initialState: TrademarkItemState = {
    data: {
        header: {
            trademark_name:'',
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

export const trademarkItemReducer = (state = initialState, action: TrademarkItemAction): TrademarkItemState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                init: state.init,
            }
        case TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                init: false,
            }
        case TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                init: true,
            }
        case TrademarkItemActionTypes.INCREASE_TRADEMARK_ITEM_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case TrademarkItemActionTypes.DECREASE_TRADEMARK_ITEM_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case TrademarkItemActionTypes.GET_FIRST_TRADEMARK_ITEM_PAGE:
            return {...state, page: 0}
        case TrademarkItemActionTypes.GET_LAST_TRADEMARK_ITEM_PAGE:
            return {...state, page: lastPage - 1}
        case TrademarkItemActionTypes.CHANGE_TRADEMARK_ITEM_LIMIT:
            return {...state, limit: action.payload, page: 0}
        case TrademarkItemActionTypes.RESET_TRADEMARK_ITEM_STATE:
            return initialState
        default:
            return state
    }
}