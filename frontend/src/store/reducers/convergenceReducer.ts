import {
    ConvergenceAction,
    ConvergenceState,
    ConvergenceActionTypes,
    ConvergenceFilterParams
} from "../../types/convergence";

function setDates() {
    
    let today = new Date();    

    if (today.getDate() === 1) {
        const prevMonthLastDay = new Date(today.getTime() - (1 * 86400000))
        const [prevDay, month, year] = [prevMonthLastDay.getDate(), prevMonthLastDay.getMonth() + 1, prevMonthLastDay.getFullYear()].map(String)
        const twoSignPrevDay = prevDay.padStart(2, '0');
        const twoSignMonth = month.padStart(2, '0');
        const startDate = year + '-' + twoSignMonth + '-01';
        const endDate = year + '-' + twoSignMonth + '-' + twoSignPrevDay;
        return [startDate, endDate]
    }

    const [prevDay, month, year] = [today.getDate() - 1, today.getMonth() + 1, today.getFullYear()].map(String)
    const twoSignPrevDay = prevDay.padStart(2, '0');
    const twoSignMonth = month.padStart(2, '0');
    const startDate = year + '-' + twoSignMonth + '-01';
    const endDate = year + '-' + twoSignMonth + '-' + twoSignPrevDay;
    return [startDate, endDate]
}

const initialState: ConvergenceState = {
    data: {
        rows: [],
        total: 0,
        plant_selector_options: []
    },
    loading: false,
    error: '',
    page: 0,
    limit: 10,
    filter: {
        start_date: setDates()[0],
        end_date: setDates()[1],
        exactly: 'false',
        plant: '-'
    },
    init: true
}

export const convergenceReducer = (state = initialState, action: ConvergenceAction): ConvergenceState => {
    const lastPage = (Math.ceil(state.data.total / state.limit));
    switch (action.type) {
        case ConvergenceActionTypes.FETCH_CONVERGENCE: {
            return {
                loading: true,
                error: null,
                data: state.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: state.init,
            }
        }
        case ConvergenceActionTypes.FETCH_CONVERGENCE_SUCCESS: {
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: false,
            }
        }
        case ConvergenceActionTypes.FETCH_CONVERGENCE_ERROR: {
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter,
                init: true,
            }
        }
        case ConvergenceActionTypes.INCREASE_CONVERGENCE_PAGE:
            if (state.page === lastPage - 1) {
                return { ...state, page: state.page }
            } else {
                return { ...state, page: state.page + 1 }
            }
        case ConvergenceActionTypes.DECREASE_CONVERGENCE_PAGE:
            if (state.page === 0) {
                return { ...state, page: state.page }
            } else {
                return { ...state, page: state.page - 1 }
            }
        case ConvergenceActionTypes.GET_FIRST_CONVERGENCE_PAGE:
            return { ...state, page: 0 }
        case ConvergenceActionTypes.GET_LAST_CONVERGENCE_PAGE:
            return { ...state, page: lastPage - 1 }
        case ConvergenceActionTypes.CHANGE_CONVERGENCE_LIMIT:
            return { ...state, limit: action.payload, page: 0 }
        case ConvergenceActionTypes.CHANGE_CONVERGENCE_FILTER:
            switch (action.payload.key) {
                case ConvergenceFilterParams.START_DATE: {
                    return { ...state, filter: { ...state.filter, start_date: action.payload.value }, page: 0 }
                }
                case ConvergenceFilterParams.END_DATE: {
                    return { ...state, filter: { ...state.filter, end_date: action.payload.value }, page: 0 }
                }
                case ConvergenceFilterParams.EXACTLY: {
                    return { ...state, filter: { ...state.filter, exactly: action.payload.value }, page: 0 }
                }
                case ConvergenceFilterParams.PLANT: {
                    return { ...state, filter: { ...state.filter, plant: action.payload.value }, page: 0 }
                }
                default:
                    return state
            }
        case ConvergenceActionTypes.RESET_CONVERGENCE_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    start_date: setDates()[0],
                    end_date: setDates()[1],
                    exactly: 'false',
                    plant: '-'
                }
            }
        case ConvergenceActionTypes.RESET_CONVERGENCE_STATE:
            return initialState
        default:
            return state
    }
}