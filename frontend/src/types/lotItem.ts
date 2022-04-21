export interface LotItemState {
    data: ILotItemData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
}

export interface ILotItemData {
    header: ILotItemHeader;
    rows: ILotItemRow[];
    total: number;
}

export interface ILotItemHeader {
    lot_name: string;
    product_id: string;
    product_name: string;
    trademark_id: string;
    trademark_name: string;
    manufacturer_lot_id: string;
    manufacturer_lot_name: string;
}

export interface ILotItemRow {
    name: string;
    date: string;
    product_name: string;
}

export enum LotItemActionTypes {
    FETCH_LOT_ITEM = "FETCH_LOT_ITEM",
    FETCH_LOT_ITEM_SUCCESS = "FETCH_LOT_ITEM_SUCCESS",
    FETCH_LOT_ITEM_ERROR = "FETCH_LOT_ITEM_ERROR",
    INCREASE_LOT_ITEM_PAGE = "INCREASE_LOT_ITEM_PAGE",
    DECREASE_LOT_ITEM_PAGE = "DECREASE_LOT_ITEM_PAGE",
    GET_FIRST_LOT_ITEM_PAGE = "GET_FIRST_LOT_ITEM_PAGE",
    GET_LAST_LOT_ITEM_PAGE = "GET_LAST_LOT_ITEM_PAGE",
    CHANGE_LOT_ITEM_LIMIT = "CHANGE_LOT_ITEM_LIMIT"
}

interface FetchLotItemAction {
    type: LotItemActionTypes.FETCH_LOT_ITEM;
}

interface FetchLotItemSuccessAction {
    type: LotItemActionTypes.FETCH_LOT_ITEM_SUCCESS;
    payload: ILotItemData;
}

interface FetchLotItemErrorAction {
    type: LotItemActionTypes.FETCH_LOT_ITEM_ERROR;
    payload: string;
}

interface LotItemIncreasePage {
    type: LotItemActionTypes.INCREASE_LOT_ITEM_PAGE;
}

interface LotItemDecreasePage {
    type: LotItemActionTypes.DECREASE_LOT_ITEM_PAGE;
}

interface LotItemGetFirstPage {
    type: LotItemActionTypes.GET_FIRST_LOT_ITEM_PAGE;
}

interface LotItemGetLastPage {
    type: LotItemActionTypes.GET_LAST_LOT_ITEM_PAGE;
}

interface LotItemChangeLimit {
    type: LotItemActionTypes.CHANGE_LOT_ITEM_LIMIT;
    payload: number;
}


export type LotItemAction =
    FetchLotItemAction
    | FetchLotItemSuccessAction
    | FetchLotItemErrorAction
    | LotItemIncreasePage
    | LotItemDecreasePage
    | LotItemGetFirstPage
    | LotItemGetLastPage
    | LotItemChangeLimit