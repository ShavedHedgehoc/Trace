import {ProductAction, ProductActionTypes, ProductState} from "../../types/product";

const initialState: ProductState = {
    data: {
        rows: [],
        total: 0
    },
    page: 0,
    limit: 10,
    loading: false,
    error: null
}

export const productReducer =(state=initialState,action:ProductAction):ProductState=>{
    const lastPage = <number>(Math.ceil(state.data.total / state.limit))
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS:
            return{
                loading:true,
                error:null,
                data:state.data,
                page:state.page,
                limit:state.limit
            }
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return{
                loading:false,
                error:null,
                data:action.payload,
                page:state.page,
                limit:state.limit
            }
        case ProductActionTypes.FETCH_PRODUCTS_ERROR:
            return{
                loading:false,
                error:action.payload,
                data:initialState.data,
                page:state.page,
                limit:state.limit
            }
        case ProductActionTypes.INCREASE_PAGE:
            if (state.page === lastPage - 1) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page + 1}
            }
        case ProductActionTypes.DECREASE_PAGE:
            if (state.page === 0) {
                return {...state, page: state.page}
            } else {
                return {...state, page: state.page - 1}
            }
        case ProductActionTypes.SET_FIRST_PAGE:
            return {...state, page: 0}
        case ProductActionTypes.SET_LAST_PAGE:
            return {...state, page: lastPage - 1}
        case ProductActionTypes.CHANGE_LIMIT:
            return {...state, limit: action.payload, page: 0}
        default:
            return state

    }
}