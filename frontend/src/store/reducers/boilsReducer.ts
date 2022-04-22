import {BoilState, BoilAction, BoilActionTypes, BoilFilterParams} from "../../types/boil";

const initialState: BoilState = {
    data: {
        rows: [],
        month_selector_options: [],
        year_selector_options: [],
        plant_selector_options: [],
        total: 0
    },
    page: 0,
    limit: 10,
    filter: {
        batch: "",
        marking: "",
        date: "",
        month: "-",
        year: "-",
        plant: "-"
    },
    loading: false,
    error: null
}

export const boilsReducer = (state = initialState, action: BoilAction): BoilState => {
    const lastPage = (Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case BoilActionTypes.FETCH_BOILS:
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter
            }
        case BoilActionTypes.FETCH_BOILS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                filter: state.filter
            }
        case BoilActionTypes.FETCH_BOILS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter
            }
        case BoilActionTypes.INCREASE_BOILS_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case BoilActionTypes.DECREASE_BOILS_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case BoilActionTypes.GET_FIRST_BOILS_PAGE:
            return {...state, page: 0}
        case BoilActionTypes.GET_LAST_BOILS_PAGE:
            return {...state, page: lastPage - 1}
        case BoilActionTypes.SET_BOILS_PAGE:
            return {...state, page: action.payload}
        case BoilActionTypes.CHANGE_BOILS_LIMIT:
            return {...state, limit: action.payload, page: 0}
        case BoilActionTypes.CHANGE_BOILS_FILTER:
            switch (action.payload.key) {
                case BoilFilterParams.BATCH: {
                    return {...state, filter: {...state.filter, batch: action.payload.value}, page: 0}
                }
                case BoilFilterParams.MARKING: {
                    return {...state, filter: {...state.filter, marking: action.payload.value}, page: 0}
                }
                case BoilFilterParams.DATE: {
                    return {
                        ...state,
                        filter: {...state.filter, date: action.payload.value, month: '-', year: '-'},
                        page: 0
                    }
                }
                case BoilFilterParams.MONTH: {
                    return {...state, filter: {...state.filter, month: action.payload.value, date: ''}, page: 0}
                }
                case BoilFilterParams.YEAR: {
                    return {...state, filter: {...state.filter, year: action.payload.value, date: ''}, page: 0}
                }
                case BoilFilterParams.PLANT: {
                    return {...state, filter: {...state.filter, plant: action.payload.value}, page: 0}
                }
                default:
                    return state
            }
        case BoilActionTypes.CLEAR_BOILS_FILTER: {
            return {
                ...state,
                filter: {...state.filter, batch: '', marking: '', date: '', month: '-', year: '-', plant: '-'}
            }
        }
        default:
            return state
    }
}