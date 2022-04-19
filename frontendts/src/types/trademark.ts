export interface TrademarkState {
    data: ITrademark[];
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    // filter: ;
}

export enum TrademarkActionTypes {
    FETCH_TRADEMARKS = "FETCH_TRADEMARKS",
    FETCH_TRADEMARKS_SUCCESS = "FETCH_TRADEMARKS_SUCCESS",
    FETCH_TRADEMARKS_ERROR = "FETCH_TRADEMARKS_ERROR",
    INCREASE_PAGE = "INCREASE_PAGE",
    DECREASE_PAGE = "DECREASE_PAGE",    
    SET_FIRST_PAGE = "SET_FIRST_PAGE",
    SET_LAST_PAGE = "SET_LAST_PAGE",
    CHANGE_LIMIT = "CHANGE_LIMIT",
    CHANGE_FILTER = "CHANGE_FILTER",
    CLEAR_FILTER = "CLEAR_FILTER"
}

// export enum BoilFilterParams {
//     BATCH = "batch",
//     MARKING = "marking",
//     DATE = "date",
//     MONTH = "month",
//     YEAR = "year",
//     PLANT = "plant"
// }

interface FetchTrademarksAction {
    type: TrademarkActionTypes.FETCH_TRADEMARKS;
}

interface FetchTrademarksSuccessAction {
    type: TrademarkActionTypes.FETCH_TRADEMARKS_SUCCESS;
    payload: ITrademark;
}

interface FetchTrademarksErrorAction {
    type: TrademarkActionTypes.FETCH_TRADEMARKS_ERROR;
    payload: string;
}

// interface BoilsIncreasePage {
//     type: BoilActionTypes.INCREASE_BOILS_PAGE;
// }

// interface BoilsDecreasePage {
//     type: BoilActionTypes.DECREASE_BOILS_PAGE;
// }

// interface BoilsSetPage {
//     type: BoilActionTypes.SET_BOILS_PAGE;
//     payload: number;
// }

// interface BoilsSetFirstPage {
//     type: BoilActionTypes.SET_FIRST_BOILS_PAGE;
// }

// interface BoilsSetLastPage {
//     type: BoilActionTypes.SET_LAST_BOILS_PAGE;
// }

// interface BoilsChangeLimit {
//     type: BoilActionTypes.CHANGE_LIMIT;
//     payload: number;
// }

// interface BoilsChangeFilter {
//     type: BoilActionTypes.CHANGE_FILTER;
//     payload: IBoilFormField
// }

// interface BoilsClearFilter {
//     type: BoilActionTypes.CLEAR_FILTER;
// }

// export interface IBoilFormField {
//     key: string,
//     value: string
// }


export interface ITrademark {
    rows: ITrademarkRow[];    
    total: number;
}

export interface ITrademarkRow {
    trademark_id: string,
    trademark_name: string,
    product_id: string,
    product_name: string,
}

// export interface IBoilFilter {
//     batch: string,
//     marking: string,
//     date: string,
//     month: string,
//     year: string,
//     plant: string
// }

export type TrademarkAction = FetchTrademarksAction | FetchTrademarksSuccessAction |FetchTrademarksErrorAction