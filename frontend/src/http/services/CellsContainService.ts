import { AxiosResponse } from "axios";
import { $api } from "..";
import { ICellsContainData, ICellsContainFilter, ICellsContainOrders } from "../../types/cellsContain";
import { ApiRoutes } from '../apiRoutes';

export default class CellsContainService {
    static async get_cells_contains(page: number, limit: number, filter: ICellsContainFilter, order: ICellsContainOrders): Promise<AxiosResponse<ICellsContainData>> {
        return $api.post<ICellsContainData>(ApiRoutes.CELLS_CONTAIN, { "page": page, "limit": limit, "filter": filter, "order": order })
    }
    static async delete_by_id(id: string): Promise<AxiosResponse> {
        return $api.delete(ApiRoutes.CELLS_CONTAIN + `/${id}`)
    }
}