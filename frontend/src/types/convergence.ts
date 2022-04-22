export interface ConvergenceState {
    data: IConvergenceData;
    loading: boolean;
    error: string | null;
    page: number;
    limit: number;
    filter: IConvergenceFilter;
}

export interface IConvergenceData {
    rows: IConvergenceRow[];
    plant_selector_options: IPlantsOptions[]
    total: number;
}

export interface IPlantsOptions {
    key: string;
    value: string;
}

export interface IConvergenceRow {
    batch_id: string;
    batch_name: string;
    batch_date: string;
    plant: string;
}

export interface IConvergenceFilter {
    start_date: string;
    end_date: string;
    plant: string;
}

export enum ConvergenceActionTypes {
    FETCH_CONVERGENCE = "FETCH_CONVERGENCE",
    FETCH_CONVERGENCE_SUCCESS = "FETCH_CONVERGENCE_SUCCESS",
    FETCH_CONVERGENCE_ERROR = "FETCH_CONVERGENCE_ERROR",
    INCREASE_CONVERGENCE_PAGE = "INCREASE_CONVERGENCE_PAGE",
    DECREASE_CONVERGENCE_PAGE = "DECREASE_CONVERGENCE_PAGE",
    GET_FIRST_CONVERGENCE_PAGE = "GET_FIRST_CONVERGENCE_PAGE",
    GET_LAST_CONVERGENCE_PAGE = "GET_LAST_CONVERGENCE_PAGE",
    CHANGE_CONVERGENCE_LIMIT = "CHANGE_CONVERGENCE_LIMIT",
    CHANGE_CONVERGENCE_FILTER = "CHANGE_CONVERGENCE_FILTER",
}

interface FetchConvergenceAction {
    type: ConvergenceActionTypes.FETCH_CONVERGENCE;
}

interface FetchConvergenceSuccessAction {
    type: ConvergenceActionTypes.FETCH_CONVERGENCE_SUCCESS;
    payload: IConvergenceData;
}

interface FetchConvergenceErrorAction {
    type: ConvergenceActionTypes.FETCH_CONVERGENCE_ERROR;
    payload: string;
}

interface ConvergenceIncreasePage {
    type: ConvergenceActionTypes.INCREASE_CONVERGENCE_PAGE;
}

interface ConvergenceDecreasePage {
    type: ConvergenceActionTypes.DECREASE_CONVERGENCE_PAGE;
}

interface ConvergenceSetFirstPage {
    type: ConvergenceActionTypes.GET_FIRST_CONVERGENCE_PAGE;
}

interface ConvergenceSetLastPage {
    type: ConvergenceActionTypes.GET_LAST_CONVERGENCE_PAGE;
}

interface ConvergenceChangeLimit {
    type: ConvergenceActionTypes.CHANGE_CONVERGENCE_LIMIT;
    payload: number;
}

interface ConvergenceChangeFilter {
    type: ConvergenceActionTypes.CHANGE_CONVERGENCE_FILTER;
    payload: IConvergenceFilter;
}

export type ConvergenceAction =
    FetchConvergenceAction | FetchConvergenceSuccessAction | FetchConvergenceErrorAction |
    ConvergenceIncreasePage | ConvergenceDecreasePage | ConvergenceSetFirstPage |
    ConvergenceSetLastPage | ConvergenceChangeLimit | ConvergenceChangeFilter