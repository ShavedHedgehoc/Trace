export interface AuthState {
    isAuth: boolean
    loading: boolean
    error: string | null
}

export interface IRegisterData {
    name: string,
    email: string,
    password: string
}

export interface IRegisterResponce {
    name: string,
    email: string
}

export enum AuthActionTypes {
    REGISTER = "REGISTER",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_ERROR = "REGISTER_ERROR"
}

interface AuthRegisterAction {
    type: AuthActionTypes.REGISTER;
}

interface AuthRegisterSuccessAction {
    type: AuthActionTypes.REGISTER_SUCCESS
    payload: IRegisterResponce
}

interface AuthRegisterErrorAction {
    type: AuthActionTypes.REGISTER_ERROR
    payload: string
}

export enum UserRoles {
    USER = "User",
    ADMIN = "Admin",
    TECHNOLOGIST = "Technologist",
    SPECIALIST = "Specialist"
}

export type AuthAction =
    AuthRegisterAction
    | AuthRegisterSuccessAction
    | AuthRegisterErrorAction