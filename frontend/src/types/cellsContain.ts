export interface CellsContainState {
    data: ICellsContainData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    // filter: ICellContainFilter;
    init: boolean;
}

export interface ICellsContainData {
    rows: ICellsContainRow[];
    total: number;
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

// export interface ICellContainFilter {
//     start_date: string;
//     end_date: string;
//     exactly: string; // fix it to boolean!!!
//     plant: string;
// }

// export interface ICellContainFormField {
//     key: string;
//     value: string;
// }

export enum CellsContainActionTypes {
    FETCH_CELLS_CONTAIN = "FETCH_CELLS_CONTAIN",
    FETCH_CELLS_CONTAIN_SUCCESS = "FETCH_CELLS_CONTAIN_SUCCESS",
    FETCH_CELLS_CONTAIN_ERROR = "FETCH_CELLS_CONTAIN_ERROR",
    INCREASE_CELLS_CONTAIN_PAGE = "INCREASE_CELLS_CONTAIN_PAGE",
    DECREASE_CELLS_CONTAIN_PAGE = "DECREASE_CELLS_CONTAIN_PAGE",
    GET_FIRST_CELLS_CONTAIN_PAGE = "GET_FIRST_CELLS_CONTAIN_PAGE",
    GET_LAST_CELLS_CONTAIN_PAGE = "GET_LAST_CELLS_CONTAIN_PAGE",
    CHANGE_CELLS_CONTAIN_LIMIT = "CHANGE_CELLS_CONTAIN_LIMIT",
    // CHANGE_CELLS_CONTAIN_FILTER = "CHANGE_CELLS_CONTAIN_FILTER",
    // RESET_CELLS_CONTAIN_FILTER = "RESET_CELLS_CONTAIN_FILTER",
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

// interface CellsContainChangeFilter {
//     type: CellsContainActionTypes.CHANGE_CellContain_FILTER;
//     payload: ICellContainFormField;
// }

// interface CellsContainResetFilter {
//     type: CellsContainActionTypes.RESET_CellContain_FILTER;
// }

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
    // | CellContainChangeFilter
    // | CellContainResetFilter
    | CellsContainResetState