export interface BoilState {
    boils: IBoil;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    filter: IBoilFilter;
}

export enum BoilActionTypes {
    FETCH_BOILS = "FETCH_BOILS",
    FETCH_BOILS_SUCCESS = "FETCH_BOILS_SUCCESS",
    FETCH_BOILS_ERROR = "FETCH_BOILS_ERROR",
    INCREASE_BOILS_PAGE = "INCREASE_BOILS_PAGE",
    DECREASE_BOILS_PAGE = "DECREASE_BOILS_PAGE",
    SET_BOILS_PAGE = "SET_BOILS_PAGE",
    SET_FIRST_BOILS_PAGE = "SET_FIRST_BOILS_PAGE",
    SET_LAST_BOILS_PAGE = "SET_LAST_BOILS_PAGE",
    CHANGE_LIMIT = "CHANGE_LIMIT",
    CHANGE_FILTER = "CHANGE_FILTER",
    CLEAR_FILTER = "CLEAR_FILTER"
}

export enum BoilFilterParams {
    BATCH = "batch",
    MARKING = "marking",
    DATE = "date",
    MONTH = "month",
    YEAR = "year",
    PLANT = "plant"
}

interface FetchBoilsAction {
    type: BoilActionTypes.FETCH_BOILS;
}

interface FetchBoilsSuccessAction {
    type: BoilActionTypes.FETCH_BOILS_SUCCESS;
    payload: IBoil;
}

interface FetchBoilsErrorAction {
    type: BoilActionTypes.FETCH_BOILS_ERROR;
    payload: string;
}

interface BoilsIncreasePage {
    type: BoilActionTypes.INCREASE_BOILS_PAGE;
}

interface BoilsDecreasePage {
    type: BoilActionTypes.DECREASE_BOILS_PAGE;
}

interface BoilsSetPage {
    type: BoilActionTypes.SET_BOILS_PAGE;
    payload: number;
}

interface BoilsSetFirstPage {
    type: BoilActionTypes.SET_FIRST_BOILS_PAGE;
}

interface BoilsSetLastPage {
    type: BoilActionTypes.SET_LAST_BOILS_PAGE;
}

interface BoilsChangeLimit {
    type: BoilActionTypes.CHANGE_LIMIT;
    payload: number;
}

interface BoilsChangeFilter {
    type: BoilActionTypes.CHANGE_FILTER;
    payload: IBoilFormField
}

interface BoilsClearFilter {
    type: BoilActionTypes.CLEAR_FILTER;
}

export interface IBoilFormField {
    key: string,
    value: string
}


export interface IBoil {
    data: IBoilData[];
    month_selector_options: IMonthData[];
    year_selector_options: IYearData[];
    plant_selector_options: IPlantData[];
    total: number;
}

export interface IBoilData {
    batchid: string,
    date: string,
    marking: string,
    month: string,
    name: string,
    plant: string,
    year: number
}

export interface IMonthData{
    key:string,
    value:string
}

export interface IYearData{
    key:string,
    value:string
}

export interface IPlantData{
    key:string,
    value:string
}

export interface IBoilFilter {
    batch: string,
    marking: string,
    date: string,
    month: string,
    year: string,
    plant: string
}

export type BoilAction = FetchBoilsAction | FetchBoilsSuccessAction | FetchBoilsErrorAction |
    BoilsIncreasePage | BoilsDecreasePage | BoilsSetPage | BoilsSetFirstPage | BoilsSetLastPage |
    BoilsSetPage | BoilsChangeLimit | BoilsChangeFilter | BoilsClearFilter