export interface ProductState {
    data: IProduct;
    loading: boolean;
    error: null | string;
    page: number;
    limit: number;
}

export interface IProduct {
    rows: IProductRow[];
    total: number;
}

export interface IProductRow {
    product_id: string;
    product_name: string;
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
}

interface FetchProductsAction {
    type: ProductActionTypes.FETCH_PRODUCTS;
}

interface FetchProductsSuccessAction {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: IProduct;
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

export type ProductAction =
    FetchProductsAction
    | FetchProductsSuccessAction
    | FetchProductsErrorAction
    | ProductsIncreasePage
    | ProductsDecreasePage
    | ProductsSetFirstPage
    | ProductsSetLastPage
    | ProductsChangeLimit