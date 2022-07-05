import { AxiosResponse } from "axios";
import { $api, $old_api } from "../";
import { IBoilFilter, IBoilData } from '../../types/boil';
import { ApiRoutes } from '../apiRoutes';


export default class BoilService {
    static getParams(page: number, limit: number, filter: IBoilFilter) {
        const params = new URLSearchParams();
        params.append('_page', String(page))
        params.append('_limit', String(limit))
        Object.entries(filter).forEach(([key, value]) => {
            params.append("_" + key, value)
        })
        return params
    }
    static async get_boils(page: number, limit: number, filter: IBoilFilter): Promise<AxiosResponse<IBoilData>> {
        return $old_api.get(ApiRoutes.BOILS, {
            params: this.getParams(page, limit, filter)
        })
        // return $api.get(ApiRoutes.BOILS, {
        //     params: axiosParams(page, limit, filter)
        // })        
    }
}