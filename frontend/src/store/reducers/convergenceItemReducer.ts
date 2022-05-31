import {ConvergenceItemAction, ConvergenceItemActionTypes, ConvergenceItemState} from "../../types/convergenceItem";

const initialState: ConvergenceItemState = {
    data: {
        batch_id:'',
        rows: []
    },
    loading: false,
    error: ''
}

export const convergenceItemReducer = (state = initialState, action: ConvergenceItemAction): ConvergenceItemState => {
    switch (action.type) {
        case ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM:
            return {loading: true, error: null, data: state.data}
        case ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_SUCCESS:
            return {loading: false, error: null, data: action.payload}
        case ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_ERROR:
            return {loading: false, error: action.payload, data: initialState.data}
        default:
            return state
    }
}