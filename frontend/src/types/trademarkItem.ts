export interface TrademarkItemState {
    data: ITrademarkItemData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    init: boolean;
}

export interface ITrademarkItemData {
    header: ITrademarkItemHeader;
    rows: ITrademarkItemRow[];
    total: number;
}

export interface ITrademarkItemHeader {
    product_id: string;
    product_name: string;
    trademark_name: string;
}

export interface ITrademarkItemRow {
    boil_id: string;
    boil_name: string;
    date: string;
    product_name: string;
    plant: string;
}

export enum TrademarkItemActionTypes {
    FETCH_TRADEMARK_ITEM = "FETCH_TRADEMARK_ITEM",
    FETCH_TRADEMARK_ITEM_SUCCESS = "FETCH_TRADEMARK_ITEM_SUCCESS",
    FETCH_TRADEMARK_ITEM_ERROR = "FETCH_TRADEMARK_ITEM_ERROR",
    INCREASE_TRADEMARK_ITEM_PAGE = "INCREASE_TRADEMARK_ITEM_PAGE",
    DECREASE_TRADEMARK_ITEM_PAGE = "DECREASE_TRADEMARK_ITEM_PAGE",
    GET_FIRST_TRADEMARK_ITEM_PAGE = "GET_FIRST_TRADEMARK_ITEM_PAGE",
    GET_LAST_TRADEMARK_ITEM_PAGE = "GET_LAST_TRADEMARK_ITEM_PAGE",
    CHANGE_TRADEMARK_ITEM_LIMIT = "CHANGE_TRADEMARK_ITEM_LIMIT",
    RESET_TRADEMARK_ITEM_STATE = "RESET_TRADEMARK_ITEM_STATE",
}

interface FetchTrademarkItemAction {
    type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM;
}

interface FetchTrademarkItemSuccessAction {
    type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_SUCCESS;
    payload: ITrademarkItemData;
}

interface FetchTrademarkItemErrorAction {
    type: TrademarkItemActionTypes.FETCH_TRADEMARK_ITEM_ERROR;
    payload: string;
}

interface TrademarkItemIncreasePage {
    type: TrademarkItemActionTypes.INCREASE_TRADEMARK_ITEM_PAGE;
}

interface TrademarkItemDecreasePage {
    type: TrademarkItemActionTypes.DECREASE_TRADEMARK_ITEM_PAGE;
}

interface TrademarkItemGetFirstPage {
    type: TrademarkItemActionTypes.GET_FIRST_TRADEMARK_ITEM_PAGE;
}

interface TrademarkItemGetLastPage {
    type: TrademarkItemActionTypes.GET_LAST_TRADEMARK_ITEM_PAGE;
}

interface TrademarkItemChangeLimit {
    type: TrademarkItemActionTypes.CHANGE_TRADEMARK_ITEM_LIMIT;
    payload: number;
}

interface TrademarkItemResetState {
    type: TrademarkItemActionTypes.RESET_TRADEMARK_ITEM_STATE;
}

export type TrademarkItemAction =
    FetchTrademarkItemAction
    | FetchTrademarkItemSuccessAction
    | FetchTrademarkItemErrorAction
    | TrademarkItemIncreasePage
    | TrademarkItemDecreasePage
    | TrademarkItemGetFirstPage
    | TrademarkItemGetLastPage
    | TrademarkItemChangeLimit
    | TrademarkItemResetState