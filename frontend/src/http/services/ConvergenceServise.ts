import { AxiosResponse } from "axios";
import { $api } from "../";
import { IConvergenceData, IConvergenceFilter } from "../../types/convergence";
import { IConvergenceItemData } from "../../types/convergenceItem";
import { ApiRoutes } from '../apiRoutes';


export default class ConvergenceService {
    static async get_convergences(page: number, limit: number, filter: IConvergenceFilter): Promise<AxiosResponse<IConvergenceData>> {
        return $api.post<IConvergenceData>(ApiRoutes.CONVERGENCE, { "page": page, "limit": limit, "filter": filter })
    }
    static async get_convergence_item(boil_name: string | undefined, exactly: string | undefined): Promise<AxiosResponse<IConvergenceItemData>> {
        return $api.post<IConvergenceItemData>(ApiRoutes.CONVERGENCE + `/${boil_name}`, { "exactly": exactly })
    }
}