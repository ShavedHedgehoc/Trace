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
    INCREASE_PAGE = "INCREASE_PAGE",
    DECREASE_PAGE = "DECREASE_PAGE",
    SET_FIRST_PAGE = "SET_FIRST_PAGE",
    SET_LAST_PAGE = "SET_LAST_PAGE",
    CHANGE_LIMIT = "CHANGE_LIMIT",
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
    type: ProductActionTypes.INCREASE_PAGE;
}

interface ProductsDecreasePage {
    type: ProductActionTypes.DECREASE_PAGE;
}

interface ProductsSetFirstPage {
    type: ProductActionTypes.SET_FIRST_PAGE;
}

interface ProductsSetLastPage {
    type: ProductActionTypes.SET_LAST_PAGE;
}

interface ProductsChangeLimit {
    type: ProductActionTypes.CHANGE_LIMIT;
    payload: number;
}

export type ProductAction = FetchProductsAction | FetchProductsSuccessAction | FetchProductsErrorAction |
    ProductsIncreasePage | ProductsDecreasePage | ProductsSetFirstPage | ProductsSetLastPage | ProductsChangeLimit