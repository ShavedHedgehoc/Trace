const defaultState = {
    boilsData:
    {
        'data': [],
        'total': 0,
        'plant_selector_options': [],
        'month_selector_options': [],
        'year_selector_options': [],
        'error': '',

    }
};

const CHANGE_BOILSDATA = "CHANGE_BOILSDATA";
const FETCH_BOILSDATA = "FETCH_BOILSDATA";
const HANDLE_ERROR_BOILSDATA = "HANDLE_ERROR_BOILSDATA";

export const boilsDataReducer = (state = defaultState, action) => {

    switch (action.type) {
        case CHANGE_BOILSDATA:
            return {
                ...state,
                boilsData: action.payload
            }
        case FETCH_BOILSDATA:
            return {
                ...state,
                boilsData: { ...action.payload, "error": "" }
            }
        case HANDLE_ERROR_BOILSDATA:
            return {
                ...state,
                boilsData: {
                    ...defaultState, "error": action.payload
                }
            }

        default:
            return state
    }
}

export const changeBoilsDataAction = (payload) => ({ type: CHANGE_BOILSDATA, payload });
export const fetchBoilsDataAction = (payload) => ({ type: FETCH_BOILSDATA, payload });
export const handleErrorBoilsDataAction = (payload) => ({ type: HANDLE_ERROR_BOILSDATA, payload });
