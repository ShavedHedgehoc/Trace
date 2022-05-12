export interface LotState {
    data: ILotData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    init: boolean;
}

export interface ILotData {
    rows: ILotRow[];
    total: number;
}

export interface ILotRow {
    lot_id: string,
    'lot_name': string,
    'lot_date': string,
    'product_id': string,
    'product_name': string,
    'trademark_id': string,
    'trademark_name': string,
    'seller_id': string,
    'seller_name': string,
    'manufacturer_id': string,
    'manufacturer_name': string,
    'manufacturer_lot_id': string,
    'manufacturer_lot_name': string
}

export enum LotActionTypes {
    FETCH_LOTS = "FETCH_LOTS",
    FETCH_LOTS_SUCCESS = "FETCH_LOTS_SUCCESS",
    FETCH_LOTS_ERROR = "FETCH_LOTS_ERROR",
    INCREASE_LOTS_PAGE = "INCREASE_LOTS_PAGE",
    DECREASE_LOTS_PAGE = "DECREASE_LOTS_PAGE",
    GET_FIRST_LOTS_PAGE = "GET_FIRST_LOTS_PAGE",
    GET_LAST_LOTS_PAGE = "GET_LAST_LOTS_PAGE",
    CHANGE_LOTS_LIMIT = "CHANGE_LOTS_LIMIT",
}

interface FetchLotsAction {
    type: LotActionTypes.FETCH_LOTS;
}

interface FetchLotsSuccessAction {
    type: LotActionTypes.FETCH_LOTS_SUCCESS;
    payload: ILotData;
}

interface FetchLotsErrorAction {
    type: LotActionTypes.FETCH_LOTS_ERROR;
    payload: string;
}

interface LotsIncreasePage {
    type: LotActionTypes.INCREASE_LOTS_PAGE;
}

interface LotsDecreasePage {
    type: LotActionTypes.DECREASE_LOTS_PAGE;
}

interface LotsGetFirstPage {
    type: LotActionTypes.GET_FIRST_LOTS_PAGE;
}

interface LotsGetLastPage {
    type: LotActionTypes.GET_LAST_LOTS_PAGE;
}

interface LotsChangeLimit {
    type: LotActionTypes.CHANGE_LOTS_LIMIT;
    payload: number;
}

export type LotAction =
    FetchLotsAction
    | FetchLotsSuccessAction
    | FetchLotsErrorAction
    | LotsIncreasePage
    | LotsDecreasePage
    | LotsGetFirstPage
    | LotsGetLastPage
    | LotsChangeLimit