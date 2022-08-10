import { AxiosResponse } from "axios";
import { $api } from "../";
import { ILotData } from "../../types/lot";
import { ILotItemData } from "../../types/lotItem";
import { ApiRoutes } from '../apiRoutes';


export default class LotService {
    // static async get_lots(page: number, limit: number, filter: ILotFilter): Promise<AxiosResponse<ILotData>> {
    //     return $api.post<ILotData>(ApiRoutes.LOTS, { "page": page, "limit": limit, "filter": filter })
    // }
    static async get_lots(page: number, limit: number): Promise<AxiosResponse<ILotData>> {
        return $api.post<ILotData>(ApiRoutes.LOTS, { "page": page, "limit": limit })
    }
    static async get_lot_item(lot_id: number, page: number, limit: number): Promise<AxiosResponse<ILotItemData>> {
        return $api.post<ILotItemData>(ApiRoutes.LOTS + `/${lot_id}`, { "page": page, "limit": limit })
    }
}