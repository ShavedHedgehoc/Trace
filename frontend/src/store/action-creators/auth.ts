import { Dispatch } from 'react';
import AuthService from '../../http/services/AuthService';
import { AuthActions } from '../reducers/authReducer'
import { AuthActionTypes } from '../reducers/authReducer';
import handleError from '../../http/handleError'
import { MsgActions, MsgActionTypes } from '../reducers/messageReducer';



export const register = (name: string, email: string, password: string) => {
    return async (dispatch: Dispatch<AuthActions | MsgActions>) => {
        try {
            dispatch({ type: AuthActionTypes.REGISTER })
            dispatch({ type: MsgActionTypes.CLEAR_MESSAGE })
            const response = await (AuthService.register(name, email, password))
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
                payload: response.data
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch (error: any) {
            dispatch({ type: AuthActionTypes.REGISTER_ERROR })
            const errValue = handleError(error)
            dispatch({
                type: MsgActionTypes.SET_MESAGE,
                payload: errValue
            })
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthActions | MsgActions>) => {
        try {
            dispatch({ type: AuthActionTypes.LOGIN })
            dispatch({ type: MsgActionTypes.CLEAR_MESSAGE })
            const response = await (AuthService.login(email, password))
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: response.data
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch (error: any) {
            dispatch({ type: AuthActionTypes.LOGIN_ERROR })
            const errValue = handleError(error)
            dispatch({
                type: MsgActionTypes.SET_MESAGE,
                payload: errValue
            })
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            dispatch({ type: AuthActionTypes.LOGOUT })
            await (AuthService.logout())
            dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS })
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } catch (error) {
            dispatch({ type: AuthActionTypes.LOGOUT_ERROR })
        }
    }
}

export const check = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            dispatch({ type: AuthActionTypes.CHECK })
            const response = await (AuthService.check())
            dispatch({
                type: AuthActionTypes.CHECK_SUCCESS,
                payload: response.data
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch (error) {
            dispatch({ type: AuthActionTypes.CHECK_ERROR })
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
}

export const refresh = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        try {
            dispatch({ type: AuthActionTypes.REFRESH })
            const response = await (AuthService.refresh())
            dispatch({
                type: AuthActionTypes.REFRESH_SUCCESS,
                payload: response.data
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
        } catch (error) {
            dispatch({ type: AuthActionTypes.REFRESH_ERROR })
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
}