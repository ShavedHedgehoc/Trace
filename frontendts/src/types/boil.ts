export interface BoilState {
    boils: IBoil;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
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
    CHANGE_LIMIT = "CHANGE_LIMIT"
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

export interface IBoil {
    data: IBoilData[];

    // month_selector_options: any[];
    // year_selector_options: any[];
    // plant_selector_options: any[];
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



export type BoilAction = FetchBoilsAction | FetchBoilsSuccessAction | FetchBoilsErrorAction |
    BoilsIncreasePage | BoilsDecreasePage | BoilsSetPage | BoilsSetFirstPage | BoilsSetLastPage | BoilsSetPage | BoilsChangeLimit