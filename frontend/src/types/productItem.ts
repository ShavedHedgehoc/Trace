export interface ProductItemState {
    data: IProductItemData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    filter: IProductItemFilter;
    init: boolean;
}

export interface IProductItemData {
    header: IProductItemHeader;
    rows: IProductItemRow[];
    total: number;
}

export interface IProductItemHeader {
    product_id: string;
    product_name: string;
}

export interface IProductItemRow {
    'lot_id': string;
    'lot_name': string;
    'lot_date': string;
    'seller_id': string;
    'seller_name': string;
    'manufacturer_id': string;
    'manufacturer_name': string;
    'manufacturer_lot_id': string;
    'manufacturer_lot_name': string;
    'trademark_id': string;
    'trademark_name': string;
}

export interface IProductItemFilter {
    lot_name: string;
    seller_name: string;
    manufacturer_name: string;
    manufacturer_lot_name: string;
    trademark_name: string;
}

export interface IProductItemFormField {
    key: string;
    value: string;
}

export enum ProductItemActionTypes {
    FETCH_PRODUCT_ITEM = "FETCH_PRODUCT_ITEM",
    FETCH_PRODUCT_ITEM_SUCCESS = "FETCH_PRODUCT_ITEM_SUCCESS",
    FETCH_PRODUCT_ITEM_ERROR = "FETCH_PRODUCT_ITEM_ERROR",
    INCREASE_PRODUCT_ITEM_PAGE = "INCREASE_PRODUCT_ITEM_PAGE",
    DECREASE_PRODUCT_ITEM_PAGE = "DECREASE_PRODUCT_ITEM_PAGE",
    SET_PRODUCT_ITEM_PAGE = "SET_PRODUCT_ITEM_PAGE",
    GET_FIRST_PRODUCT_ITEM_PAGE = "GET_FIRST_PRODUCT_ITEM_PAGE",
    GET_LAST_PRODUCT_ITEM_PAGE = "GET_LAST_PRODUCT_ITEM_PAGE",
    CHANGE_PRODUCT_ITEM_LIMIT = "CHANGE_PRODUCT_ITEM_LIMIT",
    CHANGE_PRODUCT_ITEM_FILTER = "CHANGE_PRODUCT_ITEM_FILTER",
    CLEAR_PRODUCT_ITEM_FILTER = "CLEAR_PRODUCT_ITEM_FILTER",
    RESET_PRODUCT_ITEM_STATE = "RESET_PRODUCT_ITEM_STATE",
}

export enum ProductItemFilterParams {
    LOT_NAME = "lot_name",
    SELLER_NAME = "seller_name",
    MANUFACTURER_NAME = "manufacturer_name",
    MANUFACTURER_LOT_NAME = "manufacturer_lot_name",
    TRADEMARK_NAME = "trademark_name"
}

interface FetchProductItemAction {
    type: ProductItemActionTypes.FETCH_PRODUCT_ITEM;
}

interface FetchProductItemSuccessAction {
    type: ProductItemActionTypes.FETCH_PRODUCT_ITEM_SUCCESS;
    payload: IProductItemData;
}

interface FetchProductItemErrorAction {
    type: ProductItemActionTypes.FETCH_PRODUCT_ITEM_ERROR;
    payload: string;
}

interface ProductItemIncreasePage {
    type: ProductItemActionTypes.INCREASE_PRODUCT_ITEM_PAGE;
}

interface ProductItemDecreasePage {
    type: ProductItemActionTypes.DECREASE_PRODUCT_ITEM_PAGE;
}

interface ProductItemSetPage {
    type: ProductItemActionTypes.SET_PRODUCT_ITEM_PAGE;
    payload: number;
}

interface ProductItemSetFirstPage {
    type: ProductItemActionTypes.GET_FIRST_PRODUCT_ITEM_PAGE;
}

interface ProductItemSetLastPage {
    type: ProductItemActionTypes.GET_LAST_PRODUCT_ITEM_PAGE;
}

interface ProductItemChangeLimit {
    type: ProductItemActionTypes.CHANGE_PRODUCT_ITEM_LIMIT;
    payload: number;
}

interface ProductItemChangeFilter {
    type: ProductItemActionTypes.CHANGE_PRODUCT_ITEM_FILTER;
    payload: IProductItemFormField
}

interface ProductItemClearFilter {
    type: ProductItemActionTypes.CLEAR_PRODUCT_ITEM_FILTER;
}

interface ProductItemResetState {
    type: ProductItemActionTypes.RESET_PRODUCT_ITEM_STATE;
}

export type ProductItemAction =
    FetchProductItemAction
    | FetchProductItemSuccessAction
    | FetchProductItemErrorAction
    | ProductItemIncreasePage
    | ProductItemDecreasePage
    | ProductItemSetFirstPage
    | ProductItemSetLastPage
    | ProductItemSetPage
    | ProductItemChangeLimit
    | ProductItemChangeFilter
    | ProductItemClearFilter
    | ProductItemResetState
