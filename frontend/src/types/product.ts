export interface ProductState {
    data: IProductData;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
    filter: IProductFilter;
    init: boolean;
}

export interface IProductData {
    rows: IProductRow[];
    total: number;
}

export interface IProductRow {
    product_id: string;
    product_name: string;
}

export interface IProductFilter {
    product_id: string;
    product_name: string;
}

export interface IProductFormField {
    key: string,
    value: string
}

export enum ProductActionTypes {
    FETCH_PRODUCTS = "FETCH_PRODUCTS",
    FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
    FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR",
    INCREASE_PRODUCTS_PAGE = "INCREASE_PRODUCTS_PAGE",
    DECREASE_PRODUCTS_PAGE = "DECREASE_PRODUCTS_PAGE",
    GET_FIRST_PRODUCTS_PAGE = "GET_FIRST_PRODUCTS_PAGE",
    GET_LAST_PRODUCTS_PAGE = "GET_LAST_PRODUCTS_PAGE",
    CHANGE_PRODUCTS_LIMIT = "CHANGE_PRODUCTS_LIMIT",
    CHANGE_PRODUCTS_FILTER = "CHANGE_PRODUCTS_FILTER",
    CLEAR_PRODUCTS_FILTER = "CLEAR_PRODUCTS_FILTER",
}

export enum ProductFilterParams {
    PRODUCT_ID = "product_id",
    PRODUCT_NAME = "product_name",
}

interface FetchProductsAction {
    type: ProductActionTypes.FETCH_PRODUCTS;
}

interface FetchProductsSuccessAction {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: IProductData;
}

interface FetchProductsErrorAction {
    type: ProductActionTypes.FETCH_PRODUCTS_ERROR;
    payload: string;
}

interface ProductsIncreasePage {
    type: ProductActionTypes.INCREASE_PRODUCTS_PAGE;
}

interface ProductsDecreasePage {
    type: ProductActionTypes.DECREASE_PRODUCTS_PAGE;
}

interface ProductsSetFirstPage {
    type: ProductActionTypes.GET_FIRST_PRODUCTS_PAGE;
}

interface ProductsSetLastPage {
    type: ProductActionTypes.GET_LAST_PRODUCTS_PAGE;
}

interface ProductsChangeLimit {
    type: ProductActionTypes.CHANGE_PRODUCTS_LIMIT;
    payload: number;
}

interface ProductsChangeFilter {
    type: ProductActionTypes.CHANGE_PRODUCTS_FILTER;
    payload: IProductFormField;
}

interface ProductsClearfilter {
    type: ProductActionTypes.CLEAR_PRODUCTS_FILTER;
}

export type ProductAction =
    FetchProductsAction
    | FetchProductsSuccessAction
    | FetchProductsErrorAction
    | ProductsIncreasePage
    | ProductsDecreasePage
    | ProductsSetFirstPage
    | ProductsSetLastPage
    | ProductsChangeLimit
    | ProductsChangeFilter
    | ProductsClearfilter