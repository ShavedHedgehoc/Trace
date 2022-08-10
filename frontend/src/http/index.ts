import axios from "axios";
import { ApiRoutes } from "./apiRoutes";
import { store } from "../store"
import { AuthActionTypes } from '../store/reducers/authReducer';

// export const oldApiUrl = "/api/v1"
export const newApiUrl = "/api/v2"

const { dispatch } = store

// const $old_api = axios.create({
//     withCredentials: true,
//     baseURL: oldApiUrl
// })

const $api = axios.create({
    withCredentials: true,
    baseURL: newApiUrl
})

const $clear_api = axios.create({
    withCredentials: true,
    baseURL: newApiUrl
})


$clear_api.interceptors.request.use(
    function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
)

// $old_api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             (config.headers ??= {}).Authorization = `Bearer ${token}`
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

// $old_api.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         const originalRequest = error.config
//         if (originalRequest.url !== ApiRoutes.LOGIN && originalRequest.url !== ApiRoutes.LOGOUT && error.response) {
//             if (error.response.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;
//                 try {
//                     console.log("refresh from interceptor");

//                     dispatch({ type: AuthActionTypes.REFRESH })
//                     const response = await $clear_api.post(ApiRoutes.REFRESH)
//                     dispatch({
//                         type: AuthActionTypes.REFRESH_SUCCESS,
//                         payload: response.data
//                     })
//                     return $old_api.request(originalRequest)
//                 } catch (error) {
//                     dispatch({ type: AuthActionTypes.REFRESH_ERROR })
//                     return Promise.reject(error);
//                 }
//             }
//         }
//         return Promise.reject(error);
//     }
// )

$api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            (config.headers ??= {}).Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config
        if (originalRequest.url !== ApiRoutes.LOGIN && originalRequest.url !== ApiRoutes.LOGOUT && error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    console.log("refresh from interceptor");
                    dispatch({ type: AuthActionTypes.REFRESH })
                    const response = await $clear_api.post(ApiRoutes.REFRESH)
                    dispatch({
                        type: AuthActionTypes.REFRESH_SUCCESS,
                        payload: response.data
                    })
                    localStorage.setItem('token', response.data.token)                    
                    return $api.request(originalRequest)                    
                } catch (error) {
                    dispatch({ type: AuthActionTypes.REFRESH_ERROR })
                    return Promise.reject(error);
                }
            }
        }
        return Promise.reject(error);
    }
)

// export { $api, $clear_api, $old_api }
export { $api, $clear_api}