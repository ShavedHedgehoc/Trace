import { BoilItemAction, BoilItemActionTypes, BoilItemState } from "../../types/boilItem";

const initialState: BoilItemState = {
  data: {
    header: {
      boil_name: "",
      date: "",
      plant: "",
      marking: "",
    },
    summaryRows: [],
    weightingRows: [],
    loadRows: [],
    technologyRows: [],
  },
  loading: false,
  error: null,
  init: true,
};

export const boilItemReducer = (state = initialState, action: BoilItemAction): BoilItemState => {
  switch (action.type) {
    case BoilItemActionTypes.FETCH_BOIL_ITEM:
      return {
        loading: true,
        error: null,
        data: state.data,
        init: state.init,
      };
    case BoilItemActionTypes.FETCH_BOIL_ITEM_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        init: false,
      };
    case BoilItemActionTypes.FETCH_BOIL_ITEM_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: initialState.data,
        init: true,
      };
    default:
      return state;
  }
};
