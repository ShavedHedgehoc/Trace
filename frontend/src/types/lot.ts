export interface LotState {
    data: ILot;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
}

export interface ILot {
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
    INCREASE_PAGE = "INCREASE_PAGE",
    DECREASE_PAGE = "DECREASE_PAGE",
    SET_FIRST_PAGE = "SET_FIRST_PAGE",
    SET_LAST_PAGE = "SET_LAST_PAGE",
    CHANGE_LIMIT = "CHANGE_LIMIT",
}

interface FetchLotsAction {
    type: LotActionTypes.FETCH_LOTS;
}

interface FetchLotsSuccessAction {
    type: LotActionTypes.FETCH_LOTS_SUCCESS;
    payload: ILot;
}

interface FetchLotsErrorAction {
    type: LotActionTypes.FETCH_LOTS_ERROR;
    payload: string;
}

interface LotsIncreasePage {
    type: LotActionTypes.INCREASE_PAGE;
}

interface LotsDecreasePage {
    type: LotActionTypes.DECREASE_PAGE;
}

interface LotsSetFirstPage {
    type: LotActionTypes.SET_FIRST_PAGE;
}

interface LotsSetLastPage {
    type: LotActionTypes.SET_LAST_PAGE;
}

interface LotsChangeLimit {
    type: LotActionTypes.CHANGE_LIMIT;
    payload: number;
}

export type LotAction = FetchLotsAction | FetchLotsSuccessAction | FetchLotsErrorAction | LotsIncreasePage |
    LotsDecreasePage | LotsSetFirstPage | LotsSetLastPage | LotsChangeLimit