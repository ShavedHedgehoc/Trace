export interface ProductTmItemState {
    data: IProductTmItemData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    init: boolean;
}

export interface IProductTmItemData {
    header: IProductTmItemHeader;
    rows: IProductTmItemRow[];
    total: number;
}

export interface IProductTmItemHeader {
    product_id: string;
    product_name: string;
}

export interface IProductTmItemRow {
    boil_id: string;
    boil_name: string;
    boil_date: string;
    plant: string;
    lot_id: string;
    lot_name: string;
    product_name: string;
    trademark_id: string;
    trademark_name: string;
}

export enum ProductTmItemActionTypes {
    FETCH_PRODUCT_TM_ITEM = "FETCH_PRODUCT_TM_ITEM",
    FETCH_PRODUCT_TM_ITEM_SUCCESS = "FETCH_PRODUCT_TM_ITEM_SUCCESS",
    FETCH_PRODUCT_TM_ITEM_ERROR = "FETCH_PRODUCT_TM_ITEM_ERROR",
    INCREASE_PRODUCT_TM_ITEM_PAGE = "INCREASE_PRODUCT_TM_ITEM_PAGE",
    DECREASE_PRODUCT_TM_ITEM_PAGE = "DECREASE_PRODUCT_TM_ITEM_PAGE",
    GET_FIRST_PRODUCT_TM_ITEM_PAGE = "GET_FIRST_PRODUCT_TM_ITEM_PAGE",
    GET_LAST_PRODUCT_TM_ITEM_PAGE = "GET_LAST_PRODUCT_TM_ITEM_PAGE",
    CHANGE_PRODUCT_TM_ITEM_LIMIT = "CHANGE_PRODUCT_TM_ITEM_LIMIT",
    RESET_PRODUCT_TM_ITEM_STATE = "RESET_PRODUCT_TM_ITEM_STATE",
}

interface FetchProductTmItemAction {
    type: ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM;
}

interface FetchProductTmItemSuccessAction {
    type: ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM_SUCCESS;
    payload: IProductTmItemData;
}

interface FetchProductTmItemErrorAction {
    type: ProductTmItemActionTypes.FETCH_PRODUCT_TM_ITEM_ERROR;
    payload: string;
}

interface ProductTmItemIncreasePage {
    type: ProductTmItemActionTypes.INCREASE_PRODUCT_TM_ITEM_PAGE;
}

interface ProductTmItemDecreasePage {
    type: ProductTmItemActionTypes.DECREASE_PRODUCT_TM_ITEM_PAGE;
}

interface ProductTmItemGetFirstPage {
    type: ProductTmItemActionTypes.GET_FIRST_PRODUCT_TM_ITEM_PAGE;
}

interface ProductTmItemGetLastPage {
    type: ProductTmItemActionTypes.GET_LAST_PRODUCT_TM_ITEM_PAGE;
}

interface ProductTmItemChangeLimit {
    type: ProductTmItemActionTypes.CHANGE_PRODUCT_TM_ITEM_LIMIT;
    payload: number;
}

interface ProductTmItemResetState {
    type: ProductTmItemActionTypes.RESET_PRODUCT_TM_ITEM_STATE;
}

export type ProductTmItemAction =
    FetchProductTmItemAction
    | FetchProductTmItemSuccessAction
    | FetchProductTmItemErrorAction
    | ProductTmItemIncreasePage
    | ProductTmItemDecreasePage
    | ProductTmItemGetFirstPage
    | ProductTmItemGetLastPage
    | ProductTmItemChangeLimit
    | ProductTmItemResetState