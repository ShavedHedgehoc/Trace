export interface TrademarkState {
    data: ITrademark;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    // filter: ;
}

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

export enum TrademarkActionTypes {
    FETCH_TRADEMARKS = "FETCH_TRADEMARKS",
    FETCH_TRADEMARKS_SUCCESS = "FETCH_TRADEMARKS_SUCCESS",
    FETCH_TRADEMARKS_ERROR = "FETCH_TRADEMARKS_ERROR",
    INCREASE_TRADEMARKS_PAGE = "INCREASE_TRADEMARKS_PAGE",
    DECREASE_TRADEMARKS_PAGE = "DECREASE_TRADEMARKS_PAGE",
    GET_FIRST_TRADEMARKS_PAGE = "GET_FIRST_TRADEMARKS_PAGE",
    GET_LAST_TRADEMARKS_PAGE = "GET_LAST_TRADEMARKS_PAGE",
    CHANGE_TRADEMARKS_LIMIT = "CHANGE_TRADEMARKS_LIMIT",
    CHANGE_TRADEMARKS_FILTER = "CHANGE_TRADEMARKS_FILTER",
    CLEAR_TRADEMARKS_FILTER = "CLEAR_TRADEMARKS_FILTER"
}

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

interface TrademarksIncreasePageAction {
    type: TrademarkActionTypes.INCREASE_TRADEMARKS_PAGE;
}

interface TrademarksDecreasePageAction {
    type: TrademarkActionTypes.DECREASE_TRADEMARKS_PAGE;
}

interface TrademarkGetFirstPageAction {
    type: TrademarkActionTypes.GET_FIRST_TRADEMARKS_PAGE;
}

interface TrademarksGetLastPageAction {
    type: TrademarkActionTypes.GET_LAST_TRADEMARKS_PAGE;
}

interface TrademarksChangeLimitAction {
    type: TrademarkActionTypes.CHANGE_TRADEMARKS_LIMIT;
    payload: number;
}

export type TrademarkAction =
    FetchTrademarksAction
    | FetchTrademarksSuccessAction
    | FetchTrademarksErrorAction
    | TrademarksIncreasePageAction
    | TrademarksDecreasePageAction
    | TrademarkGetFirstPageAction
    | TrademarksGetLastPageAction
    | TrademarksChangeLimitAction