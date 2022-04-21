export interface DocCounterState {
    count: number;
    loading: boolean;
    error: null | string;
}

export enum DocCounterActionTypes {
    FETCH_DOC_COUNTER = "FETCH_DOC_COUNTER",
    FETCH_DOC_COUNTER_SUCCESS = "FETCH_DOC_COUNTER_SUCCESS",
    FETCH_DOC_COUNTER_ERROR = "FETCH_DOC_COUNTER_ERROR",
}

interface FetchDocCounterAction {
    type: DocCounterActionTypes.FETCH_DOC_COUNTER;
}

interface FetchDocCounterSuccessAction {
    type: DocCounterActionTypes.FETCH_DOC_COUNTER_SUCCESS;
    payload: number;
}

interface FetchDocCounterErrorAction {
    type: DocCounterActionTypes.FETCH_DOC_COUNTER_ERROR;
    payload: string;
}

export type DocCounterAction = FetchDocCounterAction | FetchDocCounterSuccessAction | FetchDocCounterErrorAction