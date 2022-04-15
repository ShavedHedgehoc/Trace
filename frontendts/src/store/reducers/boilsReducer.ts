import { BoilState, BoilAction, BoilActionTypes } from "../../types/boil";

const initialState: BoilState = {
    boils: {
        data: [],

        // month_selector_options: [],
        // year_selector_options: [],
        // plant_selector_options: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null
}

export const boilsReducer = (state = initialState, action: BoilAction): BoilState => {
    const lastPage = <number>(Math.ceil(state.boils.total / state.limit))
    switch (action.type) {
        case BoilActionTypes.FETCH_BOILS:
            return {
                loading: true,
                error: null,
                boils: state.boils,
                page: state.page,
                limit: state.limit
            }
        case BoilActionTypes.FETCH_BOILS_SUCCESS:
            return {
                loading: false,
                error: null,
                boils: action.payload,
                page: state.page,
                limit: state.limit
            }
        case BoilActionTypes.FETCH_BOILS_ERROR:
            return {
                loading: false,
                error: action.payload,
                boils: initialState.boils,
                page: state.page,
                limit: state.limit
            }
        case BoilActionTypes.INCREASE_BOILS_PAGE:
            if (state.page === lastPage - 1) {
                return { ...state, page: state.page }
            } else {
                return { ...state, page: state.page + 1 }
            }
        case BoilActionTypes.DECREASE_BOILS_PAGE:
            if (state.page === 0) {
                return { ...state, page: state.page }
            } else {
                return { ...state, page: state.page - 1 }
            }
        case BoilActionTypes.SET_FIRST_BOILS_PAGE:
            return { ...state, page: 0 }
        case BoilActionTypes.SET_LAST_BOILS_PAGE:
            return { ...state, page: lastPage - 1 }
        case BoilActionTypes.SET_BOILS_PAGE:
            return { ...state, page: action.payload }
        case BoilActionTypes.CHANGE_LIMIT:
            return {
                ...state, limit: action.payload, page:0
            }
        default:
            return state
    }
}