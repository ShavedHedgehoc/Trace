import { AxiosResponse } from "axios";
import { $api, $clear_api } from "../";

import { ApiRoutes } from '../apiRoutes';
import { IUserData } from '../../store/reducers/authReducer';


export interface RegisterSuccessResponse {
    user: IUserData,
    token: string
}

export interface RegisterErrorResponse {
    msg: string
}

export interface LoginResponse {
    user: IUserData,
    token: string
}
export default class AuthService {
    static async register(name: string, email: string, password: string): Promise<AxiosResponse<RegisterSuccessResponse>> {
        return $api.post<RegisterSuccessResponse>(ApiRoutes.REGISTER, { name, email, password })
    }
    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>(ApiRoutes.LOGIN, { email, password })
    }
    static async logout(): Promise<AxiosResponse> {
        return $api.post(ApiRoutes.LOGOUT)
    }
    static async refresh(): Promise<AxiosResponse> {
        return $api.post(ApiRoutes.REFRESH)
    }
    static async check(): Promise<AxiosResponse> {
        return $clear_api.post(ApiRoutes.REFRESH)
    }
}
