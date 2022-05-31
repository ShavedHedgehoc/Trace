export interface ConvergenceItemState {
    data: IConvergenceItemData;
    loading: boolean;
    error: null | string;
}

export interface IConvergenceItemData {
    // header: IConvergenceItemHeader;
    batch_id: string;
    rows: IConvergenceItemRow[];
}

export interface IConvergenceItemRow {
    product_id: string;
    product_name: string;
    plan: string;
    fact: string;
}

export enum ConvergenceItemActionTypes {
    FETCH_CONVERGENCE_ITEM = "FETCH_CONVERGENCE_ITEM",
    FETCH_CONVERGENCE_ITEM_SUCCESS = "FETCH_CONVERGENCE_ITEM_SUCCESS",
    FETCH_CONVERGENCE_ITEM_ERROR = "FETCH_CONVERGENCE_ITEM_ERROR",
}

interface FetchConvergenceItemAction {
    type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM
}

interface FetchConvergenceItemSuccessAction {
    type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_SUCCESS;
    payload: IConvergenceItemData;
}

interface FetchConvergenceItemErrorAction {
    type: ConvergenceItemActionTypes.FETCH_CONVERGENCE_ITEM_ERROR;
    payload: string;
}

export type ConvergenceItemAction =
    FetchConvergenceItemAction
    | FetchConvergenceItemSuccessAction
    | FetchConvergenceItemErrorAction