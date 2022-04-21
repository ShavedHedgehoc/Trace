import {LotItemAction, LotItemActionTypes, LotItemState} from "../../types/lotItem";

const initialState: LotItemState = {
    data: {
        header: {
            lot_name: '',
            product_id: '',
            product_name: '',
            trademark_id: '',
            trademark_name: '',
            manufacturer_lot_id: '',
            manufacturer_lot_name: ''
        },
        rows: [],
        total: 0
    },
    loading: false,
    error: null,
    page: 0,
    limit: 10
}

export const lotItemReducer = (state = initialState, action: LotItemAction): LotItemState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case LotItemActionTypes.FETCH_LOT_ITEM:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit
            }
        case LotItemActionTypes.FETCH_LOT_ITEM_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit
            }
        case LotItemActionTypes.FETCH_LOT_ITEM_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit
            }
        case LotItemActionTypes.INCREASE_LOT_ITEM_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case LotItemActionTypes.DECREASE_LOT_ITEM_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case LotItemActionTypes.GET_FIRST_LOT_ITEM_PAGE:
            return {...state, page: 0}
        case LotItemActionTypes.GET_LAST_LOT_ITEM_PAGE:
            return {...state, page: lastPage - 1}
        case LotItemActionTypes.CHANGE_LOT_ITEM_LIMIT:
            return {...state, limit: action.payload, page: 0}
        default:
            return state
    }
}