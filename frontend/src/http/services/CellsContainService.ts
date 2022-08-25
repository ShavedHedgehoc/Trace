import { AxiosResponse } from "axios";
import { $api } from "..";
import { ICellsContainData, ICellsContainFilter } from "../../types/cellsContain";
import { ApiRoutes } from '../apiRoutes';

export default class CellsContainService {
    static async get_cells_contains(page: number, limit: number, filter: ICellsContainFilter): Promise<AxiosResponse<ICellsContainData>> {
        return $api.post<ICellsContainData>(ApiRoutes.CELLS_CONTAIN, { "page": page, "limit": limit, "filter": filter })
    }

}