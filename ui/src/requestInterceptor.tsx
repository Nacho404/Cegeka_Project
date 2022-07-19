import axios, { AxiosRequestConfig } from "axios";
import { getCookie, TOKEN_COOKIE } from "./utils/cookie";

export function requestInterceptor() {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {

        const token = getCookie(TOKEN_COOKIE);
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }, error => {
        return Promise.reject(error);
    })
}