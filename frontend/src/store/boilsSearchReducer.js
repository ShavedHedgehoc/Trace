const defaultState = {
    boilSearch:
    {
        'batchString': '',
        'markingString': '',
        'dateString': '',
        'monthString': '-',
        'yearString': '-',
        'plantString': '-'
    }
};

const CHANGE_BOILSEARCH = "CHANGE_BOILSEARCH";
const CLEAR_BOILSEARCH = "CLEAR_BOILSEARCH";

export const boilSearchReducer = (state = defaultState, action) => {

    switch (action.type) {
        case CHANGE_BOILSEARCH:
            return {
                ...state,
                boilSearch: {
                    ...state.boilSearch,
                    [action.payload.name]: action.payload.value,
                }
            }
        case CLEAR_BOILSEARCH:
            return  defaultState
        default:
            return state
    }
}

export const changeBoilSearchAction = (payload) => ({ type: CHANGE_BOILSEARCH, payload });
export const clearBoilSearchAction = () => ({ type: CLEAR_BOILSEARCH });