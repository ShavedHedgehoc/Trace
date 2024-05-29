export interface authState {
    user: IUserData | null
    token: string | null
    isAuth: boolean
    loading: boolean
}

export interface IUserData {
    id: string
    name: string
    email: string
    roles: string[]
}

export interface IAuthData {
    user: IUserData
    token: string
}

const localUser = localStorage.getItem('user')

const defaultState: authState = {

    user: localUser ? JSON.parse(localUser) : null,
    token: null,
    isAuth: localUser ? true : false,
    loading: false
}

export enum AuthActionTypes {
    REGISTER = "REGISTER",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_ERROR = "REGISTER_ERROR",
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCES",
    LOGIN_ERROR = "LOGIN_ERROR",
    LOGOUT = "LOGOUT",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_ERROR = "LOGOUT_ERROR",
    REFRESH = "REFRESH",
    REFRESH_SUCCESS = "REFRESH_SUCCES",
    REFRESH_ERROR = "REFRESH_ERROR",
    CHECK = "CHECK",
    CHECK_SUCCESS = "CHECK_SUCCESS",
    CHECK_ERROR = "CHECK_ERROR"
}

interface AuthRegisterAction {
    type: AuthActionTypes.REGISTER
}

interface AuthRegisterSuccessAction {
    type: AuthActionTypes.REGISTER_SUCCESS
    payload: IAuthData
}

interface AuthRegisterErrorAction {
    type: AuthActionTypes.REGISTER_ERROR
}

interface AuthLoginAction {
    type: AuthActionTypes.LOGIN
}

interface AuthLoginSuccessAction {
    type: AuthActionTypes.LOGIN_SUCCESS
    payload: IAuthData
}

interface AuthLoginErrorAction {
    type: AuthActionTypes.LOGIN_ERROR
}

interface AuthLogoutAction {
    type: AuthActionTypes.LOGOUT
}

interface AuthLogoutSuccessAction {
    type: AuthActionTypes.LOGOUT_SUCCESS
}

interface AuthLogoutErrorAction {
    type: AuthActionTypes.LOGOUT_ERROR
}

interface AuthRefreshAction {
    type: AuthActionTypes.REFRESH
}

interface AuthRefreshSuccessAction {
    type: AuthActionTypes.REFRESH_SUCCESS
    payload: IAuthData
}

interface AuthRefreshErrorAction {
    type: AuthActionTypes.REFRESH_ERROR
}

interface AuthCheckAction {
    type: AuthActionTypes.CHECK
}

interface AuthCheckSuccessAction {
    type: AuthActionTypes.CHECK_SUCCESS
    payload: IAuthData
}

interface AuthCheckErrorAction {
    type: AuthActionTypes.CHECK_ERROR
}

export type AuthActions =
    AuthRegisterAction
    | AuthRegisterSuccessAction
    | AuthRegisterErrorAction
    | AuthLoginAction
    | AuthLoginSuccessAction
    | AuthLoginErrorAction
    | AuthLogoutAction
    | AuthLogoutSuccessAction
    | AuthLogoutErrorAction
    | AuthRefreshAction
    | AuthRefreshSuccessAction
    | AuthRefreshErrorAction
    | AuthCheckAction
    | AuthCheckSuccessAction
    | AuthCheckErrorAction

export const authReducer = (state = defaultState, action: AuthActions): authState => {
    switch (action.type) {
        case AuthActionTypes.REGISTER:
            return { ...state, loading: true }
        case AuthActionTypes.REGISTER_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token, isAuth: true }
        case AuthActionTypes.REGISTER_ERROR:
            return { ...state, loading: false }
        case AuthActionTypes.LOGIN:
            return { ...state, loading: true }
        case AuthActionTypes.LOGIN_SUCCESS:
            return { ...state, loading: false, isAuth: true, user: action.payload.user, token: action.payload.token }
        case AuthActionTypes.LOGIN_ERROR:
            return { ...state, loading: false }
        case AuthActionTypes.LOGOUT:
            return { ...state, loading: true }
        case AuthActionTypes.LOGOUT_SUCCESS:
            return { ...state, loading: false, isAuth: false, user: null, token: null }
        case AuthActionTypes.LOGOUT_ERROR:
            return { ...state, loading: false }
        case AuthActionTypes.REFRESH:
            return { ...state, loading: true }
        case AuthActionTypes.REFRESH_SUCCESS:
            return { ...state, loading: false, isAuth: true, user: action.payload.user, token: action.payload.token }
        case AuthActionTypes.REFRESH_ERROR:
            return { ...state, loading: false, isAuth: false, user: null, token: null }
        case AuthActionTypes.CHECK:
            return { ...state, loading: true }
        case AuthActionTypes.CHECK_SUCCESS:
            return { ...state, loading: false, isAuth: true, user: action.payload.user, token: action.payload.token }
        case AuthActionTypes.CHECK_ERROR:
            return { ...state, loading: false, isAuth: false, user: null, token: null }
        default:
            return state
    }
}