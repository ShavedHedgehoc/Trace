import { DocCounterState, DocCounterActionTypes, DocCounterAction } from "../../types/doccount";

const initialState: DocCounterState={
    count:0,
    loading:false,
    error:null
}

export const docCounterReducer = (state=initialState,action:DocCounterAction):DocCounterState=>{
    switch (action.type){
        case DocCounterActionTypes.FETCH_DOC_COUNTER:{
            return {
                count:state.count,
                loading: true,
                error: state.error             
            }
        }
        case DocCounterActionTypes.FETCH_DOC_COUNTER_SUCCESS:{
            return {
                count: action.payload,
                loading: false,
                error: null                
            }
        }
        case DocCounterActionTypes.FETCH_DOC_COUNTER_ERROR:{
            return {
                count:state.count,
                loading: false,
                error: action.payload                
            }
        }
        default:
            return state
    }
}