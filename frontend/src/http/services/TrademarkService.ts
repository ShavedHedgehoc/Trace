import { AxiosResponse } from "axios";
import { $api } from "../";
import { ITrademarkData, ITrademarkFilter } from '../../types/trademark';
import { ITrademarkItemData } from "../../types/trademarkItem";
import { ApiRoutes } from '../apiRoutes';

export default class TrademarkService {
    static async get_trademarks(page: number, limit: number, filter: ITrademarkFilter): Promise<AxiosResponse<ITrademarkData>> {
        return $api.post<ITrademarkData>(ApiRoutes.TRADEMARKS, { "page": page, "limit": limit, "filter": filter })
    }
    static async get_trademark_item(trademark_id: number, page: number, limit: number): Promise<AxiosResponse<ITrademarkItemData>> {
        return $api.post<ITrademarkItemData>(ApiRoutes.TRADEMARKS + `/${trademark_id}`, { "page": page, "limit": limit })
    }
}