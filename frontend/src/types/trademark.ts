export interface TrademarkState {
    data: ITrademarkData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    filter: ITrademarkFilter;
    init: boolean;
}

export interface ITrademarkData {
    rows: ITrademarkRow[];
    total: number;
}

export interface ITrademarkRow {
    trademark_id: string,
    trademark_name: string,
    product_id: string,
    product_name: string,
}

export interface ITrademarkFilter {
    trademark_name: string;
    product_id: string;
    product_name: string;
}

export interface ITrademarkFormField {
    key: string;
    value: string;
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

export enum TrademarkFilterParams {
    TRADEMARK_NAME = "trademark_name",
    PRODUCT_ID = "product_id",
    PRODUCT_NAME = "product_name"
}

interface FetchTrademarksAction {
    type: TrademarkActionTypes.FETCH_TRADEMARKS;
}

interface FetchTrademarksSuccessAction {
    type: TrademarkActionTypes.FETCH_TRADEMARKS_SUCCESS;
    payload: ITrademarkData;
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

interface TrademarksChangeFilter {
    type: TrademarkActionTypes.CHANGE_TRADEMARKS_FILTER;
    payload: ITrademarkFormField;
}

interface TrademarksClearFilter {
    type: TrademarkActionTypes.CLEAR_TRADEMARKS_FILTER;
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
    | TrademarksChangeFilter
    | TrademarksClearFilter