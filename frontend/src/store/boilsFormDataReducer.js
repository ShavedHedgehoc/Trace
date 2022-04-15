const defaultState = {
    boilsFormData:
    {
        'batch': '',
        'marking': '',
        'date': '',
        'month': '-',
        'year': '-',
        'plant': '-'
    }
};

const CHANGE_BOILSFORMDATA = "CHANGE_BOILSFORMDATA";
const RESET_BOILSFORMDATA = "RESET_BOILSFORMDATA";

export const boilsFormDataReducer = (state = defaultState, action) => {

    switch (action.type) {
        case CHANGE_BOILSFORMDATA:
            return {
                ...state,
                boilsFormData: {
                    ...state.boilsFormData,
                    [action.payload.name]: action.payload.value,
                }
            }
        case RESET_BOILSFORMDATA:
            return defaultState
        default:
            return state
    }
}

export const changeBoilsFormDataAction = (payload) => ({ type: CHANGE_BOILSFORMDATA, payload });
export const resetBoilsFormDataAction = () => ({ type: RESET_BOILSFORMDATA });