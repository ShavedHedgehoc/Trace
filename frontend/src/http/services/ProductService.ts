import { AxiosResponse } from "axios";
import { $api } from "../";
import { IProductData, IProductFilter } from "../../types/product";
import { IProductItemData, IProductItemFilter } from "../../types/productItem";
import { IProductTmItemData } from "../../types/productTmItem";
import { ApiRoutes } from '../apiRoutes';

export default class ProductService {
    static async get_products(page: number, limit: number, filter: IProductFilter): Promise<AxiosResponse<IProductData>> {
        return $api.post<IProductData>(ApiRoutes.PRODUCTS, { "page": page, "limit": limit, "filter": filter })
    }
    static async get_product_item(product_id: string | undefined, page: number, limit: number, filter: IProductItemFilter): Promise<AxiosResponse<IProductItemData>> {
        return $api.post<IProductItemData>(ApiRoutes.PRODUCTS + `/${product_id}`, { "page": page, "limit": limit, "filter": filter })
    }
    static async get_product_tm_item(product_id: string | undefined, page: number, limit: number): Promise<AxiosResponse<IProductTmItemData>> {
        return $api.post<IProductTmItemData>(ApiRoutes.PRODUCT_TRADEMARKS + `/${product_id}`, { "page": page, "limit": limit })
    }
}