import axios from 'axios'
import { UserLogin } from "../models/login/user-login-model";
import { decode_data, setCookie, TOKEN_COOKIE } from '../utils/cookie';
import { Token } from '../core/types';
const baseUrl = import.meta.env.VITE_BASE_URL;
const urlRegister = `${baseUrl}/Authenticate`

export function login(user: UserLogin) {
    return axios.post(
        urlRegister + '/login',
        user
    ).then((response) => {
        let data = response.data;
        let decoded_data: Token = decode_data(data.tokenValue);
        setCookie(TOKEN_COOKIE, data.tokenValue, new Date(decoded_data.exp * 1000));
        return decoded_data;
    });
}