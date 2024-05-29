import { AxiosResponse } from "axios";
import { $api } from "../";
import { IBoilFilter, IBoilData } from '../../types/boil';
import { IBoilItemData } from "../../types/boilItem";
import { ApiRoutes } from '../apiRoutes';


export default class BoilService {
    static async get_boils(page: number, limit: number, filter: IBoilFilter): Promise<AxiosResponse<IBoilData>> {
        return $api.post<IBoilData>(ApiRoutes.BOILS, { "page": page, "limit": limit, "filter": filter })
    }
    static async get_boil_item(boil_id: number): Promise<AxiosResponse<IBoilItemData>> {
        return $api.get<IBoilItemData>(ApiRoutes.BOILS + `/${boil_id}`)
    }
}