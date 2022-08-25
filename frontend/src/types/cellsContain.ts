export interface CellsContainState {
    data: ICellsContainData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    filter: ICellsContainFilter;
    order: ICellsContainOrders;
    init: boolean;
}

export interface ICellsContainData {
    rows: ICellsContainRow[];
    total: number;
}

export interface ICellsContainFilter {
    cell: string;
    product_id: string;
    product_name: string;
}

export interface ICellsContainRow {
    id: string;
    cell_id: string;
    cell_name: string;
    exp: string;
    lot_id: number;
    lot_name: string;
    product_id: string;
    product_name: string;
}

export enum ICellsContainOrders {
    BY_CELLS = "by_cells",
    BY_PRODUCTS = "by_products",
    BY_EXPIRE = "by_expire"
}

export interface ICellsContainFormField {
    key: string;
    value: string;
}

export enum CellsContainFilterParams {
    CELL = "cell",
    PRODUCT_ID = "product_id",
    PRODUCT_NAME = "product_name",
}

export enum CellsContainActionTypes {
    FETCH_CELLS_CONTAIN = "FETCH_CELLS_CONTAIN",
    FETCH_CELLS_CONTAIN_SUCCESS = "FETCH_CELLS_CONTAIN_SUCCESS",
    FETCH_CELLS_CONTAIN_ERROR = "FETCH_CELLS_CONTAIN_ERROR",
    INCREASE_CELLS_CONTAIN_PAGE = "INCREASE_CELLS_CONTAIN_PAGE",
    DECREASE_CELLS_CONTAIN_PAGE = "DECREASE_CELLS_CONTAIN_PAGE",
    GET_FIRST_CELLS_CONTAIN_PAGE = "GET_FIRST_CELLS_CONTAIN_PAGE",
    GET_LAST_CELLS_CONTAIN_PAGE = "GET_LAST_CELLS_CONTAIN_PAGE",
    CHANGE_CELLS_CONTAIN_LIMIT = "CHANGE_CELLS_CONTAIN_LIMIT",
    CHANGE_CELLS_CONTAIN_FILTER = "CHANGE_CELLS_CONTAIN_FILTER",
    RESET_CELLS_CONTAIN_FILTER = "RESET_CELLS_CONTAIN_FILTER",
    RESET_CELLS_CONTAIN_STATE = "RESET_CELLS_CONTAIN_STATE",
}

// export enum CellContainFilterParams {
//     START_DATE = "start_date",
//     END_DATE = "end_date",
//     EXACTLY = "exactly",
//     PLANT = "plant"
// }

interface FetchCellsContainAction {
    type: CellsContainActionTypes.FETCH_CELLS_CONTAIN;
}

interface FetchCellsContainSuccessAction {
    type: CellsContainActionTypes.FETCH_CELLS_CONTAIN_SUCCESS;
    payload: ICellsContainData;
}

interface FetchCellsContainErrorAction {
    type: CellsContainActionTypes.FETCH_CELLS_CONTAIN_ERROR;
    payload: string;
}

interface CellsContainIncreasePage {
    type: CellsContainActionTypes.INCREASE_CELLS_CONTAIN_PAGE;
}

interface CellsContainDecreasePage {
    type: CellsContainActionTypes.DECREASE_CELLS_CONTAIN_PAGE;
}

interface CellsContainSetFirstPage {
    type: CellsContainActionTypes.GET_FIRST_CELLS_CONTAIN_PAGE;
}

interface CellsContainSetLastPage {
    type: CellsContainActionTypes.GET_LAST_CELLS_CONTAIN_PAGE;
}

interface CellsContainChangeLimit {
    type: CellsContainActionTypes.CHANGE_CELLS_CONTAIN_LIMIT;
    payload: number;
}

interface CellsContainChangeFilter {
    type: CellsContainActionTypes.CHANGE_CELLS_CONTAIN_FILTER;
    payload: ICellsContainFormField;
}

interface CellsContainResetFilter {
    type: CellsContainActionTypes.RESET_CELLS_CONTAIN_FILTER;
}

interface CellsContainResetState {
    type: CellsContainActionTypes.RESET_CELLS_CONTAIN_STATE;
}

export type CellsContainAction =
    FetchCellsContainAction
    | FetchCellsContainSuccessAction
    | FetchCellsContainErrorAction
    | CellsContainIncreasePage
    | CellsContainDecreasePage
    | CellsContainSetFirstPage
    | CellsContainSetLastPage
    | CellsContainChangeLimit
    | CellsContainChangeFilter
    | CellsContainResetFilter
    | CellsContainResetState