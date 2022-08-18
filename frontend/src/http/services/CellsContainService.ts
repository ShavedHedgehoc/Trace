import { AxiosResponse } from "axios";
import { $api } from "..";
import { ICellsContainData } from "../../types/cellsContain";
import { ApiRoutes } from '../apiRoutes';

export default class CellsContainService {    
    static async get_cells_contains(page: number, limit: number): Promise<AxiosResponse<ICellsContainData>> {
        return $api.post<ICellsContainData>(ApiRoutes.CELLS_CONTAIN, { "page": page, "limit": limit })
    }
    
}