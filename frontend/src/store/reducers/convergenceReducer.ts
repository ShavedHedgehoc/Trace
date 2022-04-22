import {ConvergenceAction, ConvergenceState, ConvergenceActionTypes} from "../../types/convergence";

function setDates() {
    let today = new Date();
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
        plant: '-'
    }
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
                filter: state.filter
            }
        }
        case ConvergenceActionTypes.FETCH_CONVERGENCE_SUCCESS: {
            return {
                loading: false,
                error: null,
                data: action.payload,
                page: state.page,
                limit: state.limit,
                filter: state.filter
            }
        }
        case ConvergenceActionTypes.FETCH_CONVERGENCE_ERROR: {
            return {
                loading: false,
                error: action.payload,
                data: initialState.data,
                page: state.page,
                limit: state.limit,
                filter: state.filter
            }
        }
        case ConvergenceActionTypes.INCREASE_CONVERGENCE_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case ConvergenceActionTypes.DECREASE_CONVERGENCE_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case ConvergenceActionTypes.GET_FIRST_CONVERGENCE_PAGE:
            return {...state, page: 0}
        case ConvergenceActionTypes.GET_LAST_CONVERGENCE_PAGE:
            return {...state, page: lastPage - 1}
        case ConvergenceActionTypes.CHANGE_CONVERGENCE_LIMIT:
            return {...state, limit: action.payload, page: 0}
        default:
            return state
    }
}